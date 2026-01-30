document.addEventListener("DOMContentLoaded", () => {
  let currentFolder = "";
  let renderIndex = 0;
  let totalItems = 0;
  let isLoading = false;
  let msnry = null;

  let HAS_TOKEN = false;

  const THUMB_WIDTH = 378;
  const CHUNK = 10;

  const galleryContainer = document.querySelector(".pinhole-gallery");
  const titleEl = document.querySelector(".entry-title");
  const metaEl = document.querySelector(".entry-meta");

  const loader = document.querySelector(".infiniteLoader");

  // Sentinel (nuevo): si no existe, lo creamos
  let sentinel = document.querySelector(".infiniteSentinel");
  if (!sentinel) {
    sentinel = document.createElement("div");
    sentinel.className = "infiniteSentinel";
    sentinel.style.height = "1px";
    sentinel.style.width = "100%";
    loader?.parentNode?.insertBefore(sentinel, loader); // sentinel antes del loader o donde convenga
  }

  let io = null;

  // Para cancelar fetches al cambiar de galería (nuevo)
  let activeController = null;
  let activeRequestId = 0;

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
        alertify.error("Debes ingresar el token");
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
      realW = 1920;
      realH = 1280;
    } else {
      filename = itemData.filename;
      realW = itemData.width || 1920;
      realH = itemData.height || 1280;
    }

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
      imgLoad.on("always", () => msnry.layout());

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
      imgLoad.on("always", () => msnry.layout());

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
      if (!HAS_TOKEN) {
        e.preventDefault();
        return;
      }
      const id = link.getAttribute("href").replace("#", "");
      if (!id) return;

      e.preventDefault();
      history.replaceState(null, "", "#" + id);

      const folder = fallbackIdToFolder(id);
      fetchAndRender(folder, link.textContent.trim());
    });
  });

  // ====== Init ======
  let id = location.hash.replace("#", "");
  if (!id || id === "/" || id === "home" || id === "viewall") {
    id = "emma5th";
    history.replaceState(null, "", "#emma5th");
  }

  const link = document.querySelector(`a[href="#${id}"]`);
  const titleText = link
    ? link.textContent.trim()
    : id.replace(/\d+/g, m => " " + m + " ").trim();

  checkToken().then(() => {
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
