document.addEventListener("DOMContentLoaded", () => {

    let currentData = [];
    let currentFolder = "";
    let renderIndex = 0;
    const CHUNK = 10;
    let msnry = null;

    const galleryContainer = document.querySelector(".pinhole-gallery");
    const titleEl = document.querySelector(".entry-title");
    const metaEl = document.querySelector(".entry-meta");

    const THUMB_WIDTH = 378;

    // -------------------------
    //   CONVERTIR ID A CARPETA
    // -------------------------
    function fallbackIdToFolder(id) {
        const m = id.match(/^([a-zA-Z]+)(\d+)(.*)$/);
        if (m) return `${m[1]}/${m[2]}${m[3] || ""}`;
        return id.replace(/_/g, "/");
    }

    // -------------------------
    //   CREAR ITEM HTML
    // -------------------------
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

    // -------------------------
    //   FETCH Y RENDER
    // -------------------------
    async function fetchAndRender(folder, titleText = null) {
        try {
            const res = await fetch(`php/list.php?folder=${encodeURIComponent(folder)}`);
            if (!res.ok) throw new Error("HTTP " + res.status);
            const data = await res.json();

            currentData = data;
            currentFolder = folder;
            renderIndex = 0;

            // Reset
            galleryContainer.innerHTML = "";
            if (msnry) {
                msnry.destroy();
                msnry = null;
            }

            if (data.length === 0) {
                galleryContainer.innerHTML = `
                    <div style="padding:40px 0; text-align:center; opacity:.6;">
                        No hay fotos en esta galería.
                    </div>`;
                metaEl.textContent = "0 Photos";
                return;
            }

            renderMore();

            const btn = document.getElementById("loadMoreBtn");
            btn.style.display = data.length > CHUNK ? "block" : "none";

            titleEl.textContent = titleText || folder;
            metaEl.textContent = `${data.length} Photos`;

        } catch (e) {
            console.error(e);
        }
    }

    // -------------------------
    //   RENDER PROGRESIVO
    // -------------------------
    function renderMore() {
        const slice = currentData.slice(renderIndex, renderIndex + CHUNK);

        slice.forEach(item => {
            galleryContainer.appendChild(buildPinholeItem(currentFolder, item));
        });

        renderIndex += CHUNK;

        // Detectar nuevos nodos para Masonry
        const newElems = Array.from(galleryContainer.querySelectorAll(".pinhole-item"))
                              .slice(-slice.length);

        // Esperar imágenes reales
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
            document.getElementById("loadMoreBtn").style.display = "none";
        }
    }

    // -------------------------
    //   RECONNECT PHOTOSWIPE
    // -------------------------
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

                pswp.listen("afterInit", () => {
                    document.querySelector(".pswp__button--zoom").style.display = "block";
                    document.querySelector(".pswp__button--fs").style.display = "block";
                    document.querySelector(".pswp__button--share").style.display = "block";
                });

                pswp.init();
            });
        });
    }

    // -------------------------
    //   EVENTOS
    // -------------------------
    document.querySelector("#loadMoreBtn").onclick = renderMore;

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

    // Default
    if (!location.hash) {
        location.hash = "#emma5th";
        fetchAndRender("emma5th", "HB 5TH");
    }

});
