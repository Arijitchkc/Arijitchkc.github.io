---
title: Comics
icon: fas fa-newspaper
order: 4
---

<div class="row g-5 mt-1">

  <!-- xkcd -->
  <div class="col-md-6">
    <h5 class="text-center mb-3">xkcd</h5>
    <div class="text-center">
      <a id="xkcd-link" href="https://xkcd.com" target="_blank" rel="noopener">
        <img id="xkcd-img" class="img-fluid rounded no-zoom"
             src="https://imgs.xkcd.com/comics/random_number.png"
             alt="xkcd comic" tabindex="0"
             style="max-width:100%; max-height:480px; object-fit:contain; cursor:pointer; transition: opacity 0.2s;">
      </a>
      <div class="mt-2">
        <p class="mb-0 fw-semibold"><small id="xkcd-title"></small></p>
        <p class="text-muted mb-1"><small>
          <a id="xkcd-num" href="https://xkcd.com" target="_blank" rel="noopener" class="text-muted"></a>
          <span id="xkcd-date"></span>
        </small></p>
        <p id="xkcd-alt" class="fst-italic text-muted"><small></small></p>
        <p class="text-muted"><small>Click to load another.</small></p>
      </div>
    </div>
  </div>

  <!-- PhD Comics -->
  <div class="col-md-6">
    <h5 class="text-center mb-3">PhD Comics</h5>
    <div class="text-center">
      <a id="phd-link" href="https://phdcomics.com" target="_blank" rel="noopener">
        <img id="phd-img" class="img-fluid rounded no-zoom"
             src="https://phdcomics.com/comics/archive/phd011525s.gif"
             alt="PhD comic" tabindex="0"
             style="max-width:100%; max-height:480px; object-fit:contain; cursor:pointer; transition: opacity 0.2s;">
      </a>
      <div class="mt-2">
        <p class="mb-0 fw-semibold"><small id="phd-title"></small></p>
        <p class="text-muted mb-1"><small id="phd-date"></small></p>
        <p class="text-muted"><small>Click to load another.</small></p>
      </div>
    </div>
  </div>

</div>

<script src="{{ '/assets/js/comics-page.js' | relative_url }}"></script>
