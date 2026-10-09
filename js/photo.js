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
  const configuredPageSize = Number(window.PIXITOR_CONFIG?.pageSize);
  const CHUNK = Number.isInteger(configuredPageSize) && configuredPageSize > 0
    ? Math.min(configuredPageSize, 50)
    : 12;
  const UNLOCK_REDIRECT_DELAY = 1300;
  const API = {
    tokenValidate: "php/token_validate.php",
    checkToken: "php/check_token.php",
    logout: "php/logout.php",
    menu: "php/menu.php",
    homeSlider: "php/home_slider.php",
    media: "php/media.php",
    list: "php/list.php",
    zip: "php/zip.php",
    deleteImage: "php/delete_image.php",
    checkUploadToken: "php/check_upload_token.php",
    uploadTokenValidate: "php/upload_token_validate.php",
    createFolder: "php/create_folder.php",
    upload: "php/upload.php",
    ...(window.PIXITOR_CONFIG?.endpoints || {}),
  };
  const configuredUploadLimit = Number(window.PIXITOR_CONFIG?.maxUploadFiles);
  const MAX_UPLOAD_FILES = Number.isInteger(configuredUploadLimit) && configuredUploadLimit > 0
    ? configuredUploadLimit
    : 20;
  const ALLOWED_UPLOAD_EXTENSIONS = Array.isArray(window.PIXITOR_CONFIG?.allowedUploadExtensions)
    ? window.PIXITOR_CONFIG.allowedUploadExtensions
    : ["jpg", "jpeg", "png", "webp"];
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
  let homeVideoResizeHandler = null;
  let homeVideoLoadTimer = null;
  const tokenLockTimers = {};
  const menuRouteMap = new Map();

  const HOME_HASHES = new Set(["", "/", "home", "inicio", "viewall"]);
  let activeColorThemeId = "default";
  const galleryTokenForm = document.getElementById("mc-embedded-subscribe-form");
  const galleryTokenInput = document.getElementById("token");
  const galleryTokenButton = document.getElementById("btn_token");
  const galleryTokenButtonLabel = galleryTokenButton?.querySelector(".token-button-label");
  const galleryTokenStatus = document.getElementById("mce-responses");

  function setGalleryTokenLoading(loading, label = loading ? "Validando" : "Ingresar") {
    galleryTokenForm?.classList.toggle("is-validating", loading);
    if (galleryTokenInput) galleryTokenInput.disabled = loading;
    if (galleryTokenButton) {
      galleryTokenButton.disabled = loading;
      galleryTokenButton.toggleAttribute("aria-busy", loading);
    }
    if (galleryTokenButtonLabel) galleryTokenButtonLabel.textContent = label;
  }

  // Evita que el script del tema vuelva a tomar control del layout de esta galería.
  galleryContainer?.classList.remove("pinhole-masonry", "pinhole-grid");

  document.querySelectorAll(".current-year").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  function setThemeLogo() {
    const useDarkInkLogo = activeColorThemeId === "default" || activeColorThemeId === "color-3";
    const logoSrc = useDarkInkLogo
      ? "./resources/phpeitor-pixsvg.svg?v=3"
      : "./resources/phpeitor-pixsvg-light.svg?v=1";
    document.querySelectorAll(".pinhole-site-branding img").forEach(img => {
      if (!img.src.endsWith(logoSrc.replace("./", ""))) img.src = logoSrc;
      img.removeAttribute("srcset");
    });
  }

  function applyColorTheme(themeId = "default") {
    activeColorThemeId = themeId;
    document.body.classList.remove("theme-default", "theme-color-1", "theme-color-2", "theme-color-3", "theme-color-4");
    document.body.classList.add("theme-" + themeId);
    setThemeLogo();
    window.refreshInteractiveBackground?.();
  }

  const brandingLogoObserver = new MutationObserver(setThemeLogo);
  document.querySelectorAll(".pinhole-site-branding img.pinhole-logo").forEach(img => {
    brandingLogoObserver.observe(img, { attributes: true, attributeFilter: ["src", "srcset"] });
  });
  // The bundled theme swaps its logo on breakpoints; restore Pixitor's themed SVG afterwards.
  window.addEventListener("resize", setThemeLogo, { passive: true });

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

  function restoreSwitcherPreference(type, storageKey, defaultId = "default") {
    const savedId = localStorage.getItem(storageKey) || defaultId;
    const savedLink = document.querySelector(`.switcher_items a[data-type='${type}'][data-id='${savedId}']`);
    if (!savedLink) return defaultId;

    applySwitcherStylesheet(type, savedId, savedLink.dataset.url || "");
    setSwitcherActive(type, savedId);
    return savedId;
  }

  const themePreferenceMigrationKey = "galleryColorThemeDarkDefaultV2";
  if (localStorage.getItem(themePreferenceMigrationKey) !== "1") {
    const previousColorPreference = localStorage.getItem("galleryColorTheme");
    if (!previousColorPreference || previousColorPreference === "default") {
      localStorage.setItem("galleryColorTheme", "color-1");
    }
    localStorage.setItem(themePreferenceMigrationKey, "1");
  }
  const restoredColorTheme = restoreSwitcherPreference("color", "galleryColorTheme", "color-1");
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
  function showGalleryTokenLock(retryAfter) {
    const input = document.getElementById("token");
    const btnToken = document.getElementById("btn_token");
    const tokenStatus = document.getElementById("mce-responses");

    document.body.classList.add("pinhole-sidebar-open");
    input?.classList.add("input-error");
    setGalleryTokenLoading(false, "Bloqueado");
    if (btnToken) btnToken.disabled = true;
    if (!tokenStatus) return;

    tokenStatus.innerHTML = '<span class="error"><i class="fa fa-info-circle" aria-hidden="true"></i> Demasiados intentos. Regresa en <b class="token-countdown"></b></span>';
    const countdownEl = tokenStatus.querySelector(".token-countdown");

    startTokenCountdown({
      seconds: retryAfter,
      timerName: "galleryTokenLockTimer",
      render: (remaining) => {
        if (countdownEl) countdownEl.textContent = formatRetryAfter(remaining);
      },
      onDone: () => {
        setGalleryTokenLoading(false);
        input?.classList.remove("input-error");
        tokenStatus.innerHTML = '<span class="info">Ya puedes intentar nuevamente</span>';
      }
    });
  }

  galleryTokenForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = galleryTokenInput;
      const btnToken = galleryTokenButton;
      const tokenStatus = galleryTokenStatus;
      const token = input.value.trim();
      let keepLocked = false;
      let keepUnlocking = false;
      input.classList.remove("input-error");
      if (tokenStatus) tokenStatus.innerHTML = "";

      if (!token) {
        input.classList.add("input-error");
        input.focus();
        return;
      }

      setGalleryTokenLoading(true, "Validando");
      if (tokenStatus) tokenStatus.innerHTML = '<span class="info">Comprobando acceso seguro…</span>';

      try {
        const res = await fetch(API.tokenValidate, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "token=" + encodeURIComponent(token),
        });
        const data = await res.json();

        if (data.ok) {
          keepUnlocking = true;
          showUnlockedLockBeforeReload(btnToken);
        } else if (data.locked) {
          keepLocked = true;
          showGalleryTokenLock(data.retryAfter);
          notifyUploadError("Demasiados intentos. Intenta nuevamente en unos minutos.");
        } else {
          input.classList.add("input-error");
          input.focus();
          const message = data.attemptsLeft !== undefined
            ? "Token invalido. Intentos restantes: " + data.attemptsLeft
            : "Token invalido o expirado";
          if (tokenStatus) {
            tokenStatus.innerHTML = '<span class="error"><i class="fa fa-info-circle" aria-hidden="true"></i> ' + message + '</span>';
          }
          notifyUploadError(message);
        }
      } catch (err) {
        console.error(err);
        if (tokenStatus) tokenStatus.innerHTML = '<span class="error"><i class="fa fa-info-circle" aria-hidden="true"></i> No se pudo validar. Revisa tu conexión e intenta de nuevo.</span>';
      } finally {
        if (!keepLocked && !keepUnlocking) setGalleryTokenLoading(false);
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
    document.body.classList.remove("pinhole-lock", "pinhole-sidebar-open", "pinhole-unlocking");
    refreshTopActionsVisibility();
    document.querySelectorAll(".pinhole-upload-trigger").forEach(el => el.style.display = "");
  }

  function showUnlockedLockBeforeReload(btnToken) {
    HAS_TOKEN = true;
    document.body.classList.add("has-token", "pinhole-unlocking", "pinhole-sidebar-open");
    if (galleryTokenStatus) galleryTokenStatus.innerHTML = '<span class="success"><i class="fa fa-check-circle" aria-hidden="true"></i> Acceso confirmado. Preparando tu galería…</span>';
    if (btnToken) {
      btnToken.disabled = true;
      btnToken.setAttribute("aria-busy", "true");
      if (galleryTokenButtonLabel) galleryTokenButtonLabel.textContent = "Abriendo";
    }
    notifyUploadSuccess("Token correcto. Desbloqueando galería…");
    setTimeout(() => {
      unlockGallery();
      location.reload();
    }, UNLOCK_REDIRECT_DELAY);
  }

  async function checkToken() {
    try {
      const res = await fetch(API.checkToken, { cache: "no-store" });
      const data = await res.json();
      if (data.valid) {
        unlockGallery();
      } else {
        lockGallery();
        if (data.locked) showGalleryTokenLock(data.retryAfter);
      }
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

  function normalizeFolderSegment(value) {
    return String(value || "").replace(/[^\p{L}\p{N}_ -]/gu, "").trim().replace(/\s+/g, "_");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function formatRetryAfter(seconds) {
    const total = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(total / 60);
    const rest = total % 60;
    return `${minutes}:${String(rest).padStart(2, "0")}`;
  }

  function startTokenCountdown({ seconds, render, onDone, timerName }) {
    if (tokenLockTimers[timerName]) clearInterval(tokenLockTimers[timerName]);
    let remaining = Math.max(0, Number(seconds) || 0);
    render(remaining);

    tokenLockTimers[timerName] = setInterval(() => {
      remaining -= 1;
      render(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(tokenLockTimers[timerName]);
        tokenLockTimers[timerName] = null;
        setTimeout(() => onDone?.(), 700);
      }
    }, 1000);
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

  function renderMenuItems(items, groupName, parentTitle = "") {
    return (items || []).map((item) => {
      const title = String(item.title || "");
      const fullTitleText = [groupName, parentTitle, title].filter(Boolean).join(" ");
      const id = item.id ? escapeHtml(item.id) : "";
      const folder = item.folder ? escapeHtml(item.folder) : "";
      const link = id
        ? `<a href="#${id}" data-folder="${folder}" data-title="${escapeHtml(fullTitleText)}">${escapeHtml(title)}</a>`
        : `<a href="javascript:void(0)">${escapeHtml(title)}</a>`;
      const children = renderMenuItems(item.children, groupName, [parentTitle, title].filter(Boolean).join(" "));
      const hasChildren = children !== "";
      const classes = [
        "menu-item",
        "menu-item-type-custom",
        "menu-item-object-custom",
        id,
        hasChildren ? "menu-item-has-children" : ""
      ].filter(Boolean).join(" ");
      return `<li class="${classes}">${link}${hasChildren ? `<ul class="sub-menu">${children}</ul>` : ""}</li>`;
    }).join("");
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

      const children = renderMenuItems(group.items, group.group);

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

      const children = renderMenuItems(group.items, group.group);

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

    const uploadHtml = `
      <li class="menu-item menu-item-type-custom pinhole-upload-trigger" style="display:none">
        <a href="javascript:void(0)">Subir</a>
      </li>`;
    responsiveRoot.innerHTML = `${homeHtml}${groupHtml}${uploadHtml}`;

    responsiveRoot.querySelectorAll(".menu-item-has-children").forEach((item) => {
      if (!item.querySelector(":scope > .pinhole-nav-widget-acordion")) {
        item.querySelector(":scope > a")?.insertAdjacentHTML(
          "afterend",
          '<span class="pinhole-nav-widget-acordion"><i class="fa fa-angle-down"></i></span>'
        );
      }
    });
  }

  async function loadDynamicMenus() {
    try {
      const res = await fetch(API.menu, { cache: "no-store" });
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

  function getGalleryRoutes() {
    return Array.from(menuRouteMap.values()).filter(route => route.id && route.folder);
  }

  function setStickyGalleryNavVisible(visible) {
    document.body.classList.toggle("gallery-sticky-bottom-ready", visible);
  }

  function updateStickyGalleryNav(routeId = "") {
    const stickyBar = document.querySelector(".pinhole-sticky-bottom");
    if (!stickyBar) return;

    const routes = getGalleryRoutes();
    const activeId = toRouteId(routeId || getRouteIdByFolder(currentFolder) || location.hash.replace("#", ""));
    const activeIndex = routes.findIndex(route => route.id === activeId);
    const canNavigate = HAS_TOKEN && routes.length > 1 && activeIndex >= 0 && !isHomeRoute(activeId);

    setStickyGalleryNavVisible(canNavigate);
    if (!canNavigate) return;

    const previousRoute = routes[(activeIndex - 1 + routes.length) % routes.length];
    const nextRoute = routes[(activeIndex + 1) % routes.length];
    const previousLink = stickyBar.querySelector(".slot-left");
    const nextLink = stickyBar.querySelector(".slot-right");

    if (previousLink) {
      previousLink.href = `#${previousRoute.id}`;
      previousLink.dataset.galleryNav = previousRoute.id;
      previousLink.setAttribute("aria-label", `Galería anterior: ${previousRoute.title}`);
      previousLink.title = previousRoute.title;
    }

    if (nextLink) {
      nextLink.href = `#${nextRoute.id}`;
      nextLink.dataset.galleryNav = nextRoute.id;
      nextLink.setAttribute("aria-label", `Siguiente galería: ${nextRoute.title}`);
      nextLink.title = nextRoute.title;
    }
  }

  function ensureTopActions() {
    let bar = document.querySelector(".pinhole-top-actions");
    if (bar) return bar;

    bar = document.createElement("div");
    bar.className = "pinhole-top-actions";
    bar.setAttribute("aria-label", "Acciones rápidas");
    bar.innerHTML = `
      <a class="top-action-btn mobile-menu-action pinhole-action-sidebar has-tooltip" href="javascript:void(0);" data-tooltip="Ver galerías" aria-label="Ver galerías">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </a>
      <a class="top-action-btn download-all download-cta has-tooltip is-disabled" href="#" data-tooltip="Descargar galería" aria-label="Descargar galería" aria-disabled="true">
        <img src="./resources/download.webp" alt="Descargar">
      </a>
      <a class="top-action-btn logout-action has-tooltip" href="${escapeHtml(API.logout)}" data-tooltip="Cerrar sesión" aria-label="Cerrar sesión">
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
    updateStickyGalleryNav(currentId);
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
    document.body.classList.add("home-intro");
    document.body.classList.remove("home-story-ready");
    if (homeVideoLoadTimer) {
      clearTimeout(homeVideoLoadTimer);
      homeVideoLoadTimer = null;
    }
    if (homeVideoResizeHandler) {
      window.removeEventListener("resize", homeVideoResizeHandler);
      homeVideoResizeHandler = null;
    }
    if (activeController) activeController.abort();
    activeController = new AbortController();
    const requestId = ++activeRequestId;
    const guestVideos = ["2.mp4", "3.mp4", "4.mp4", "5.mp4"];
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
    updateStickyGalleryNav("home");

    galleryContainer.style.height = "auto";
    galleryContainer.style.minHeight = "0";
    galleryContainer.style.paddingBottom = "0";
    galleryContainer.classList.add("pinhole-gallery-loaded");

    galleryContainer.innerHTML = `
      <section class="home-hero" aria-label="Presentación del proyecto">
        <div class="home-hero-slider is-loading" aria-label="Imágenes destacadas aleatorias">
          ${HAS_TOKEN
            ? `<div class="home-hero-slider-loader">Cargando recuerdos...</div>`
            : `<video class="home-guest-video" src="./resources/${homeVideo}" autoplay muted loop playsinline preload="auto" aria-label="Video de presentación"></video>`
          }
        </div>
      </section>
    `;

    if (HAS_TOKEN) {
      loadHomeSlider(requestId, activeController.signal);
    } else {
      const slider = galleryContainer.querySelector(".home-hero-slider");
      slider?.classList.add("is-guest-video");
      const video = slider?.querySelector(".home-guest-video");
      if (video && slider) {
        const attemptedVideos = new Set([homeVideo]);
        const clearVideoLoadTimer = () => {
          if (homeVideoLoadTimer) clearTimeout(homeVideoLoadTimer);
          homeVideoLoadTimer = null;
        };
        homeVideoResizeHandler = () => {
          if (!video.videoWidth || !video.videoHeight) return;
          const ratio = video.videoWidth / video.videoHeight;
          const maxWidth = Math.min(460, window.innerWidth - 64);
          const maxHeight = Math.min(440, window.innerHeight * 0.46);
          const width = Math.min(maxWidth, maxHeight * ratio);
          slider.style.width = `${width}px`;
          slider.style.height = `${width / ratio}px`;
        };
        const showVideoFallback = () => {
          clearVideoLoadTimer();
          if (homeVideoResizeHandler) window.removeEventListener("resize", homeVideoResizeHandler);
          homeVideoResizeHandler = null;
          slider.classList.remove("is-loading");
          slider.classList.add("has-video-error");
          slider.innerHTML = '<div class="home-video-fallback"><i class="fa fa-film" aria-hidden="true"></i><span>El video no está disponible</span><small>Vuelve a intentarlo más tarde.</small></div>';
        };
        const tryNextVideo = () => {
          clearVideoLoadTimer();
          const nextVideo = guestVideos.find(source => !attemptedVideos.has(source));
          if (!nextVideo) {
            showVideoFallback();
            return;
          }
          attemptedVideos.add(nextVideo);
          video.src = `./resources/${nextVideo}`;
          video.load();
          homeVideoLoadTimer = setTimeout(tryNextVideo, 10000);
        };

        video.addEventListener("loadedmetadata", homeVideoResizeHandler);
        video.addEventListener("loadeddata", () => {
          clearVideoLoadTimer();
          slider.classList.remove("is-loading");
          const playback = video.play();
          playback?.catch(error => {
            if (error.name === "NotAllowedError") video.controls = true;
            else if (error.name !== "AbortError") tryNextVideo();
          });
        }, { once: true });
        video.addEventListener("error", tryNextVideo);
        homeVideoResizeHandler();
        window.addEventListener("resize", homeVideoResizeHandler, { passive: true });
        homeVideoLoadTimer = setTimeout(tryNextVideo, 10000);
      }
    }
  }

  async function loadHomeSlider(requestId, signal) {
    try {
      const sliderLimit = Math.min(Number(window.PIXITOR_CONFIG?.homeSliderLimit) || 5, 10);
      const res = await fetch(`${API.homeSlider}?limit=${sliderLimit}`, { signal, cache: "no-store" });
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
    document.body.classList.remove("home-story-ready");

    if (!items.length) {
      slider.classList.remove("is-loading");
      slider.innerHTML = `<div class="home-hero-slider-empty">No hay imágenes disponibles para mostrar.</div>`;
      return;
    }

    slider.classList.remove("is-loading");
    document.body.classList.add("home-story-ready");
    const slideHtml = items.map((item, index) => {
      const src = escapeHtml(item.thumb || item.url || "");
      return `
        <div class="home-hero-slide" aria-hidden="true">
          <img src="${src}" alt="Recuerdo destacado ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}" decoding="async">
        </div>
      `;
    }).join("");

    slider.innerHTML = `
      <div class="home-slider-deck">
        <div class="home-story-indicators" aria-hidden="true">${items.map((_, index) => `<i${index === 0 ? ' class="is-active"' : ""}></i>`).join("")}</div>
        ${slideHtml}
        <button type="button" class="home-story-nav home-story-prev" aria-label="Imagen anterior"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
        <button type="button" class="home-story-nav home-story-next" aria-label="Imagen siguiente"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
        <span class="home-story-count" aria-hidden="true"></span>
      </div>
    `;

    let activeIndex = 0;
    const slides = Array.from(slider.querySelectorAll(".home-hero-slide"));
    const indicators = Array.from(slider.querySelectorAll(".home-story-indicators i"));
    const counter = slider.querySelector(".home-story-count");

    const showSlide = (index) => {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        slide.classList.toggle("is-active", index === activeIndex);
        slide.setAttribute("aria-hidden", index === activeIndex ? "false" : "true");
      });
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("is-active", index === activeIndex);
        indicator.classList.toggle("is-done", index < activeIndex);
      });
      if (counter) counter.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    };

    showSlide(0);
    const previousButton = slider.querySelector(".home-story-prev");
    const nextButton = slider.querySelector(".home-story-next");
    if (items.length < 2) {
      if (previousButton) previousButton.disabled = true;
      if (nextButton) nextButton.disabled = true;
      return;
    }

    previousButton?.addEventListener("click", () => showSlide(activeIndex - 1));
    nextButton?.addEventListener("click", () => showSlide(activeIndex + 1));

    if (!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) {
      const pauseRotation = () => {
        if (homeSliderTimer) clearInterval(homeSliderTimer);
        homeSliderTimer = null;
      };
      const resumeRotation = () => {
        pauseRotation();
        homeSliderTimer = setInterval(() => showSlide(activeIndex + 1), 4800);
      };
      slider.addEventListener("mouseenter", pauseRotation);
      slider.addEventListener("mouseleave", resumeRotation);
      slider.addEventListener("focusin", pauseRotation);
      slider.addEventListener("focusout", (event) => {
        if (!slider.contains(event.relatedTarget)) resumeRotation();
      });
      resumeRotation();
    }
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
    const url = `${API.media}?path=${encodeURIComponent(sourcePath)}`;
    const imgSrc = `${API.media}?path=${encodeURIComponent(thumbPath)}`;
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
    const url = `${API.list}?folder=${encodeURIComponent(folder)}&offset=${offset}&limit=${limit}`;
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
    document.body.classList.remove("home-intro");
    if (homeVideoLoadTimer) {
      clearTimeout(homeVideoLoadTimer);
      homeVideoLoadTimer = null;
    }
    if (homeVideoResizeHandler) {
      window.removeEventListener("resize", homeVideoResizeHandler);
      homeVideoResizeHandler = null;
    }
    showInteractiveBackground();
    setDownloadActionVisibility(true);

    currentFolder = folder;
    currentTitle = titleText;
    updateStickyGalleryNav(getRouteIdByFolder(folder));

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
      notifyUploadError("No se pudo cargar la galería. Intenta nuevamente.");
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
      notifyUploadError("Necesitas validar el token de acceso antes de descargar.");
      return;
    }

    if (!currentFolder || btn.classList.contains("is-disabled")) {
      notifyUploadError("Selecciona una galería antes de descargar.");
      return;
    }

    if (downloadResetTimer) {
      clearTimeout(downloadResetTimer);
      downloadResetTimer = null;
    }

    setDownloadActionState({ enabled: true, loading: true });

    const url = `${API.zip}?folder=${encodeURIComponent(currentFolder)}`;
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
    const link = e.target.closest("#menu-main-menu a[href^='#'], #menu-main-menu-1 a[href^='#'], #menu-main-menu-2 a[href^='#'], .pinhole-sticky-bottom a[href^='#'], .pinhole-site-branding a[rel='home']");
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
    updateStickyGalleryNav(id);

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
        notifyUploadError("Valida el token de subida antes de eliminar imágenes.");
        return;
      }

      const path = deleteBtn.dataset.path || "";
      if (!path) return;

      alertify.confirm("Eliminar imagen", "Esta accion eliminara la imagen del album. ¿Continuar?", async () => {
        deleteBtn.disabled = true;
        try {
          const formData = new FormData();
          formData.append("path", path);
          const res = await fetch(API.deleteImage, { method: "POST", body: formData });
          const data = await res.json();
          if (!data.ok) {
            notifyUploadError(data.error || "No se pudo eliminar la imagen.");
            deleteBtn.disabled = false;
            return;
          }
          notifyUploadSuccess("Imagen eliminada correctamente.");
          if (currentFolder && currentTitle) fetchAndRender(currentFolder, currentTitle);
        } catch (err) {
          console.error(err);
          notifyUploadError("No se pudo eliminar la imagen. Intenta nuevamente.");
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
  const folderLevelList = document.getElementById("folder-level-list");
  const addFolderLevelButton = document.getElementById("add-folder-level");
  const folderPathPreview = document.getElementById("folder-path-preview");
  const fileInput = document.getElementById("upload-files");
  const fileDropzone = document.getElementById("upload-dropzone");
  const fileSummary = document.getElementById("upload-file-summary");
  const preview = document.getElementById("upload-preview");
  const status = document.getElementById("upload-status");
  const btnUpload = document.getElementById("btn-upload");
  const uploadProgress = document.getElementById("upload-progress");
  const uploadProgressTitle = document.getElementById("upload-progress-title");
  const uploadProgressDetail = document.getElementById("upload-progress-detail");
  const uploadProgressSteps = Array.from(document.querySelectorAll("[data-upload-step]"));

  let uploadTokenValid = false;
  let uploadAlbumOptions = [];
  let selectedUploadFiles = [];
  let uploadProgressTimer = null;
  let folderLevelInputs = [];
  let alertifyLiftObserver = null;

  function liftAlertifyNotifier() {
    const lift = () => {
      document.querySelectorAll(".ajs-notifier").forEach((notifier) => {
        const modalIsOpen = uploadModal?.classList.contains("open");
        const host = modalIsOpen ? uploadModal : document.body;
        if (notifier.parentElement !== host) host.appendChild(notifier);
        notifier.style.setProperty("position", modalIsOpen ? "absolute" : "fixed", "important");
        notifier.style.setProperty("top", modalIsOpen ? "12px" : "max(14px, env(safe-area-inset-top))", "important");
        notifier.style.setProperty("right", modalIsOpen ? "12px" : "max(14px, env(safe-area-inset-right))", "important");
        notifier.style.setProperty("bottom", "auto", "important");
        notifier.style.setProperty("left", "auto", "important");
        notifier.style.setProperty("width", modalIsOpen ? "min(390px, calc(100% - 24px))" : "min(390px, calc(100vw - 28px))", "important");
        notifier.style.setProperty("z-index", "2147483647", "important");
        notifier.style.setProperty("isolation", "isolate", "important");
      });
    };
    if (!alertifyLiftObserver && document.body) {
      alertifyLiftObserver = new MutationObserver(lift);
      alertifyLiftObserver.observe(document.body, { childList: true, subtree: true });
    }
    requestAnimationFrame(lift);
    setTimeout(lift, 80);
  }

  function notifyUploadError(message) {
    if (status) status.replaceChildren();
    alertify.error(escapeHtml(String(message || "Ocurrió un error. Intenta nuevamente.")));
    liftAlertifyNotifier();
  }

  function notifyUploadSuccess(message) {
    if (status) status.replaceChildren();
    alertify.success(escapeHtml(String(message || "Listo.")));
    liftAlertifyNotifier();
  }

  function stopUploadProgressTicker() {
    if (uploadProgressTimer !== null) clearTimeout(uploadProgressTimer);
    uploadProgressTimer = null;
  }

  function cycleUploadProgressDetails(messages, index = 0) {
    stopUploadProgressTicker();
    if (!uploadProgressDetail || !messages.length) return;

    uploadProgressDetail.textContent = messages[index];
    uploadProgressTimer = setTimeout(() => {
      cycleUploadProgressDetails(messages, (index + 1) % messages.length);
    }, 900);
  }

  function keepUploadProgressVisible(startedAt) {
    const remaining = Math.max(0, 1800 - (Date.now() - startedAt));
    return remaining ? new Promise(resolve => setTimeout(resolve, remaining)) : Promise.resolve();
  }

  function setUploadProgress(step, visible = true) {
    if (!uploadProgress) return;
    uploadProgress.hidden = !visible;
    if (!visible) {
      stopUploadProgressTicker();
      return;
    }

    const progressCopy = {
      prepare: ["Preparando tus imágenes", "Estamos organizando el destino y preparando los archivos."],
      send: ["Subiendo tus imágenes", "Enviando los archivos al servidor. Puede tardar un momento."],
      finish: ["Casi listo", "La carga terminó; estamos confirmando que todo se guardó correctamente."],
    };
    const [title, detail] = progressCopy[step] || progressCopy.prepare;
    if (uploadProgressTitle) uploadProgressTitle.textContent = title;
    if (uploadProgressDetail) uploadProgressDetail.textContent = detail;

    const steps = ["prepare", "send", "finish"];
    const activeIndex = steps.indexOf(step);
    uploadProgressSteps.forEach((item, index) => {
      item.classList.toggle("done", index < activeIndex);
      item.classList.toggle("active", index === activeIndex);
    });
  }

  function setUploadTokenState(valid) {
    uploadTokenValid = valid;
    document.body.classList.toggle("has-upload-token", valid);
  }

  async function checkUploadToken() {
    try {
      const res = await fetch(API.checkUploadToken, { cache: "no-store" });
      const data = await res.json();
      setUploadTokenState(Boolean(data.valid));
    } catch {
      setUploadTokenState(false);
    }
  }

  async function openUploadModal() {
    if (!uploadModal) return;
    uploadModal.classList.add("open");
    document.body.classList.add("upload-modal-active");
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
    document.body.classList.remove("upload-modal-active");
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
        notifyUploadError("Escribe el token de subida para continuar.");
        uploadTokenInput.focus();
        return;
      }
      uploadTokenInput.classList.remove("input-error");
      uploadTokenStatus.innerHTML = '<span class="info">Validando...</span>';
      try {
        const res = await fetch(API.uploadTokenValidate, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: "token=" + encodeURIComponent(token),
        });
        const data = await res.json();
        if (data.ok) {
          setUploadTokenState(true);
          notifyUploadSuccess("Token validado. Ya puedes seleccionar las imágenes.");
          uploadTokenStatus.innerHTML = "";
          if (uploadTokenSection) uploadTokenSection.style.display = "none";
          if (uploadFormSection) uploadFormSection.style.display = "block";
          loadFolderList();
          clearUploadForm();
        } else if (data.locked) {
          uploadTokenInput.classList.add("input-error");
          uploadTokenInput.focus();
          btnUploadToken.disabled = true;
          uploadTokenStatus.innerHTML = '<span class="error"><i class="fa fa-info-circle" aria-hidden="true"></i> Demasiados intentos. Intenta nuevamente en <b class="token-countdown"></b></span>';
          notifyUploadError("Se alcanzó el límite de intentos. Podrás probar de nuevo cuando termine el contador.");
          const countdownEl = uploadTokenStatus.querySelector(".token-countdown");
          startTokenCountdown({
            seconds: data.retryAfter,
            timerName: "uploadTokenLockTimer",
            render: (remaining) => {
              if (countdownEl) countdownEl.textContent = formatRetryAfter(remaining);
            },
            onDone: () => {
              btnUploadToken.disabled = false;
              uploadTokenInput.classList.remove("input-error");
              uploadTokenStatus.innerHTML = '<span class="info">Ya puedes intentar nuevamente</span>';
            }
          });
        } else {
          uploadTokenInput.classList.add("input-error");
          uploadTokenInput.focus();
          uploadTokenStatus.innerHTML = "";
          notifyUploadError(data.attemptsLeft !== undefined
            ? `El token no es válido. Te quedan ${data.attemptsLeft} intento(s).`
            : "El token no es válido o ya expiró.");
        }
      } catch {
        uploadTokenInput.classList.add("input-error");
        uploadTokenInput.focus();
        uploadTokenStatus.innerHTML = "";
        notifyUploadError("No se pudo validar el token. Revisa tu conexión e inténtalo de nuevo.");
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
      const res = await fetch(API.menu, { cache: "no-store" });
      const data = await res.json();
      const groups = Array.isArray(data?.groups) ? data.groups : [];
      groups.forEach(g => {
        const parentFolder = g.parentFolder || g.folder;
        if (parentFolder) {
          const opt = document.createElement("option");
          opt.value = parentFolder;
          opt.textContent = g.group;
          folderSelect.appendChild(opt);
          uploadAlbumOptions.push({
            value: parentFolder,
            label: g.group,
            meta: g.folder ? "Álbum principal" : "Álbum padre · crear subcarpeta aquí",
          });
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
    updateFolderPathPreview();

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
      updateFolderPathPreview();
    });
  });

  function clearUploadForm() {
    if (fileInput) fileInput.value = "";
    selectedUploadFiles = [];
    if (preview) preview.innerHTML = "";
    if (fileSummary) fileSummary.textContent = "Sin archivos seleccionados";
    if (status) status.innerHTML = "";
    setUploadProgress("prepare", false);
    if (newAlbumName) newAlbumName.value = "";
    folderLevelInputs = [];
    if (folderLevelList) folderLevelList.replaceChildren();
    if (addFolderLevelButton) addFolderLevelButton.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i> Añadir carpeta';
    if (folderPathPreview) {
      folderPathPreview.hidden = true;
      folderPathPreview.replaceChildren();
    }
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

  function updateFolderPathPreview() {
    if (!folderPathPreview) return;
    const base = uploadMode === "new"
      ? newAlbumName?.value.trim()
      : (folderSelect?.value ? folderTriggerValue?.textContent.trim() : "Selecciona un álbum");
    const levels = folderLevelInputs.map(input => input.value.trim()).filter(Boolean);
    const parts = [base, ...levels].filter(Boolean);
    folderPathPreview.replaceChildren();
    if (!levels.length) {
      folderPathPreview.hidden = true;
      return;
    }
    folderPathPreview.hidden = false;
    const label = document.createElement("span");
    label.className = "folder-path-caption";
    label.textContent = "Destino";
    const breadcrumb = document.createElement("strong");
    breadcrumb.textContent = parts.join("  ›  ");
    folderPathPreview.append(label, breadcrumb);
  }

  function addFolderLevel(value = "") {
    if (!folderLevelList) return;
    const row = document.createElement("div");
    row.className = "folder-level-row";

    const number = document.createElement("span");
    number.className = "folder-level-number";
    number.textContent = String(folderLevelInputs.length + 1).padStart(2, "0");
    number.setAttribute("aria-hidden", "true");

    const input = document.createElement("input");
    input.type = "text";
    input.className = "folder-level-input";
    input.placeholder = "Nombre de la carpeta";
    input.autocomplete = "off";
    input.maxLength = 80;
    input.value = value;
    input.setAttribute("aria-label", `Nombre de la carpeta, nivel ${folderLevelInputs.length + 1}`);
    input.addEventListener("input", updateFolderPathPreview);

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "folder-level-remove";
    remove.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>';
    remove.setAttribute("aria-label", "Quitar esta carpeta");
    remove.addEventListener("click", () => {
      folderLevelInputs = folderLevelInputs.filter(item => item !== input);
      row.remove();
      if (folderLevelInputs.length === 0) {
        addFolderLevelButton.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i> Añadir carpeta';
      }
      [...folderLevelList.children].forEach((item, index) => {
        const field = item.querySelector("input");
        item.querySelector(".folder-level-number").textContent = String(index + 1).padStart(2, "0");
        field.setAttribute("aria-label", `Nombre de la carpeta, nivel ${index + 1}`);
      });
      updateFolderPathPreview();
    });

    row.append(number, input, remove);
    folderLevelList.append(row);
    folderLevelInputs.push(input);
    addFolderLevelButton.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i> Añadir otro nivel';
    input.focus();
    updateFolderPathPreview();
  }

  addFolderLevelButton?.addEventListener("click", () => addFolderLevel());
  newAlbumName?.addEventListener("input", updateFolderPathPreview);
  folderTrigger?.addEventListener("click", updateFolderPathPreview);

  if (fileInput) {
    fileInput.accept = ALLOWED_UPLOAD_EXTENSIONS.map(extension => `.${extension}`).join(",");
    const isAllowedUploadFile = file => ALLOWED_UPLOAD_EXTENSIONS.includes(file.name.split(".").pop().toLowerCase());
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
      const chosenFiles = Array.from(fileInput.files || []).filter(isAllowedUploadFile);
      const rejectedCount = fileInput.files.length - chosenFiles.length;
      if (rejectedCount > 0) notifyUploadError(`${rejectedCount} archivo(s) no tienen un formato permitido.`);
      if (chosenFiles.length > MAX_UPLOAD_FILES) {
        notifyUploadError(`Puedes seleccionar hasta ${MAX_UPLOAD_FILES} imágenes por carga.`);
      }
      syncUploadFileInput(chosenFiles.slice(0, MAX_UPLOAD_FILES));
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
        const files = Array.from(e.dataTransfer?.files || []).filter(isAllowedUploadFile);
        if (!files.length) return;
        if (files.length > MAX_UPLOAD_FILES) {
          notifyUploadError(`Puedes seleccionar hasta ${MAX_UPLOAD_FILES} imágenes por carga.`);
        }
        syncUploadFileInput(files.slice(0, MAX_UPLOAD_FILES));
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

      // Construye una ruta con tantos niveles como haya indicado el usuario.
      let targetFolder = "";
      const customPath = folderLevelInputs.map(input => normalizeFolderSegment(input.value)).filter(Boolean).join("/");
      const missingFiles = files.length === 0;
      let missingDestination = false;

      if (uploadMode === "new") {
        const newAlbum = newAlbumName.value.trim();
        if (!newAlbum) {
          missingDestination = true;
          setUploadInvalid(newAlbumName, true);
        } else {
          targetFolder = normalizeFolderSegment(newAlbum);
        }
        if (customPath) targetFolder += "/" + customPath;
      } else {
        const selectedFolder = folderSelect.value;
        if (!selectedFolder) {
          missingDestination = true;
          setUploadInvalid(folderTrigger, true);
        } else {
          targetFolder = selectedFolder;
        }
        if (customPath) targetFolder += "/" + customPath;
      }

      if (missingFiles) setUploadInvalid(fileDropzone, true);
      if (missingFiles || missingDestination) {
        const message = missingDestination && missingFiles
          ? "Selecciona un álbum y añade al menos una imagen para continuar."
          : missingDestination
            ? "Selecciona o crea un álbum de destino para tus imágenes."
            : "Añade al menos una imagen antes de iniciar la subida.";
        notifyUploadError(message);
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
        const progressStartedAt = Date.now();
        setUploadProgress("prepare");
        cycleUploadProgressDetails([
          "Verificando el álbum de destino…",
          "Preparando tus imágenes para la transferencia…",
          "Organizando la carga…",
        ]);
        btnUpload.disabled = true;
        btnUpload.setAttribute("aria-busy", "true");

        if (uploadMode === "new" || customPath) {
          try {
            const formData = new FormData();
            const separator = targetFolder.lastIndexOf("/");
            formData.append("parent", separator >= 0 ? targetFolder.slice(0, separator) : "");
            formData.append("name", separator >= 0 ? targetFolder.slice(separator + 1) : targetFolder);
            const res = await fetch(API.createFolder, { method: "POST", body: formData });
            const data = await res.json();
            if (!data.ok) {
              notifyUploadError(`No se pudo crear la carpeta: ${data.error || "verifica el nombre e inténtalo nuevamente."}`);
              await keepUploadProgressVisible(progressStartedAt);
              setUploadProgress("prepare", false);
              btnUpload.disabled = false;
              btnUpload.removeAttribute("aria-busy");
              return;
            }
          } catch {
            notifyUploadError("No se pudo crear la carpeta por un problema de conexión. Tus imágenes todavía no se han subido.");
            await keepUploadProgressVisible(progressStartedAt);
            setUploadProgress("prepare", false);
            btnUpload.disabled = false;
            btnUpload.removeAttribute("aria-busy");
            return;
          }
        }

        // === Subir archivos ===
        setUploadProgress("send");
        cycleUploadProgressDetails([
          "Enviando imágenes al servidor…",
          "Transfiriendo tus archivos de forma segura…",
          "Esperando respuesta del servidor…",
        ]);

        try {
          const formData = new FormData();
          formData.append("folder", targetFolder);
          for (const f of files) {
            formData.append("files[]", f);
          }

          const res = await fetch(API.upload, { method: "POST", body: formData });
          stopUploadProgressTicker();
          setUploadProgress("finish");
          const data = await res.json();
          await keepUploadProgressVisible(progressStartedAt);

          if (data.ok) {
            setUploadProgress("finish", false);
            clearUploadForm();
            notifyUploadSuccess(`${data.uploaded} imagen(es) se subieron correctamente.`);
            if (data.errors?.length) {
              notifyUploadError(data.errors.join(". "));
            }
            loadDynamicMenus();
            if (currentFolder && currentTitle) {
              fetchAndRender(currentFolder, currentTitle);
            }
          } else {
            setUploadProgress("finish", false);
            notifyUploadError([data.error || "No se pudieron subir las imágenes.", ...(data.errors || [])].join(" "));
          }
        } catch (e) {
          stopUploadProgressTicker();
          await keepUploadProgressVisible(progressStartedAt);
          setUploadProgress("finish", false);
          notifyUploadError("No se pudo completar la subida. Comprueba tu conexión e inténtalo otra vez.");
          console.error(e);
        } finally {
          setUploadProgress("finish", false);
          btnUpload.disabled = false;
          btnUpload.removeAttribute("aria-busy");
          btnUpload.innerHTML = '<i class="fa fa-upload"></i> Subir';
        }
      }

    });
  }

  checkUploadToken();

});
