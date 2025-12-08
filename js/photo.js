document.addEventListener("DOMContentLoaded", () => {

    let currentData = [];
    let currentFolder = "";
    let renderIndex = 0;
    const CHUNK = 10;
    let msnry = null;

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
        // Busca en todo el menú responsive y principal
        const selector = `a[href="#${id}"]`;
        const child = document.querySelector(selector);
        if (!child) return null;

        // El padre es el UL anterior dentro del menú
        const parentUl = child.closest("ul.sub-menu");
        if (!parentUl) return null;

        // Primer <li> antes del ul.sub-menu es el padre
        const parentLi = parentUl.closest("li.menu-item-has-children");
        if (!parentLi) return null;

        // Texto del padre (Emma, Alaia, etc.)
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

            currentData = data;
            currentFolder = folder;
            renderIndex = 0;

            galleryContainer.innerHTML = "";

            if (msnry) {
                msnry.destroy();
                msnry = null;
            }

            if (infinityObserver) {
                infinityObserver.disconnect();
                infinityObserver = null;
            }

            loader.style.display = "none";

            if (data.length === 0) {
                galleryContainer.innerHTML = `
                    <div style="padding:40px; text-align:center; opacity:.6;">
                        No hay fotos en esta galería.
                    </div>`;
                metaEl.textContent = "0 Photos";
                return;
            }

            renderMore(); // primeras 10

            // SOLO si hay más fotos activamos scroll infinito
            if (data.length > CHUNK) {
                loader.style.display = "block";

                infinityObserver = new IntersectionObserver((entries) => {
                    if (!entries[0].isIntersecting) return;

                    loader.style.display = "block";

                    setTimeout(() => renderMore(), 300);
                }, { rootMargin: "200px" });

                infinityObserver.observe(loader);
            }

            const id = folder.replace("/", ""); // ej: emma5th
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

        // NO MÁS FOTOS → apagar loader y observer
        if (renderIndex >= currentData.length) {

            loader.style.display = "none";

            if (infinityObserver) {
                infinityObserver.disconnect();
                infinityObserver = null;
            }

            return;
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

    // MENÚ
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

    // DEFAULT LOAD
    if (!location.hash) {
        location.hash = "#emma5th";
        fetchAndRender("emma5th", "HB 5TH");
    }

});