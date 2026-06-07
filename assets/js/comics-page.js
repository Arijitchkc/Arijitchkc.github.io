(function () {
  const PROXY = (url) => `https://corsproxy.io/?url=${encodeURIComponent(url)}`;
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const MAX_RATIO = 2.5; // skip comics taller than 2.5x their width

  async function imageRatio(src) {
    return new Promise((resolve) => {
      const t = new Image();
      t.onload = () => resolve(t.naturalHeight / t.naturalWidth);
      t.onerror = () => resolve(1);
      t.src = src;
    });
  }

  /* ── xkcd ─────────────────────────────────────────── */
  const xkcdImg  = document.getElementById("xkcd-img");
  const xkcdLink = document.getElementById("xkcd-link");
  const xkcdTitle = document.getElementById("xkcd-title");
  const xkcdAlt  = document.getElementById("xkcd-alt");
  const xkcdDate = document.getElementById("xkcd-date");
  const xkcdNum  = document.getElementById("xkcd-num");

  const favorites = [
    254, 256, 618, 723, 735, 913, 1052, 1079, 1082, 1093, 1159, 1194, 1256,
    1294, 1388, 1405, 1449, 1472, 1608, 1611, 1714, 1732, 1752, 1829, 1874,
    1895, 1904, 1920, 1991, 2004, 2013, 2058, 2179, 2187, 2219, 2230, 2242,
    2251, 2261, 2307, 2308, 2325, 2344, 2362, 2411, 2412, 2466, 2501, 2616,
    2695, 2752, 2754, 2760, 2765, 2803
  ];

  let lastXkcdId = null;

  function renderXkcd(data) {
    xkcdImg.src = data.img;
    xkcdImg.alt = data.safe_title;
    if (xkcdLink) xkcdLink.href = `https://xkcd.com/${data.num}`;
    if (xkcdTitle) xkcdTitle.textContent = data.safe_title;
    if (xkcdAlt) xkcdAlt.textContent = `"${data.alt}"`;
    if (xkcdDate) xkcdDate.textContent = ` · ${parseInt(data.day)} ${MONTHS[parseInt(data.month) - 1]} ${data.year}`;
    if (xkcdNum) { xkcdNum.href = `https://xkcd.com/${data.num}`; xkcdNum.textContent = `#${data.num}`; }
  }

  async function loadXkcd(retries = 0) {
    let id;
    do { id = favorites[Math.floor(Math.random() * favorites.length)]; }
    while (id === lastXkcdId && favorites.length > 1);

    try {
      const res = await fetch(PROXY(`https://xkcd.com/${id}/info.0.json`));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const ratio = await imageRatio(data.img);
      if (ratio > MAX_RATIO && retries < 5) return loadXkcd(retries + 1);
      lastXkcdId = id;
      renderXkcd(data);
    } catch (e) {
      console.error("xkcd failed:", e);
    }
  }

  if (xkcdImg) {
    xkcdImg.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      xkcdImg.style.opacity = "0.4";
      await loadXkcd();
      xkcdImg.style.opacity = "1";
    });
    xkcdImg.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); xkcdImg.click(); }
    });
  }

  /* ── PhD Comics ───────────────────────────────────── */
  const phdImg   = document.getElementById("phd-img");
  const phdLink  = document.getElementById("phd-link");
  const phdTitle = document.getElementById("phd-title");
  const phdDate  = document.getElementById("phd-date");

  // Real strip images: phd<digits>[s].(gif|jpg|png) — book promos use different filenames
  const PHD_STRIP_RE = /\/phd\d{3,6}s?\.(gif|jpg|png)/i;

  let phdMaxId = 2050;
  let lastPhdId = -1;

  async function initPhd() {
    // Get the latest comic ID from the feed so we know the archive size
    try {
      const res = await fetch(PROXY("https://phdcomics.com/gradfeed.php"));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const ids = [...text.matchAll(/[?&]f=(\d+)/g)].map(m => +m[1]);
      if (ids.length) phdMaxId = Math.max(...ids);
    } catch (e) {
      console.warn("PhD feed init failed, using fallback max id:", e);
    }
    loadPhdComic();
  }

  async function loadPhdComic(retries = 0) {
    if (!phdImg || retries > 8) return;

    let id;
    do { id = Math.floor(Math.random() * phdMaxId) + 1; }
    while (id === lastPhdId);
    lastPhdId = id;

    const comicUrl = `https://www.phdcomics.com/comics/archive.php?comicid=${id}`;
    phdImg.style.opacity = "0.4";

    try {
      const res = await fetch(PROXY(comicUrl));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();

      // Use regex on raw HTML — DOMParser doesn't resolve URLs through the proxy
      const imgMatch = html.match(/src=["']((?:https?:)?\/\/[^"']*\/comics\/archive\/phd[^"']*\.(?:gif|jpg|png))["']/i);
      if (!imgMatch || !PHD_STRIP_RE.test(imgMatch[1])) {
        return loadPhdComic(retries + 1);
      }

      let imgSrc = imgMatch[1];
      if (imgSrc.startsWith("//")) imgSrc = "http:" + imgSrc;

      const titleMatch = html.match(/<title[^>]*>PHD Comics?:\s*([^<]+)<\/title>/i);
      const title = titleMatch ? titleMatch[1].trim() : `Comic #${id}`;

      phdImg.src = imgSrc;
      phdImg.alt = title;
      if (phdLink) phdLink.href = comicUrl;
      if (phdTitle) phdTitle.textContent = title;
      if (phdDate) phdDate.textContent = `#${id}`;
      phdImg.onload = () => { phdImg.style.opacity = "1"; };
      phdImg.onerror = () => { phdImg.style.opacity = "1"; };
    } catch (e) {
      console.error(`PhD comic #${id} failed:`, e);
      loadPhdComic(retries + 1);
    }
  }

  if (phdImg) {
    phdImg.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();
      loadPhdComic();
    });
    phdImg.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); phdImg.click(); }
    });
    initPhd();
  }
})();
