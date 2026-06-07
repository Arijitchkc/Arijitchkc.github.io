---
layout: page
title: Neural Network visualization
permalink: /neural-network-demo/
---

<!-- # Neural Network Demo -->

This is an interactive dashboard which shows a multi-task neural network. This network is currently a toy network, with gibberish values, which will be replaced with a real calibrated network.


<section class="nn-demo" data-network-demo>
  <div class="nn-demo__header">
    <div>
      <p class="nn-demo__eyebrow">Neural Network</p>
      <h2>Demonstration</h2>
    </div>
    <button class="btn btn-sm btn-outline-secondary nn-demo__run" type="button" data-nn-run>
      <i class="fa-solid fa-play me-1"></i> Play
    </button>
  </div>

  <div class="nn-demo__grid">
    <aside class="nn-demo__panel nn-demo__controls" aria-label="Neural network inputs">
      <h3>Inputs</h3>

      <label class="nn-control">
        <span>Signal A</span>
        <input type="range" min="0" max="1" step="0.01" value="0.68" data-nn-input="0">
        <output data-nn-input-value="0">0.68</output>
      </label>

      <label class="nn-control">
        <span>Signal B</span>
        <input type="range" min="0" max="1" step="0.01" value="0.42" data-nn-input="1">
        <output data-nn-input-value="1">0.42</output>
      </label>

      <label class="nn-control">
        <span>Signal C</span>
        <input type="range" min="0" max="1" step="0.01" value="0.81" data-nn-input="2">
        <output data-nn-input-value="2">0.81</output>
      </label>

      <label class="nn-select">
        <span>Task</span>
        <select data-nn-task>
          <option value="melt">Option 1</option>
          <option value="stable">Option 2</option>
          <option value="mixed">Option 3</option>
        </select>
      </label>
    </aside>

    <div class="nn-demo__visual-wrap">
      <svg class="nn-demo__visual" viewBox="0 0 900 500" role="img" aria-labelledby="nn-demo-title nn-demo-desc" data-nn-svg>
        <title id="nn-demo-title">Interactive neural network visualization</title>
        <desc id="nn-demo-desc">Input neurons feed a shared encoder, a latent representation, and compact task-specific output heads.</desc>
        <g class="nn-demo__connections" data-nn-connections></g>
        <g class="nn-demo__task-blocks" data-nn-task-blocks></g>
        <g class="nn-demo__nodes" data-nn-nodes></g>
        <g class="nn-demo__labels">
          <text x="72" y="38">Inputs</text>
          <text x="280" y="38">Encoder</text>
          <text x="500" y="38">Latent</text>
          <text x="716" y="38">Task heads</text>
        </g>
      </svg>

      <div class="nn-head-popup" data-nn-head-popup aria-hidden="true">
        <button class="nn-head-popup__backdrop" type="button" aria-label="Close task head view" data-nn-popup-close></button>
        <div class="nn-head-popup__panel" role="dialog" aria-modal="true" aria-labelledby="nn-head-popup-title">
          <div class="nn-head-popup__header">
            <div>
              <p class="nn-head-popup__eyebrow" data-nn-popup-status>Latent head inspection</p>
              <h3 id="nn-head-popup-title" data-nn-popup-title>Task head</h3>
            </div>
            <button class="nn-head-popup__close" type="button" aria-label="Close task head view" data-nn-popup-close>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="nn-head-popup__output">
            <span>Current output</span>
            <strong data-nn-popup-output>0.00</strong>
          </div>
          <svg class="nn-head-popup__visual" viewBox="0 0 760 230" role="img" aria-label="Selected task head network" data-nn-popup-svg></svg>
        </div>
      </div>
    </div>

    <aside class="nn-demo__panel nn-demo__outputs" aria-label="Neural network outputs">
      <h3>Outputs</h3>
      <div class="nn-output nn-output--task" data-nn-output-card="thermal">
        <span>Physical parameters</span>
        <strong data-nn-head-output="thermal">0.00</strong>
      </div>
      <div class="nn-output nn-output--task" data-nn-output-card="mechanical">
        <span>Mineral assemblage</span>
        <strong data-nn-head-output="mechanical">0.00</strong>
      </div>
      <div class="nn-output nn-output--task" data-nn-output-card="composition">
        <span>Composition</span>
        <strong data-nn-head-output="composition">0.00</strong>
      </div>
    </aside>
  </div>
</section>

<script src="{{ '/assets/js/neural-network-demo.js' | relative_url }}"></script>
