document.addEventListener("DOMContentLoaded", () => {

  const galleryContainer = document.querySelector(".pinhole-gallery");
  const titleEl = document.querySelector(".entry-title");
  const metaEl = document.querySelector(".entry-meta");
  const folderMap = {};

  const THUMB_WIDTH = 378;

  function fallbackIdToFolder(id) {
    const m = id.match(/^([a-zA-Z]+)(\d+)(.*)$/);
    if (m) {
      const name = m[1];
      const num = m[2];
      const suf = m[3] || "";
      return `${name}/${num}${suf}`;
    }
    return id.replace(/_/g, "/");
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
    wrap.className = "pinhole-item col-xs-12 col-lg-4 col-md-4 col-sm-6";

    const a = document.createElement("a");
    a.className = "item-link";
    a.href = url;
    a.dataset.size = JSON.stringify({ width: realW, height: realH });

    const img = document.createElement("img");
    img.src = url;
    img.width = THUMB_WIDTH;
    img.height = thumbH;
    img.loading = "lazy";

    a.appendChild(img);
    wrap.appendChild(a);

    return wrap;
  }

  async function fetchAndRender(folder, titleText = null) {
    try {
      const res = await fetch(`php/list.php?folder=${encodeURIComponent(folder)}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (!Array.isArray(data)) throw new Error("Respuesta inesperada");

      galleryContainer.innerHTML = "";
      galleryContainer.classList.remove("items-hidden");

      if (data.length === 0) {
        galleryContainer.removeAttribute("style");   // Quita height, position, etc.
        galleryContainer.classList.remove("masonry-initialized"); 
        galleryContainer.innerHTML = `
            <div style="width:100%; padding:40px 0; text-align:center; opacity:0.6;">
                No hay fotos en esta galería.
            </div>
        `;

        titleEl.textContent = titleText || folder.replace("/", " ");
        metaEl.textContent = `0 Photos`;

        return;
      }

      data.forEach(item => {
        const node = buildPinholeItem(folder, item);
        galleryContainer.appendChild(node);
      });

      const imgs = galleryContainer.querySelectorAll("img");
      let loaded = 0;

        imgs.forEach(img => {
            img.onload = () => {
                loaded++;
                if (loaded === imgs.length) {
                    new Masonry(galleryContainer, {
                        itemSelector: '.pinhole-item',
                        columnWidth: '.pinhole-item',
                        percentPosition: true
                    });
                }
            };
        });

      const links = galleryContainer.querySelectorAll(".pinhole-item a");

      links.forEach(link => {
        link.onclick = function (e) {
          e.preventDefault();

          const all = Array.from(galleryContainer.querySelectorAll(".pinhole-item a"));
          const index = all.indexOf(link);

          const items = all.map(a => {
            const size = JSON.parse(a.dataset.size);
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
                    shareEl: true, // activar boton share
                }
          );

          pswp.listen('beforeChange', function () {
                const btn = document.querySelector('.pswp__button--download');
                if (btn) {
                    const item = pswp.currItem;
                    btn.href = item.src;
                    btn.setAttribute('download', item.src.split('/').pop());
                }
          });

          pswp.listen('afterInit', function () {
                document.querySelector('.pswp__button--zoom').style.display = 'block';
                document.querySelector('.pswp__button--fs').style.display = 'block';
                document.querySelector('.pswp__button--share').style.display = 'block';
          });

          pswp.init();

        };
      });

      titleEl.textContent = titleText || folder.replace("/", " ");
      metaEl.textContent = `${data.length} Photos`;

    } catch (err) {
      console.error("Error cargando carpeta", folder, err);
    }
  }

  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.replace(/^#/, "");
      const folder = folderMap[id] || fallbackIdToFolder(id);
      const titleText = link.textContent.trim() || null;

      fetchAndRender(folder, titleText);

      e.preventDefault();
      history.replaceState(null, "", `#${id}`);
    });
  });

  const initialFolder = document.querySelector(".gallery")?.dataset?.folder;
  if (initialFolder) fetchAndRender(initialFolder, null);

  if (!location.hash) {
      location.hash = "#emma5th";
      const folder = fallbackIdToFolder("emma5th");
      fetchAndRender(folder, "HB 5TH");
  }

});
