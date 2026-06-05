(function () {
  const comic = document.getElementById("xkcd-comic");
  const altEl = document.getElementById("xkcd-alt");
  if (!comic) return;

  const favorites = [
    723, 913, 1052, 1082, 1194, 1388, 1449, 1611, 1829, 1874, 1904, 1991,
    2013, 2058, 2179, 2187, 2219, 2242, 2251, 2307, 2308, 2325, 2344, 2411,
    2412, 2466, 2501, 2616, 2752, 2760, 2803, 254, 256, 618, 735, 1079, 1093,
    1159, 1256, 1294, 1405, 1472, 1608, 1714, 1732, 1752, 1895, 1920, 2004,
    2230, 2261, 2362, 2695, 2754, 2765
  ];

  let lastId = null;

  async function loadRandomComic() {
    let id;
    do { id = favorites[Math.floor(Math.random() * favorites.length)]; }
    while (id === lastId && favorites.length > 1);
    lastId = id;

    comic.style.opacity = "0.4";
    const proxies = [
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://xkcd.com/${id}/info.0.json`)}`,
      `https://corsproxy.io/?url=${encodeURIComponent(`https://xkcd.com/${id}/info.0.json`)}`,
    ];
    let data = null;
    for (const url of proxies) {
      try { const r = await fetch(url); if (r.ok) { data = await r.json(); break; } } catch (_) {}
    }
    try {
      if (!data) throw new Error("all proxies failed");
      comic.src = data.img;
      comic.alt = data.safe_title;
      if (altEl) altEl.textContent = `"${data.alt}"`;
    } catch (e) {
      console.error("xkcd load failed:", e);
    } finally {
      comic.style.opacity = "1";
    }
  }

  comic.style.transition = "opacity 0.2s";
  comic.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopImmediatePropagation();
    loadRandomComic();
  });
  comic.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); loadRandomComic(); }
  });

  loadRandomComic();
})();
