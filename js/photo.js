document.addEventListener("DOMContentLoaded", () => {

    let currentData = [];
    let currentFolder = "";
    let renderIndex = 0;
    const CHUNK = 10;
    let msnry = null;

    // ✔ CORREGIDO: loader por clase
    let loader = document.querySelector(".infiniteLoader");

    let infinityObserver = null;

    const galleryContainer = document.querySelector(".pinhole-gallery");
    const titleEl = document.querySelector(".entry-title");
    const metaEl = document.querySelector(".entry-meta");

    const THUMB_WIDTH = 378;

    function fallbackIdToFolder(id) {
        const m = id.match(/^([a-zA-Z]+)(\d+)(.*)$/);
        if (m) return `${m[1]}/${m[2]}${m[3] || ""}`;
        return id.replace(/_/g, "/");
    }

    function getParentFromMenu(id) {
        const selector = `a[href="#${id}"]`;
        const child = document.querySelector(selector);
        if (!child) return null;

        const parentUl = child.closest("ul.sub-menu");
        if (!parentUl) return null;

        const parentLi = parentUl.closest("li.menu-item-has-children");
        if (!parentLi) return null;

        const parentLink = parentLi.querySelector("a");
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
                <img src="${url}" width="${THUMB_WIDTH}" height="${thumbH}" loading="lazy">
            </a>
        `;

        return wrap;
    }

    async function fetchAndRender(folder, titleText = null) {
        try {
            const res = await fetch(`php/list.php?folder=${encodeURIComponent(folder)}`);
            if (!res.ok) throw new Error("HTTP " + res.status);

            const data = await res.json();

            if (!Array.isArray(data)) {
                showEmptyGallery(folder, titleText);
                return;
            }

            currentData = data;
            currentFolder = folder;
            renderIndex = 0;

            galleryContainer.innerHTML = "";

            if (msnry) { msnry.destroy(); msnry = null; }
            if (infinityObserver) { infinityObserver.disconnect(); infinityObserver = null; }

            loader.style.display = "none";

            if (data.length === 0) {
                showEmptyGallery(folder, titleText);
                return;
            }

            renderMore();

            if (data.length > CHUNK) {
                loader.style.display = "block";

                infinityObserver = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                        loader.style.display = "block";
                        setTimeout(() => renderMore(), 250);
                    }
                }, { rootMargin: "200px" });

                infinityObserver.observe(loader);
            }

            const id = folder.replace("/", "");
            const parent = getParentFromMenu(id);

            if (parent) {
                titleEl.textContent = `${parent} – ${titleText}`;
            } else {
                titleEl.textContent = titleText;
            }

            metaEl.textContent = `${data.length} Photos`;

        } catch (e) {
            console.error(e);
        }
    }

    function showEmptyGallery(folder, titleText) {
        const id = folder.replace("/", "");
        const parent = getParentFromMenu(id);

        if (parent) {
            titleEl.textContent = `${parent}`;
        } else {
            titleEl.textContent = titleText || "Galería vacía";
        }

        metaEl.textContent = "0 Photos";

        if (msnry) {
            msnry.destroy();
            msnry = null;
        }

        galleryContainer.style.height = "auto";
        galleryContainer.style.minHeight = "0"; 
        galleryContainer.style.paddingBottom = "40px"; 

        galleryContainer.innerHTML = `
            <div style="padding:40px 0; text-align:center; opacity:.6;">
                No hay fotos en esta galería.
            </div>
        `;

        loader.style.display = "none";

        if (infinityObserver) {
            infinityObserver.disconnect();
            infinityObserver = null;
        }
    }

    function renderMore() {
        const slice = currentData.slice(renderIndex, renderIndex + CHUNK);
        const newElems = [];

        slice.forEach(item => {
            const elem = buildPinholeItem(currentFolder, item);
            galleryContainer.appendChild(elem);
            newElems.push(elem);
        });

        renderIndex += CHUNK;

        imagesLoaded(newElems, () => {
            if (!msnry) {
                msnry = new Masonry(galleryContainer, {
                    itemSelector: ".pinhole-item",
                    percentPosition: true
                });
            } else {
                msnry.appended(newElems);
            }
            msnry.layout();
        });

        reconnectPhotoSwipe(newElems);

        if (renderIndex >= currentData.length) {
            loader.style.display = "none";

            if (infinityObserver) {
                infinityObserver.disconnect();
                infinityObserver = null;
            }
        }
    }

    function reconnectPhotoSwipe(newElems) {
        const links = newElems.map(el => el.querySelector("a.item-link"));

        links.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();

                const allLinks = Array.from(galleryContainer.querySelectorAll(".item-link"));
                const index = allLinks.indexOf(link);

                const items = allLinks.map(a => {
                    const size = JSON.parse(a.dataset.size);
                    return { src: a.href, w: size.width, h: size.height };
                });

                const pswp = new PhotoSwipe(
                    document.querySelector(".pswp"),
                    PhotoSwipeUI_Default,
                    items,
                    { index, history: false, shareEl: true }
                );

                pswp.listen("beforeChange", () => {
                    const btn = document.querySelector(".pswp__button--download");
                    btn.href = pswp.currItem.src;
                    btn.download = pswp.currItem.src.split("/").pop();
                });

                pswp.init();
            });
        });
    }

    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", e => {
            const id = link.getAttribute("href").replace("#", "");
            if (!id) return;

            const folder = fallbackIdToFolder(id);
            fetchAndRender(folder, link.textContent.trim());

            e.preventDefault();
            history.replaceState(null, "", "#" + id);
        });
    });

    let id = location.hash.replace("#", "");

    if (!id || id === "/" || id === "home" || id === "viewall") {
        id = "emma5th";
        history.replaceState(null, "", "#emma5th");
    }

    const link = document.querySelector(`a[href="#${id}"]`);
    const titleText = link ? link.textContent.trim() : id.replace(/\d+/g, match => " " + match + " ").trim();

    fetchAndRender(fallbackIdToFolder(id), titleText);

});