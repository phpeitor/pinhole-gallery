document.addEventListener("DOMContentLoaded", () => {
  let currentFolder = "";
  let renderIndex = 0;
  let totalItems = 0;
  let isLoading = false;
  let msnry = null;
  let HAS_TOKEN = false;
  const THUMB_WIDTH = 378;
  const FALLBACK_WIDTH = 1920;
  const FALLBACK_HEIGHT = 1280;
  const CHUNK = 10;
  const galleryContainer = document.querySelector(".pinhole-gallery");
  const titleEl = document.querySelector(".entry-title");
  const metaEl = document.querySelector(".entry-meta");
  const loader = document.querySelector(".infiniteLoader");

  let sentinel = document.querySelector(".infiniteSentinel");
  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.className = "infiniteSentinel";
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    loader?.parentNode?.insertBefore(sentinel, loader); 
  }

  let io = null;
  let activeController = null;
  let activeRequestId = 0;

  const HOME_HASHES = new Set(["", "/", "home", "inicio", "viewall"]);

  // Evita que el script del tema vuelva a tomar control del layout de esta galería.
  galleryContainer?.classList.remove("pinhole-masonry", "pinhole-grid");

  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ====== Token ======
  document.getElementById("mc-embedded-subscribe-form")
    ?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = document.getElementById("token");
      const token = input.value.trim();
      input.classList.remove("input-error");

      if (!token) {
        input.classList.add("input-error");
        input.focus();
        return;
      }

      try {
        const res = await fetch("php/token_validate.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "token=" + encodeURIComponent(token),
        });
        const data = await res.json();

        if (data.ok) {
          unlockGallery();
          location.reload(); // podrías evitarlo, pero lo dejo porque tú lo usas
        } else {
          document.body.classList.remove("pinhole-sidebar-open");
          input.classList.add("input-error");
          input.focus();
          alertify.error("Token inválido o expirado");
        }
      } catch (err) {
        console.error(err);
        alertify.error("Error validando token");
      }
    });

  function lockGallery() {
    HAS_TOKEN = false;
    document.body.classList.remove("has-token");
    document.body.classList.add("pinhole-lock", "pinhole-sidebar-open");
  }

  function unlockGallery() {
    HAS_TOKEN = true;
    document.body.classList.add("has-token");
    document.body.classList.remove("pinhole-lock", "pinhole-sidebar-open");
  }

  async function checkToken() {
    try {
      const res = await fetch("php/check_token.php", { cache: "no-store" });
      const data = await res.json();
      data.valid ? unlockGallery() : lockGallery();
    } catch (e) {
      console.error(e);
      lockGallery();
    }
  }

  // ====== Helpers ======
  function fallbackIdToFolder(id) {
    const m = id.match(/^([a-zA-Z]+)(\d+)(.*)$/);
    if (m) return `${m[1]}/${m[2]}${m[3] || ""}`;
    return id.replace(/_/g, "/");
  }

  function isHomeRoute(id) {
    return HOME_HASHES.has(String(id || "").trim().toLowerCase());
  }

  function showHomeView() {
    if (activeController) activeController.abort();

    disconnectIO();
    destroyMasonry();
    showLoader(false);

    currentFolder = "";
    renderIndex = 0;
    totalItems = 0;
    isLoading = false;

    titleEl.textContent = "Inicio";
    metaEl.textContent = "";

    galleryContainer.style.height = "auto";
    galleryContainer.style.minHeight = "0";
    galleryContainer.style.paddingBottom = "0";
    galleryContainer.classList.add("pinhole-gallery-loaded");

    galleryContainer.innerHTML = `
      <section class="home-hero" aria-label="Presentación del proyecto">
        <div class="home-hero-video-wrap">
          <video class="home-hero-video" src="./resources/video.mp4" autoplay muted loop playsinline preload="metadata" aria-label="Video de presentación"></video>
        </div>
        <p class="home-hero-description">Proyecto de galería de imágenes con carga infinita, navegación por álbumes y visualización optimizada para desktop y móvil.</p>
        <cite>– Pinhole Gallery</cite>
      </section>
    `;
  }

  function getParentFromMenu(id) {
    const child = document.querySelector(`a[href="#${id}"]`);
    if (!child) return null;

    const parentUl = child.closest("ul.sub-menu");
    if (!parentUl) return null;

    const parentLi = parentUl.closest("li.menu-item-has-children");
    if (!parentLi) return null;

    const parentLink = parentLi.querySelector(":scope > a");
    return parentLink ? parentLink.textContent.trim() : null;
  }

  function buildPinholeItem(folder, itemData) {
    let filename, realW, realH;

    if (typeof itemData === "string") {
      filename = itemData;
      realW = FALLBACK_WIDTH;
      realH = FALLBACK_HEIGHT;
    } else {
      filename = itemData.filename;
      realW = Number(itemData.width) || FALLBACK_WIDTH;
      realH = Number(itemData.height) || FALLBACK_HEIGHT;
    }

    // Si la metadata viene corrupta (0/NaN), evita alturas gigantes que rompen Masonry.
    if (!Number.isFinite(realW) || realW <= 0) realW = FALLBACK_WIDTH;
    if (!Number.isFinite(realH) || realH <= 0) realH = FALLBACK_HEIGHT;

    const url = `./img/${folder}/${filename}`;
    const thumbH = Math.round(THUMB_WIDTH * (realH / realW));

    const wrap = document.createElement("div");
    wrap.className = "pinhole-item col-lg-4 col-md-4 col-sm-6";
    wrap.innerHTML = `
      <a class="item-link" href="${url}" data-size='{"width":${realW},"height":${realH}}'>
        <img
          src="${url}"
          width="${THUMB_WIDTH}"
          height="${thumbH}"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        >
      </a>
    `;
    return wrap;
  }

  function destroyMasonry() {
    if (msnry) {
      msnry.destroy();
      msnry = null;
    }

    if (window.jQuery && typeof window.jQuery.fn?.masonry === "function") {
      try {
          const $gallery = window.jQuery(galleryContainer);
          if ($gallery.data("masonry")) {
            $gallery.masonry("destroy");
          }
      } catch (_) {
        // Ignorar: puede no existir una instancia previa de jQuery Masonry.
      }
    }

    galleryContainer?.classList.remove("masonry", "pinhole-gallery-loaded");
  }

  function disconnectIO() {
    if (io) {
      io.disconnect();
      io = null;
    }
  }

  function showLoader(show) {
    if (!loader) return;
    loader.style.display = show ? "block" : "none";
  }

  function showEmptyGallery(folder, titleText) {
    const id = folder.replace(/\//g, ""); // fix
    const parent = getParentFromMenu(id);

    titleEl.textContent = parent || titleText || "Galería vacía";
    metaEl.textContent = "0 Photos";

    destroyMasonry();
    disconnectIO();
    showLoader(false);

    galleryContainer.style.height = "auto";
    galleryContainer.style.minHeight = "0";
    galleryContainer.style.paddingBottom = "40px";
      galleryContainer.classList.add("pinhole-gallery-loaded");
      galleryContainer.innerHTML = `
        <div style="padding:40px 0; text-align:center; opacity:.6;">
          No hay fotos en esta galería.
        </div>
      `;
  }

  async function fetchList({ folder, offset, limit, signal }) {
    const url = `php/list.php?folder=${encodeURIComponent(folder)}&offset=${offset}&limit=${limit}`;
    const res = await fetch(url, { signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!data || !Array.isArray(data.items)) return { total: 0, items: [] };
    return data;
  }

  // ====== Render principal ======
  async function fetchAndRender(folder, titleText = "") {
    if (!HAS_TOKEN) return;

    // cancela request previo
    if (activeController) activeController.abort();
    activeController = new AbortController();
    const requestId = ++activeRequestId;

    isLoading = true;
    showLoader(true);

    disconnectIO();
    destroyMasonry();

    currentFolder = folder;
    renderIndex = 0;
    totalItems = 0;
    galleryContainer.innerHTML = "";

    try {
      const data = await fetchList({
        folder,
        offset: 0,
        limit: CHUNK,
        signal: activeController.signal,
      });

      // si llegó tarde (otro request ganó), ignorar
      if (requestId !== activeRequestId) return;

      totalItems = data.total || 0;
      renderIndex = data.items.length;

      if (data.items.length === 0) {
        showEmptyGallery(folder, titleText);
        return;
      }

      const frag = document.createDocumentFragment();
      const newElems = data.items.map(item => buildPinholeItem(folder, item));
      newElems.forEach(el => frag.appendChild(el));
      galleryContainer.appendChild(frag);

      msnry = new Masonry(galleryContainer, {
        itemSelector: ".pinhole-item",
        percentPosition: true,
        transitionDuration: 0
      });

      const imgLoad = imagesLoaded(newElems);
      imgLoad.on("progress", () => msnry.layout());
      imgLoad.on("always", () => {
        msnry.reloadItems();
        msnry.layout();
          galleryContainer.classList.add("pinhole-gallery-loaded");
      });

      // Title
      const id = folder.replace(/\//g, ""); // fix
      const parent = getParentFromMenu(id);
      titleEl.textContent = parent ? `${parent} – ${titleText}` : titleText;

      metaEl.innerHTML = `
        <span class="photo-count">${totalItems} Photos</span>
        <a class="download-all" title="Descargar todas">⬇️</a>
        <a class="cerrar_session" title="Cerrar sesión" href="php/logout.php">❌</a>
      `;

      // Infinite scroll habilitar/deshabilitar
      if (renderIndex < totalItems) {
        setupInfiniteScroll();
      } else {
        disconnectIO();
        showLoader(false);
      }
    } catch (e) {
      if (e.name === "AbortError") return; // cambio de galería
      console.error(e);
      alertify.error("Error cargando galería");
    } finally {
      if (requestId === activeRequestId) {
        isLoading = false;
        if (renderIndex >= totalItems) showLoader(false);
      }
    }
  }

  function setupInfiniteScroll() {
    disconnectIO();

    io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting) return;
        if (isLoading) return;
        if (renderIndex >= totalItems) return;
        renderMore();
      },
      { rootMargin: "600px 0px" } // más anticipación
    );

    io.observe(sentinel);
  }

  async function renderMore() {
    if (!HAS_TOKEN) return;
    if (isLoading) return;
    if (renderIndex >= totalItems) return;

    isLoading = true;
    showLoader(true);

    const requestId = activeRequestId;

    try {
      const data = await fetchList({
        folder: currentFolder,
        offset: renderIndex,
        limit: CHUNK,
        signal: activeController?.signal,
      });

      if (requestId !== activeRequestId) return;

      if (!data.items || data.items.length === 0) {
        showLoader(false);
        disconnectIO();
        return;
      }

      const frag = document.createDocumentFragment();
      const newElems = data.items.map(item => buildPinholeItem(currentFolder, item));
      newElems.forEach(el => frag.appendChild(el));
      galleryContainer.appendChild(frag);

      renderIndex += data.items.length;

      msnry.appended(newElems);
      msnry.layout();

      const imgLoad = imagesLoaded(newElems);
      imgLoad.on("progress", () => msnry.layout());
      imgLoad.on("always", () => {
        msnry.reloadItems();
        msnry.layout();
      });

      if (renderIndex >= totalItems) {
        showLoader(false);
        disconnectIO();
      }
    } catch (e) {
      if (e.name === "AbortError") return;
      console.error(e);
    } finally {
      if (requestId === activeRequestId) {
        isLoading = false;
        if (renderIndex >= totalItems) showLoader(false);
      }
    }
  }

  // ====== Delegación de eventos (más limpio) ======
  metaEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".download-all");
    if (!btn) return;

    if (!HAS_TOKEN) {
      alertify.error("Necesitas token para descargar");
      return;
    }

    btn.classList.add("disabled");
    btn.textContent = "⏳";

    const url = `php/zip.php?folder=${encodeURIComponent(currentFolder)}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(() => {
      btn.classList.remove("disabled");
      btn.textContent = "⬇️";
    }, 5000);
  });

  // ====== Navegación de menú ======
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").replace("#", "");
      if (!id) return;

      if (isHomeRoute(id)) {
        e.preventDefault();
        history.replaceState(null, "", "#home");
        showHomeView();
        return;
      }

      if (!HAS_TOKEN) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      history.replaceState(null, "", "#" + id);

      const folder = fallbackIdToFolder(id);
      fetchAndRender(folder, link.textContent.trim());
    });
  });

  // ====== Init ======
  let id = location.hash.replace("#", "");
  if (isHomeRoute(id)) id = "home";

  const link = document.querySelector(`a[href="#${id}"]`);
  const titleText = link
    ? link.textContent.trim()
    : id.replace(/\d+/g, m => " " + m + " ").trim();

  checkToken().then(() => {
    if (isHomeRoute(id)) {
      history.replaceState(null, "", "#home");
      showHomeView();
      return;
    }

    if (HAS_TOKEN) fetchAndRender(fallbackIdToFolder(id), titleText);
  });

  // ====== PhotoSwipe (click en imagen) ======
  galleryContainer.addEventListener("click", (e) => {
    if (!HAS_TOKEN) return;

    const link = e.target.closest("a.item-link");
    if (!link) return;

    e.preventDefault();

    const allLinks = Array.from(galleryContainer.querySelectorAll("a.item-link"));
    const index = allLinks.indexOf(link);

    const items = allLinks.map(a => {
      const size = JSON.parse(a.dataset.size || '{"width":1920,"height":1280}');
      return {
        src: a.href,
        w: size.width,
        h: size.height
      };
    });

    const pswp = new PhotoSwipe(
      document.querySelector(".pswp"),
      PhotoSwipeUI_Default,
      items,
      { index, history: false, shareEl: true }
    );

    // Botón download
    pswp.listen("beforeChange", () => {
      const btn = document.querySelector(".pswp__button--download");
      if (btn) {
        btn.href = pswp.currItem.src;
        btn.download = pswp.currItem.src.split("/").pop();
      }
    });

    pswp.init();
  });

});
