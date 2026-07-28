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
  const CHUNK = 12;
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
  let homeSliderTimer = null;
  const menuRouteMap = new Map();

  const HOME_HASHES = new Set(["", "/", "home", "inicio", "viewall"]);

  // Evita que el script del tema vuelva a tomar control del layout de esta galería.
  galleryContainer?.classList.remove("pinhole-masonry", "pinhole-grid");

  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  function applyColorTheme(themeId = "default") {
    document.body.classList.remove("theme-default", "theme-color-1", "theme-color-2", "theme-color-3", "theme-color-4");
    document.body.classList.add("theme-" + themeId);
    document.querySelectorAll(".pinhole-site-branding img").forEach(img => {
      img.src = "./resources/pinhole_logo.png";
      img.removeAttribute("srcset");
    });
    window.refreshInteractiveBackground?.();
  }

  function applySwitcherStylesheet(type, themeId, url) {
    document.querySelectorAll(".pinhole-switcher-" + type).forEach(el => el.remove());
    if (themeId === "default" || !url) return;

    const stylesheet = document.createElement("link");
    stylesheet.media = "all";
    stylesheet.type = "text/css";
    stylesheet.href = url;
    stylesheet.className = "pinhole-switcher-" + type;
    stylesheet.rel = "stylesheet";
    document.head.appendChild(stylesheet);
  }

  function setSwitcherActive(type, themeId) {
    const selector = `.switcher_items a[data-type='${type}']`;
    document.querySelectorAll(selector).forEach(item => {
      item.classList.toggle("active", item.dataset.id === themeId);
    });
  }

  function restoreSwitcherPreference(type, storageKey) {
    const savedId = localStorage.getItem(storageKey) || "default";
    const savedLink = document.querySelector(`.switcher_items a[data-type='${type}'][data-id='${savedId}']`);
    if (!savedLink) return "default";

    applySwitcherStylesheet(type, savedId, savedLink.dataset.url || "");
    setSwitcherActive(type, savedId);
    return savedId;
  }

  const restoredColorTheme = restoreSwitcherPreference("color", "galleryColorTheme");
  restoreSwitcherPreference("font", "galleryFontTheme");
  applyColorTheme(restoredColorTheme);

  const savedRtl = localStorage.getItem("galleryRtl") === "1";
  const rtlInput = document.getElementById("show-rtl");
  if (rtlInput) {
    rtlInput.checked = savedRtl;
    if (savedRtl) {
      const stylesheet = document.createElement("link");
      stylesheet.media = "all";
      stylesheet.type = "text/css";
      stylesheet.href = rtlInput.dataset.url || "";
      stylesheet.id = "pinhole-rtl-css-custom";
      stylesheet.rel = "stylesheet";
      document.head.appendChild(stylesheet);
    }
  }

  document.querySelectorAll(".switcher_items.colors a[data-type='color']").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      applySwitcherStylesheet("color", link.dataset.id || "default", link.dataset.url || "");
      setSwitcherActive("color", link.dataset.id || "default");
      localStorage.setItem("galleryColorTheme", link.dataset.id || "default");
      applyColorTheme(link.dataset.id || "default");
    }, true);
  });

  document.querySelectorAll(".switcher_items.fonts a[data-type='font']").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      applySwitcherStylesheet("font", link.dataset.id || "default", link.dataset.url || "");
      setSwitcherActive("font", link.dataset.id || "default");
      localStorage.setItem("galleryFontTheme", link.dataset.id || "default");
    }, true);
  });

  rtlInput?.addEventListener("change", (e) => {
    e.stopImmediatePropagation();
    localStorage.setItem("galleryRtl", rtlInput.checked ? "1" : "0");
  }, true);

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
    document.querySelectorAll(".pinhole-upload-trigger").forEach(el => el.style.display = "none");
  }

  function unlockGallery() {
    HAS_TOKEN = true;
    document.body.classList.add("has-token");
    document.body.classList.remove("pinhole-lock", "pinhole-sidebar-open");
    refreshTopActionsVisibility();
    document.querySelectorAll(".pinhole-upload-trigger").forEach(el => el.style.display = "");
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

  function getRouteIdByFolder(folder) {
    const normalizedFolder = String(folder || "").trim();
    for (const route of menuRouteMap.values()) {
      if (route.folder === normalizedFolder) return route.id;
    }
    return "";
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

  function setDownloadActionVisibility(visible) {
    const btn = ensureTopActions().querySelector(".download-all");
    if (!btn) return;
    btn.classList.toggle("is-hidden-action", !visible);
  }

  function setTopActionsVisibility(visible) {
    ensureTopActions().classList.toggle("is-hidden", !visible);
  }

  function refreshTopActionsVisibility() {
    const currentId = location.hash.replace("#", "");
    const isHome = isHomeRoute(currentId);
    setTopActionsVisibility(HAS_TOKEN);
    setDownloadActionVisibility(!isHome);
  }

  function stopHomeSlider() {
    if (homeSliderTimer) {
      clearInterval(homeSliderTimer);
      homeSliderTimer = null;
    }
  }

  function showInteractiveBackground() {
    document.body.classList.toggle("show-interactive-background", true);
  }

  function showHomeView() {
    showInteractiveBackground();
    if (activeController) activeController.abort();
    activeController = new AbortController();
    const requestId = ++activeRequestId;
    const guestVideos = ["1.mp4", "2.mp4", "3.mp4", "4.mp4", "5.mp4"];
    const homeVideo = guestVideos[Math.floor(Math.random() * guestVideos.length)];

    stopHomeSlider();
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
    setTopActionsVisibility(HAS_TOKEN);
    setDownloadActionVisibility(false);

    galleryContainer.style.height = "auto";
    galleryContainer.style.minHeight = "0";
    galleryContainer.style.paddingBottom = "0";
    galleryContainer.classList.add("pinhole-gallery-loaded");

    galleryContainer.innerHTML = `
      <section class="home-hero" aria-label="Presentación del proyecto">
        <div class="home-hero-slider is-loading" aria-label="Imágenes destacadas aleatorias">
          ${HAS_TOKEN
            ? `<div class="home-hero-slider-loader">Cargando recuerdos...</div>`
            : `<video class="home-guest-video" src="./resources/${homeVideo}" autoplay muted loop playsinline preload="metadata" aria-label="Video de presentación"></video>`
          }
        </div>
        <p class="home-hero-description">WebApp de imágenes estilo Instagram con feed dinámico, scroll infinito, navegación por álbumes, carga optimizada y una experiencia fluida en dispositivos móviles y escritorio.</p>
        <cite>– Phpeitor</cite>
      </section>
    `;

    if (HAS_TOKEN) {
      loadHomeSlider(requestId, activeController.signal);
    } else {
      const slider = galleryContainer.querySelector(".home-hero-slider");
      slider?.classList.remove("is-loading");
      slider?.classList.add("is-guest-video");
    }
  }

  async function loadHomeSlider(requestId, signal) {
    try {
      const res = await fetch("php/home_slider.php?limit=5", { signal, cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (requestId !== activeRequestId) return;

      renderHomeSlider(Array.isArray(data.items) ? data.items : []);
    } catch (e) {
      if (e.name === "AbortError") return;
      console.error(e);
      renderHomeSlider([]);
    }
  }

  function renderHomeSlider(items) {
    const slider = galleryContainer.querySelector(".home-hero-slider");
    if (!slider) return;

    stopHomeSlider();

    if (!items.length) {
      slider.classList.remove("is-loading");
      slider.innerHTML = `<div class="home-hero-slider-empty">No hay imágenes disponibles para mostrar.</div>`;
      return;
    }

    slider.classList.remove("is-loading");
    const slideHtml = items.map((item, index) => {
      const src = escapeHtml(item.thumb || item.url || "");
      return `
        <div class="home-hero-slide" aria-hidden="true">
          <span class="home-story-bars" aria-hidden="true"><i></i><i></i><i></i></span>
          <img src="${src}" alt="" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
          <span class="home-slide-reaction" aria-hidden="true">♡</span>
          <span class="home-slide-pill" aria-hidden="true"></span>
        </div>
      `;
    }).join("");

    slider.innerHTML = `
      <span class="home-slider-emoji emoji-eyes" aria-hidden="true">👀</span>
      <span class="home-slider-emoji emoji-party" aria-hidden="true">🥳</span>
      <span class="home-slider-emoji emoji-heart" aria-hidden="true">💖</span>
      <span class="home-slider-emoji emoji-star" aria-hidden="true">⭐</span>
      <div class="home-slider-deck">${slideHtml}</div>
    `;

    let activeIndex = 0;
    const slides = Array.from(slider.querySelectorAll(".home-hero-slide"));

    const updateSlides = () => {
      const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
      const nextIndex = (activeIndex + 1) % slides.length;

      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeIndex);
        slide.classList.toggle("is-prev", slides.length > 1 && index === prevIndex);
        slide.classList.toggle("is-next", slides.length > 1 && index === nextIndex);
        slide.setAttribute("aria-hidden", index === activeIndex ? "false" : "true");
      });
    };

    updateSlides();
    if (items.length < 2) return;

    homeSliderTimer = setInterval(() => {
      activeIndex = (activeIndex + 1) % slides.length;
      updateSlides();
    }, 3600);
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
    let filename, thumb, realW, realH;

    if (typeof itemData === "string") {
      filename = itemData;
      thumb = "";
      realW = FALLBACK_WIDTH;
      realH = FALLBACK_HEIGHT;
    } else {
      filename = itemData.filename;
      thumb = itemData.thumb || "";
      realW = Number(itemData.width) || FALLBACK_WIDTH;
      realH = Number(itemData.height) || FALLBACK_HEIGHT;
    }

    // Si la metadata viene corrupta (0/NaN), evita alturas gigantes que rompen Masonry.
    if (!Number.isFinite(realW) || realW <= 0) realW = FALLBACK_WIDTH;
    if (!Number.isFinite(realH) || realH <= 0) realH = FALLBACK_HEIGHT;

    const sourcePath = `${folder}/${filename}`;
    const thumbPath = thumb ? `${folder}/${thumb}` : sourcePath;
    const url = `php/media.php?path=${encodeURIComponent(sourcePath)}`;
    const imgSrc = `php/media.php?path=${encodeURIComponent(thumbPath)}`;
    const thumbH = Math.round(THUMB_WIDTH * (realH / realW));

    const wrap = document.createElement("div");
    wrap.className = "pinhole-item col-lg-4 col-md-4 col-sm-6 is-loading-image";
    wrap.innerHTML = `
      <a class="item-link" href="${url}" data-size='{"width":${realW},"height":${realH}}'>
        <img
          src="${imgSrc}"
          alt=""
          width="${THUMB_WIDTH}"
          height="${thumbH}"
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        >
      </a>
      <button type="button" class="gallery-delete-image" data-path="${escapeHtml(sourcePath)}" aria-label="Eliminar imagen">
        <i class="fa fa-trash" aria-hidden="true"></i>
      </button>
    `;

    const img = wrap.querySelector("img");
    const markLoaded = () => {
      wrap.classList.remove("is-loading-image");
      wrap.classList.add("is-loaded-image");
    };

    if (img.complete) {
      markLoaded();
    } else {
      img.addEventListener("load", markLoaded, { once: true });
      img.addEventListener("error", () => {
        wrap.classList.remove("is-loading-image");
        wrap.classList.add("is-error-image");
      }, { once: true });
    }

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
    showInteractiveBackground();
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
  let currentTitle = "";

  async function fetchAndRender(folder, titleText = "") {
    if (!HAS_TOKEN) return;
    showInteractiveBackground();
    setDownloadActionVisibility(true);

    currentFolder = folder;
    currentTitle = titleText;

    stopHomeSlider();

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
      { rootMargin: "900px 0px" } // Precarga antes de que el usuario llegue al final.
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

    const deleteBtn = e.target.closest(".gallery-delete-image");
    if (deleteBtn) {
      e.preventDefault();
      e.stopPropagation();

      if (!uploadTokenValid) {
        alertify.error("Valida el token de subida para eliminar imagenes");
        return;
      }

      const path = deleteBtn.dataset.path || "";
      if (!path) return;

      alertify.confirm("Eliminar imagen", "Esta accion eliminara la imagen del album. ¿Continuar?", async () => {
        deleteBtn.disabled = true;
        try {
          const formData = new FormData();
          formData.append("path", path);
          const res = await fetch("php/delete_image.php", { method: "POST", body: formData });
          const data = await res.json();
          if (!data.ok) {
            alertify.error(data.error || "No se pudo eliminar");
            deleteBtn.disabled = false;
            return;
          }
          alertify.success("Imagen eliminada");
          if (currentFolder && currentTitle) fetchAndRender(currentFolder, currentTitle);
        } catch (err) {
          console.error(err);
          alertify.error("Error eliminando imagen");
          deleteBtn.disabled = false;
        }
      }, () => {}).set({ closable: true });
      return;
    }

    const link = e.target.closest("a.item-link");
    if (!link) return;

    e.preventDefault();
    e.stopPropagation();

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
      {
        index,
        history: false,
        shareEl: true,
        fullscreenEl: true,
        zoomEl: true,
        closeEl: true,
        counterEl: true,
        captionEl: false
      }
    );

    // Botón download
    pswp.listen("beforeChange", () => {
      const btn = document.querySelector(".pswp__button--download");
      if (btn) {
        btn.href = pswp.currItem.src;
        btn.download = pswp.currItem.src.split("/").pop();
      }
    });

    pswp.listen("afterInit", () => {
      document.querySelectorAll(".pswp [data-tooltip]").forEach(el => {
        if (el.dataset.pswpTooltipReady === "1") return;
        el.dataset.pswpTooltipReady = "1";
        el.addEventListener("mouseenter", function () {
          const tip = document.createElement("span");
          tip.className = "pswp-tooltip";
          tip.textContent = this.dataset.tooltip;
          this.appendChild(tip);
        });
        el.addEventListener("mouseleave", function () {
          const tip = this.querySelector(".pswp-tooltip");
          if (tip) tip.remove();
        });
      });
    });

    pswp.init();
  });

  // ====== Upload modal ======
  const uploadModal = document.getElementById("upload-modal");
  const modalClose = uploadModal?.querySelector(".upload-modal-close");
  const uploadTokenSection = document.getElementById("upload-token-section");
  const uploadFormSection = document.getElementById("upload-form-section");
  const uploadTokenInput = document.getElementById("upload-token-input");
  const btnUploadToken = document.getElementById("btn-upload-token");
  const uploadTokenStatus = document.getElementById("upload-token-status");
  const uploadForm = document.getElementById("upload-form");
  const folderSelect = document.getElementById("upload-folder");
  const folderCombobox = document.querySelector("[data-upload-combobox]");
  const folderTrigger = document.getElementById("upload-folder-trigger");
  const folderTriggerValue = folderTrigger?.querySelector(".upload-combobox-value");
  const folderSearch = document.getElementById("upload-folder-search");
  const folderResults = document.getElementById("upload-folder-results");
  const newAlbumName = document.getElementById("new-album-name");
  const subfolderField = document.getElementById("subfolder-field");
  const newFolderName = document.getElementById("new-folder-name");
  const fileInput = document.getElementById("upload-files");
  const fileDropzone = document.getElementById("upload-dropzone");
  const fileSummary = document.getElementById("upload-file-summary");
  const preview = document.getElementById("upload-preview");
  const status = document.getElementById("upload-status");
  const btnUpload = document.getElementById("btn-upload");

  let uploadTokenValid = false;
  let uploadAlbumOptions = [];
  let selectedUploadFiles = [];

  function setUploadTokenState(valid) {
    uploadTokenValid = valid;
    document.body.classList.toggle("has-upload-token", valid);
  }

  async function checkUploadToken() {
    try {
      const res = await fetch("php/check_upload_token.php", { cache: "no-store" });
      const data = await res.json();
      setUploadTokenState(Boolean(data.valid));
    } catch {
      setUploadTokenState(false);
    }
  }

  async function openUploadModal() {
    if (!uploadModal) return;
    uploadModal.classList.add("open");
    if (uploadTokenInput) uploadTokenInput.value = "";
    if (uploadTokenStatus) uploadTokenStatus.innerHTML = "";
    await checkUploadToken();
    if (uploadTokenValid) {
      if (uploadTokenSection) uploadTokenSection.style.display = "none";
      if (uploadFormSection) uploadFormSection.style.display = "block";
      loadFolderList();
      clearUploadForm();
    } else {
      if (uploadTokenSection) uploadTokenSection.style.display = "block";
      if (uploadFormSection) uploadFormSection.style.display = "none";
    }
  }

  function closeUploadModal() {
    if (!uploadModal) return;
    uploadModal.classList.remove("open");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest(".pinhole-upload-trigger")) {
      e.preventDefault();
      openUploadModal();
    }
  });

  if (modalClose) modalClose.addEventListener("click", closeUploadModal);

  if (btnUploadToken) {
    btnUploadToken.addEventListener("click", async () => {
      if (!uploadTokenInput || !uploadTokenStatus) return;
      const token = uploadTokenInput.value.trim();
      if (!token) {
        uploadTokenInput.classList.add("input-error");
        return;
      }
      uploadTokenInput.classList.remove("input-error");
      uploadTokenStatus.innerHTML = '<span class="info">Validando...</span>';
      try {
        const res = await fetch("php/upload_token_validate.php", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "token=" + encodeURIComponent(token),
        });
        const data = await res.json();
        if (data.ok) {
          setUploadTokenState(true);
          uploadTokenStatus.innerHTML = '<span class="success">Token valido</span>';
          if (uploadTokenSection) uploadTokenSection.style.display = "none";
          if (uploadFormSection) uploadFormSection.style.display = "block";
          loadFolderList();
          clearUploadForm();
        } else {
          uploadTokenInput.classList.add("input-error");
          uploadTokenInput.focus();
          uploadTokenStatus.innerHTML = '';
        }
      } catch {
        uploadTokenInput.classList.add("input-error");
        uploadTokenInput.focus();
        uploadTokenStatus.innerHTML = '';
      }
    });

    uploadTokenInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        btnUploadToken.click();
      }
    });
  }

  async function loadFolderList() {
    if (!folderSelect) return;
    folderSelect.innerHTML = '<option value="">-- Seleccionar existente --</option>';
    folderSelect.disabled = true;
    uploadAlbumOptions = [];
    renderUploadAlbumOptions();
    try {
      const res = await fetch("php/menu.php", { cache: "no-store" });
      const data = await res.json();
      const groups = Array.isArray(data?.groups) ? data.groups : [];
      groups.forEach(g => {
        if (g.folder) {
          const opt = document.createElement("option");
          opt.value = g.folder;
          opt.textContent = g.group;
          folderSelect.appendChild(opt);
          uploadAlbumOptions.push({ value: g.folder, label: g.group, meta: "" });
        }
        if (g.items) {
          g.items.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.folder;
            opt.textContent = g.group + " / " + item.title;
            folderSelect.appendChild(opt);
            uploadAlbumOptions.push({ value: item.folder, label: g.group + " / " + item.title, meta: g.group });
          });
        }
      });
    } catch {
      // ignore
    } finally {
      folderSelect.disabled = false;
      renderUploadAlbumOptions();
    }
  }

  function closeUploadAlbumCombobox() {
    folderCombobox?.classList.remove("open");
    folderTrigger?.setAttribute("aria-expanded", "false");
  }

  function openUploadAlbumCombobox() {
    if (!folderCombobox || !folderTrigger) return;
    folderCombobox.classList.add("open");
    folderTrigger.setAttribute("aria-expanded", "true");
    renderUploadAlbumOptions();
    setTimeout(() => folderSearch?.focus(), 0);
  }

  function selectUploadAlbum(value, label) {
    if (folderSelect) folderSelect.value = value;
    if (folderTriggerValue) folderTriggerValue.textContent = label || "Buscar o seleccionar album";
    if (folderSearch) folderSearch.value = "";
    setUploadInvalid(folderTrigger, false);
    closeUploadAlbumCombobox();

    const routeId = getRouteIdByFolder(value);
    if (HAS_TOKEN && routeId) {
      history.replaceState(null, "", "#" + routeId);
      fetchAndRender(value, label);
    }
  }

  function renderUploadAlbumOptions() {
    if (!folderResults) return;
    const query = (folderSearch?.value || "").trim().toLowerCase();
    const filtered = uploadAlbumOptions.filter(option => {
      return option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      folderResults.innerHTML = '<div class="upload-combobox-empty">No hay albums que coincidan</div>';
      return;
    }

    folderResults.innerHTML = "";
    filtered.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "upload-combobox-option";
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", folderSelect?.value === option.value ? "true" : "false");
      button.dataset.value = option.value;
      button.innerHTML = '<span>' + escapeHtml(option.label) + '</span>'
        + (option.meta ? '<small>' + escapeHtml(option.meta) + '</small>' : '');
      button.addEventListener("click", () => selectUploadAlbum(option.value, option.label));
      folderResults.appendChild(button);
    });
  }

  function setUploadInvalid(el, invalid) {
    el?.classList.toggle("upload-invalid", invalid);
  }

  function clearUploadValidation() {
    setUploadInvalid(folderTrigger, false);
    setUploadInvalid(newAlbumName, false);
    setUploadInvalid(fileDropzone, false);
  }

  if (folderTrigger) {
    folderTrigger.addEventListener("click", () => {
      setUploadInvalid(folderTrigger, false);
      folderCombobox?.classList.contains("open") ? closeUploadAlbumCombobox() : openUploadAlbumCombobox();
    });
  }

  if (folderSearch) {
    folderSearch.addEventListener("input", renderUploadAlbumOptions);
    folderSearch.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeUploadAlbumCombobox();
      if (e.key === "Enter") {
        const firstOption = folderResults?.querySelector(".upload-combobox-option");
        if (firstOption) {
          e.preventDefault();
          selectUploadAlbum(firstOption.dataset.value || "", firstOption.querySelector("span")?.textContent || "");
        }
      }
    });
  }

  document.addEventListener("click", (e) => {
    if (folderCombobox && !folderCombobox.contains(e.target)) closeUploadAlbumCombobox();
  });

  // Upload mode tabs
  const uploadTabs = document.querySelectorAll(".upload-tab");
  const modeExisting = document.getElementById("upload-mode-existing");
  const modeNew = document.getElementById("upload-mode-new");
  let uploadMode = "existing";

  uploadTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      uploadTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      uploadMode = tab.dataset.mode;
      if (modeExisting) modeExisting.classList.toggle("active", uploadMode === "existing");
      if (modeNew) modeNew.classList.toggle("active", uploadMode === "new");
      clearUploadValidation();
    });
  });

  function clearUploadForm() {
    if (fileInput) fileInput.value = "";
    selectedUploadFiles = [];
    if (preview) preview.innerHTML = "";
    if (fileSummary) fileSummary.textContent = "Sin archivos seleccionados";
    if (status) status.innerHTML = "";
    if (newAlbumName) newAlbumName.value = "";
    if (newFolderName) newFolderName.value = "";
    if (btnUpload) btnUpload.disabled = false;
    if (folderSelect) folderSelect.value = "";
    if (folderTriggerValue) folderTriggerValue.textContent = "Buscar o seleccionar album";
    if (folderSearch) folderSearch.value = "";
    closeUploadAlbumCombobox();
    clearUploadValidation();
    // Reset mode to "Album existente"
    uploadMode = "existing";
    uploadTabs.forEach(t => t.classList.remove("active"));
    if (uploadTabs[0]) uploadTabs[0].classList.add("active");
    if (modeExisting) modeExisting.classList.add("active");
    if (modeNew) modeNew.classList.remove("active");
  }

  if (fileInput) {
    const syncUploadFileInput = (files) => {
      const transfer = new DataTransfer();
      selectedUploadFiles = files;
      selectedUploadFiles.forEach(file => transfer.items.add(file));
      fileInput.files = transfer.files;
    };

    const renderSelectedFiles = () => {
      if (!preview) return;
      preview.innerHTML = "";
      const files = selectedUploadFiles;
      if (fileSummary) {
        const totalMb = files.reduce((sum, file) => sum + file.size, 0) / 1024 / 1024;
        fileSummary.textContent = files.length
          ? files.length + " archivo(s) seleccionados · " + totalMb.toFixed(1) + " MB"
          : "Sin archivos seleccionados";
      }
      if (files.length === 0) return;
      for (const f of files) {
        if (!f.type.startsWith("image/")) continue;
        const item = document.createElement("div");
        item.className = "upload-preview-item";
        const img = document.createElement("img");
        img.src = URL.createObjectURL(f);
        img.alt = f.name;
        img.onload = () => URL.revokeObjectURL(img.src);
        const name = document.createElement("span");
        name.textContent = f.name;
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.className = "upload-preview-remove";
        removeBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
        removeBtn.setAttribute("aria-label", "Quitar " + f.name);
        removeBtn.addEventListener("click", () => {
          syncUploadFileInput(selectedUploadFiles.filter(file => file !== f));
          renderSelectedFiles();
        });
        item.appendChild(img);
        item.appendChild(removeBtn);
        item.appendChild(name);
        preview.appendChild(item);
      }
    };

    fileInput.addEventListener("change", () => {
      selectedUploadFiles = Array.from(fileInput.files || []);
      renderSelectedFiles();
      setUploadInvalid(fileDropzone, false);
    });

    newAlbumName?.addEventListener("input", () => setUploadInvalid(newAlbumName, false));
    folderSelect?.addEventListener("change", () => setUploadInvalid(folderTrigger, false));

    if (fileDropzone) {
      ["dragenter", "dragover"].forEach(eventName => {
        fileDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          fileDropzone.classList.add("dragging");
        });
      });
      ["dragleave", "drop"].forEach(eventName => {
        fileDropzone.addEventListener(eventName, (e) => {
          e.preventDefault();
          fileDropzone.classList.remove("dragging");
        });
      });
      fileDropzone.addEventListener("drop", (e) => {
        const files = Array.from(e.dataTransfer?.files || []).filter(file => file.type.startsWith("image/"));
        if (!files.length) return;
        syncUploadFileInput(files);
        setUploadInvalid(fileDropzone, false);
        renderSelectedFiles();
      });
    }
  }

  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!folderSelect || !newAlbumName || !fileInput || !status || !btnUpload) return;

      const files = selectedUploadFiles;
      clearUploadValidation();

      // === Construir ruta destino (max 2 niveles) ===
      let targetFolder = "";
      const subfolder = newFolderName?.value.trim() || "";
      const missingFiles = files.length === 0;
      let missingDestination = false;

      if (uploadMode === "new") {
        const newAlbum = newAlbumName.value.trim();
        if (!newAlbum) {
          missingDestination = true;
          setUploadInvalid(newAlbumName, true);
        } else {
          targetFolder = newAlbum.replace(/[^\w\- ]/g, "").trim().replace(/\s+/g, "_");
        }
        if (subfolder) {
          targetFolder += "/" + subfolder.replace(/[^\w\- ]/g, "").trim().replace(/\s+/g, "_");
        }
      } else {
        const selectedFolder = folderSelect.value;
        if (!selectedFolder) {
          missingDestination = true;
          setUploadInvalid(folderTrigger, true);
        } else {
          targetFolder = selectedFolder;
        }
        if (subfolder) {
          const parts = targetFolder.split("/");
          if (parts.length >= 2) {
            status.innerHTML = '<span class="error">Solo se permiten 2 niveles (album / subcarpeta)</span>';
            return;
          }
          targetFolder += "/" + subfolder.replace(/[^\w\- ]/g, "").trim().replace(/\s+/g, "_");
        }
      }

      if (missingFiles) setUploadInvalid(fileDropzone, true);
      if (missingFiles || missingDestination) {
        status.innerHTML = '<span class="error"><i class="fa fa-info-circle" aria-hidden="true"></i> Completa los campos marcados antes de subir</span>';
        return;
      }

      // === Confirmacion con Alertify ===
      const fileCount = files.length;
      const fileNames = Array.from(files).map(f => "• " + f.name).join("\n");
      const msg = "<b>Destino:</b> " + targetFolder + "<br>"
                + "<b>Archivos:</b> " + fileCount + "<br><br>"
                + fileNames.replace(/\n/g, "<br>");

      alertify.confirm("Confirmar subida", msg, async () => {
        await doUpload();
      }, () => {})
      .set({
        'closable': false,
        'closableByDimmer': false
      });

      async function doUpload() {
        if (uploadMode === "new" || (subfolder && uploadMode === "existing")) {
          try {
            const formData = new FormData();
            if (targetFolder.includes("/")) {
              formData.append("parent", targetFolder.split("/")[0]);
              formData.append("name", targetFolder.split("/")[1]);
            } else {
              formData.append("parent", "");
              formData.append("name", targetFolder);
            }
            const res = await fetch("php/create_folder.php", { method: "POST", body: formData });
            const data = await res.json();
            if (!data.ok) {
              status.innerHTML = '<span class="error">Error al crear carpeta: ' + (data.error || "") + '</span>';
              return;
            }
          } catch {
            status.innerHTML = '<span class="error">Error de conexion al crear carpeta</span>';
            return;
          }
        }

        // === Subir archivos ===
        btnUpload.disabled = true;
        btnUpload.textContent = "Subiendo...";
        status.innerHTML = '<span class="info">Subiendo archivos...</span>';

        try {
          const formData = new FormData();
          formData.append("folder", targetFolder);
          for (const f of files) {
            formData.append("files[]", f);
          }

          const res = await fetch("php/upload.php", { method: "POST", body: formData });
          const data = await res.json();

          if (data.ok) {
            status.innerHTML = '<span class="success">' + data.uploaded + ' archivo(s) subido(s) correctamente</span>';
            if (data.errors?.length) {
              status.innerHTML += '<br><span class="error">' + data.errors.join("<br>") + '</span>';
            }
            clearUploadForm();
            loadDynamicMenus();
            if (currentFolder && currentTitle) {
              fetchAndRender(currentFolder, currentTitle);
            }
          } else {
            status.innerHTML = '<span class="error">' + (data.error || "Error al subir") + '</span>';
            if (data.errors?.length) {
              status.innerHTML += '<br><span class="error">' + data.errors.join("<br>") + '</span>';
            }
          }
        } catch (e) {
          status.innerHTML = '<span class="error">Error: ' + e.message + '</span>';
          console.error(e);
        } finally {
          btnUpload.disabled = false;
          btnUpload.innerHTML = '<i class="fa fa-upload"></i> Subir';
        }
      }

    });
  }

  checkUploadToken();

});
