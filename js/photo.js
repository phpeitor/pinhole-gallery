document.addEventListener("DOMContentLoaded", async () => {
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
  let downloadResetTimer = null;
  const menuRouteMap = new Map();

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
    setDownloadActionState({ enabled: false, loading: false });
    refreshTopActionsVisibility();
  }

  function unlockGallery() {
    HAS_TOKEN = true;
    document.body.classList.add("has-token");
    document.body.classList.remove("pinhole-lock", "pinhole-sidebar-open");
    refreshTopActionsVisibility();
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

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function toRouteId(value) {
    return String(value || "").trim().toLowerCase();
  }

  function registerRoute({ id, folder, title }) {
    const key = toRouteId(id);
    if (!key || !folder) return;
    menuRouteMap.set(key, {
      id: key,
      folder,
      title: title || key
    });
  }

  function indexRoutesFromDom() {
    menuRouteMap.clear();

    document.querySelectorAll("#menu-main-menu a[href^='#'], #menu-main-menu-1 a[href^='#'], #menu-main-menu-2 a[href^='#']")
      .forEach((link) => {
        const rawId = (link.getAttribute("href") || "").replace("#", "");
        if (!rawId || isHomeRoute(rawId)) return;

        const folder = link.dataset.folder || fallbackIdToFolder(rawId);
        const title = link.dataset.title || link.textContent.trim();
        registerRoute({ id: rawId, folder, title });
      });
  }

  function buildDesktopMenu(groups) {
    const desktopRoots = document.querySelectorAll("#menu-main-menu, #menu-main-menu-1");

    desktopRoots.forEach((desktopRoot) => {
      const galleryLi = desktopRoot.querySelector(":scope > li.menu-item-has-children");
      if (!galleryLi) return;

      let subMenu = galleryLi.querySelector(":scope > ul.sub-menu");
      if (!subMenu) {
        subMenu = document.createElement("ul");
        subMenu.className = "sub-menu";
        galleryLi.appendChild(subMenu);
      }

      subMenu.innerHTML = groups.map((group) => {
      const groupName = escapeHtml(group.group);
      const groupClass = `menu-${String(group.group || "").toLowerCase().replace(/\s+/g, "-")}`;
      const groupId = group.id ? escapeHtml(group.id) : "";
      const groupFolder = group.folder ? escapeHtml(group.folder) : "";
      const hasChildren = Array.isArray(group.items) && group.items.length > 0;
      const groupHref = groupId ? `#${groupId}` : "#";
      const groupData = groupId
        ? ` data-folder="${groupFolder}" data-title="${groupName}"`
        : "";

      const children = (group.items || []).map((item) => {
        const id = escapeHtml(item.id);
        const folder = escapeHtml(item.folder);
        const title = escapeHtml(item.title);
        const fullTitle = escapeHtml(`${group.group} ${item.title}`.trim());
        return `
          <li class="menu-item menu-item-type-custom menu-item-object-custom ${id}">
            <a href="#${id}" data-folder="${folder}" data-title="${fullTitle}">${title}</a>
          </li>
        `;
      }).join("");

      const liClasses = [
        "menu-item",
        "menu-item-type-custom",
        "menu-item-object-custom",
        groupClass,
        hasChildren ? "menu-item-has-children" : ""
      ].filter(Boolean).join(" ");

      return `
        <li class="${liClasses}">
          <a href="${groupHref}"${groupData}>${groupName}</a>
          ${hasChildren ? `<ul class="sub-menu">${children}</ul>` : ""}
        </li>
      `;
      }).join("");
    });
  }

  function buildResponsiveMenu(groups) {
    const responsiveRoot = document.querySelector("#menu-main-menu-2");
    if (!responsiveRoot) return;

    const homeLi = responsiveRoot.querySelector(":scope > li a[href='#home']")?.closest("li");
    const homeHtml = homeLi
      ? homeLi.outerHTML
      : `<li class="menu-item menu-item-type-post_type menu-item-object-page"><a href="#home">Inicio</a></li>`;

    const groupHtml = groups.map((group) => {
      const groupName = escapeHtml(group.group);
      const groupClass = `menu-${String(group.group || "").toLowerCase().replace(/\s+/g, "-")}`;
      const groupId = group.id ? escapeHtml(group.id) : "";
      const groupFolder = group.folder ? escapeHtml(group.folder) : "";
      const hasChildren = Array.isArray(group.items) && group.items.length > 0;
      const groupHref = groupId ? `#${groupId}` : "#";
      const groupData = groupId
        ? ` data-folder="${groupFolder}" data-title="${groupName}"`
        : "";

      const children = (group.items || []).map((item) => {
        const id = escapeHtml(item.id);
        const folder = escapeHtml(item.folder);
        const title = escapeHtml(item.title);
        const fullTitle = escapeHtml(`${group.group} ${item.title}`.trim());
        return `
          <li class="menu-item menu-item-type-custom menu-item-object-custom ${id}">
            <a href="#${id}" data-folder="${folder}" data-title="${fullTitle}">${title}</a>
          </li>
        `;
      }).join("");

      const liClasses = [
        "menu-item",
        "menu-item-type-custom",
        "menu-item-object-custom",
        groupClass,
        hasChildren ? "menu-item-has-children" : ""
      ].filter(Boolean).join(" ");

      return `
        <li class="${liClasses}">
          <a href="${groupHref}"${groupData}>${groupName}</a>
          ${hasChildren ? `<ul class="sub-menu">${children}</ul>` : ""}
        </li>
      `;
    }).join("");

    responsiveRoot.innerHTML = `${homeHtml}${groupHtml}`;
  }

  async function loadDynamicMenus() {
    try {
      const res = await fetch("php/menu.php", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const groups = Array.isArray(data?.groups) ? data.groups : [];
      if (groups.length > 0) {
        buildDesktopMenu(groups);
        buildResponsiveMenu(groups);
      }
    } catch (err) {
      console.error("No se pudo construir el menú dinámico", err);
    } finally {
      indexRoutesFromDom();
    }
  }

  function resolveRouteInfo(id, fallbackTitle = "") {
    const key = toRouteId(id);
    const mapped = menuRouteMap.get(key);
    if (mapped) {
      return { folder: mapped.folder, title: mapped.title || fallbackTitle || key };
    }

    return {
      folder: fallbackIdToFolder(id),
      title: fallbackTitle || id.replace(/\d+/g, m => " " + m + " ").trim()
    };
  }

  function ensureTopActions() {
    let bar = document.querySelector(".pinhole-top-actions");
    if (bar) return bar;

    bar = document.createElement("div");
    bar.className = "pinhole-top-actions";
    bar.setAttribute("aria-label", "Acciones rápidas");
    bar.innerHTML = `
      <a class="top-action-btn download-all download-cta has-tooltip is-disabled" href="#" data-tooltip="Descargar galería" aria-label="Descargar galería" aria-disabled="true">
        <img src="./resources/download.webp" alt="Descargar">
      </a>
      <a class="top-action-btn logout-action has-tooltip" href="php/logout.php" data-tooltip="Cerrar sesión" aria-label="Cerrar sesión">
        <img src="./resources/close.webp" alt="Cerrar sesión">
      </a>
    `;

    document.body.appendChild(bar);
    return bar;
  }

  function setDownloadActionState({ enabled = false, loading = false } = {}) {
    const btn = ensureTopActions().querySelector(".download-all");
    if (!btn) return;

    btn.classList.toggle("is-disabled", !enabled || loading);
    btn.classList.toggle("is-loading", loading);
    btn.setAttribute("aria-disabled", (!enabled || loading) ? "true" : "false");
  }

  function setTopActionsVisibility(visible) {
    ensureTopActions().classList.toggle("is-hidden", !visible);
  }

  function refreshTopActionsVisibility() {
    const currentId = location.hash.replace("#", "");
    setTopActionsVisibility(HAS_TOKEN && !isHomeRoute(currentId));
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
    setDownloadActionState({ enabled: false, loading: false });
    setTopActionsVisibility(false);

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

    titleEl.textContent = titleText || parent || "Galería vacía";
    metaEl.textContent = "0 Photos";
    setDownloadActionState({ enabled: false, loading: false });

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
      titleEl.textContent = titleText || folder;

      metaEl.innerHTML = `
        <span class="photo-count">${totalItems} Photos</span>
      `;

      setDownloadActionState({ enabled: totalItems > 0, loading: false });
      setTopActionsVisibility(true);

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
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".download-all");
    if (!btn) return;
    e.preventDefault();

    if (!HAS_TOKEN) {
      alertify.error("Necesitas token para descargar");
      return;
    }

    if (!currentFolder || btn.classList.contains("is-disabled")) {
      alertify.error("Selecciona una galería primero");
      return;
    }

    if (downloadResetTimer) {
      clearTimeout(downloadResetTimer);
      downloadResetTimer = null;
    }

    setDownloadActionState({ enabled: true, loading: true });

    const url = `php/zip.php?folder=${encodeURIComponent(currentFolder)}`;
    const a = document.createElement("a");
    a.href = url;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    downloadResetTimer = setTimeout(() => {
      setDownloadActionState({ enabled: true, loading: false });
      downloadResetTimer = null;
    }, 5000);
  });

  // ====== Navegación de menú ======
  document.addEventListener("click", (e) => {
    const link = e.target.closest("#menu-main-menu a[href^='#'], #menu-main-menu-1 a[href^='#'], #menu-main-menu-2 a[href^='#'], .pinhole-site-branding a[rel='home']");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    const isBrandHome = link.matches(".pinhole-site-branding a[rel='home']");
    let id = isBrandHome ? "home" : href.replace("#", "");

    if (!id) {
      e.preventDefault();
      return;
    }

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

    const fallbackTitle = link.dataset.title || link.textContent.trim();
    const route = resolveRouteInfo(id, fallbackTitle);
    fetchAndRender(route.folder, route.title);
  });

  // ====== Init ======
  await loadDynamicMenus();

  let id = location.hash.replace("#", "");
  if (isHomeRoute(id)) id = "home";

  ensureTopActions();
  setDownloadActionState({ enabled: false, loading: false });
  setTopActionsVisibility(false);

  const link = document.querySelector(`a[href="#${id}"]`);
  const titleText = link
    ? (link.dataset.title || link.textContent.trim())
    : id.replace(/\d+/g, m => " " + m + " ").trim();

  checkToken().then(() => {
    if (isHomeRoute(id)) {
      history.replaceState(null, "", "#home");
      showHomeView();
      return;
    }

    if (HAS_TOKEN) {
      const route = resolveRouteInfo(id, titleText);
      fetchAndRender(route.folder, route.title);
      return;
    }

    refreshTopActionsVisibility();
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
