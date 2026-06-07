---
layout: page
title: Home
permalink: /
---

# Hey there!

I'm a PhD student in the Department of Earth Sciences at Durham University, UK.

My interests span continental dynamics, thermochemical evolution of the mantle, mantle melting, and seismic imaging.

Mantle melting is a key control on crustal composition, lithospheric stability, and critical mineral formation, yet integrating the complex phase equilibria that govern it into large-scale geodynamic simulations remains a significant computational challenge. My research investigates strategies for coupling mantle convection codes like ASPECT with thermodynamic tools like MAGEMin, and develops surrogate models using machine learning to make these calculations tractable at geodynamic scales.

Prior to Durham, I worked on the structure and evolution of the Indian lithosphere at IISER Kolkata, studying seismic velocity, radial anisotropy, and thermal structure with a focus on deformation signatures in the India-Asia collision zone.

Finally, this website results from a lot of hard work. 99% procrastination and 1% actual work. On a different note, I spend a pretty mundane routine daily: eat, sleep, code, sleep. The purpose of my codes is mostly to make the Earth's interior a little less mysterious, one simulation at a time.

<hr class="home-demos-rule">

## Visualization

<div class="home-demos">
  <a class="nn-home-teaser" href="{{ '/neural-network-demo/' | relative_url }}" aria-label="Open the interactive neural network demo">
    <span class="nn-home-teaser__title">Neural Network</span>
    <svg class="nn-home-teaser__network" viewBox="0 0 260 120" role="img" aria-labelledby="nn-home-title">
      <title id="nn-home-title">Animated neural network preview</title>
      <g class="nn-teaser-lines" fill="none" stroke-linecap="round">
        <path class="nn-teaser-line nn-teaser-line--one" d="M36 28 L126 24 L224 42" />
        <path class="nn-teaser-line nn-teaser-line--two" d="M36 60 L126 60 L224 78" />
        <path class="nn-teaser-line nn-teaser-line--three" d="M36 92 L126 96 L224 42" />
        <path class="nn-teaser-line nn-teaser-line--four" d="M36 28 L126 60 L224 78" />
        <path class="nn-teaser-line nn-teaser-line--five" d="M36 92 L126 24 L224 78" />
      </g>
      <g class="nn-teaser-nodes">
        <circle class="nn-teaser-node nn-teaser-node--input" cx="36" cy="28" r="8" />
        <circle class="nn-teaser-node nn-teaser-node--input" cx="36" cy="60" r="8" />
        <circle class="nn-teaser-node nn-teaser-node--input" cx="36" cy="92" r="8" />
        <circle class="nn-teaser-node nn-teaser-node--hidden" cx="126" cy="24" r="9" />
        <circle class="nn-teaser-node nn-teaser-node--hidden" cx="126" cy="60" r="9" />
        <circle class="nn-teaser-node nn-teaser-node--hidden" cx="126" cy="96" r="9" />
        <circle class="nn-teaser-node nn-teaser-node--output" cx="224" cy="42" r="10" />
        <circle class="nn-teaser-node nn-teaser-node--output" cx="224" cy="78" r="10" />
      </g>
    </svg>
    <span class="nn-home-teaser__action">Open demo <i class="fa-solid fa-arrow-right ms-1"></i></span>
  </a>
</div>
