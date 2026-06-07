(function () {
  const root = document.querySelector("[data-network-demo]");
  if (!root) return;

  const encoderLayers = [
    {
      key: "encoder1",
      scale: 2.1,
      biases: {
        melt: [-0.55, 0.35, -0.25, -0.5, 0.15, -0.35],
        stable: [-0.75, 0.55, -0.45, -0.25, -0.05, -0.55],
        mixed: [-0.4, 0.25, -0.85, 0.15, -0.35, 0.45]
      },
      weights: [
        [1.45, -1.1, 0.85],
        [-1.35, 1.25, -0.9],
        [0.8, 0.65, -1.55],
        [-0.95, 0.45, 1.45],
        [1.6, 0.3, -0.85],
        [-1.15, -0.7, 1.55]
      ]
    },
    {
      key: "encoder2",
      scale: 1.75,
      biases: {
        melt: [-1.2, 0.85, -0.65, 1.05, -1.35, 0.35],
        stable: [0.75, -1.05, 0.95, -1.25, 0.45, -0.55],
        mixed: [-0.55, 0.55, -1.15, 0.95, -0.95, 0.15]
      },
      weights: [
        [1.2, -0.95, 0.7, -0.35, 1.05, -0.8],
        [-0.75, 1.35, -0.45, 0.65, -0.55, 1.0],
        [0.55, 0.4, -1.25, 1.1, -0.7, 0.25],
        [-1.05, 0.75, 0.9, -0.85, 0.45, -1.2],
        [1.35, -0.2, 0.35, 0.8, -1.1, 0.55],
        [-0.6, 0.5, 1.2, -0.3, 0.95, -0.85]
      ]
    },
    {
      key: "latent",
      scale: 1.7,
      biases: {
        melt: [0.9, -1.15, 0.55, -0.85, 1.15],
        stable: [-0.95, 0.95, -0.55, 0.75, -0.25],
        mixed: [0.35, -0.75, 0.85, -1.05, 0.65]
      },
      weights: [
        [1.05, 0.45, -1.0, 0.9, -0.65, -0.35],
        [-0.85, 1.2, 0.55, -0.45, 0.75, 0.65],
        [1.25, -0.6, 0.95, 0.4, -1.15, 0.25],
        [-0.45, 0.85, 1.15, -1.05, 0.9, -0.6],
        [-1.15, 0.65, -0.4, 1.25, 0.35, 0.9]
      ]
    }
  ];

  const headConfigs = [
    {
      key: "thermal",
      name: "Thermal response",
      blockLabel: "Thermal",
      outputBiases: [0.08, -0.16],
      outputScales: [1.25, 1.1],
      layers: [
        {
          key: "h1",
          scale: 1.55,
          biases: [-0.6, 0.35, -0.25, 0.55],
          weights: [
            [1.2, -0.75, 0.95, -0.35, 0.65],
            [-0.65, 1.05, -0.4, 0.85, -0.55],
            [0.75, 0.35, -1.15, 0.5, 0.95],
            [-0.9, 0.55, 0.7, -0.8, 1.1]
          ]
        },
        {
          key: "h2",
          scale: 1.45,
          biases: [0.2, -0.35, 0.5],
          weights: [
            [0.9, -0.45, 0.65, 0.35],
            [-0.55, 1.05, -0.25, 0.75],
            [0.45, 0.7, -0.8, 0.55]
          ]
        }
      ],
      outputWeights: [
        [1.0, -0.45, 0.8],
        [-0.55, 0.7, 0.45]
      ]
    },
    {
      key: "mechanical",
      name: "Mechanical response",
      blockLabel: "Mechanical",
      outputBiases: [-0.04, 0.18, -0.22],
      outputScales: [1.25, 1.05, 1.2],
      layers: [
        {
          key: "h1",
          scale: 1.55,
          biases: [0.45, -0.5, 0.65, -0.35],
          weights: [
            [-0.55, 1.15, -0.35, 0.75, -0.85],
            [0.95, -0.6, 0.85, -0.45, 0.35],
            [-0.35, 0.8, 0.4, 1.05, -0.7],
            [1.1, 0.25, -0.9, -0.55, 0.75]
          ]
        },
        {
          key: "h2",
          scale: 1.45,
          biases: [-0.3, 0.45, -0.15],
          weights: [
            [0.75, -0.65, 0.95, -0.35],
            [-0.5, 0.8, 0.45, 0.65],
            [1.05, 0.25, -0.7, -0.45]
          ]
        }
      ],
      outputWeights: [
        [-0.35, 0.95, 0.6],
        [0.8, -0.25, 0.55],
        [0.45, 0.6, -0.7]
      ]
    },
    {
      key: "composition",
      name: "Compositional signal",
      blockLabel: "Composition",
      outputBiases: [0.02, -0.12, 0.16, -0.08],
      outputScales: [1.25, 1.05, 1.15, 1.0],
      layers: [
        {
          key: "h1",
          scale: 1.55,
          biases: [-0.25, 0.55, -0.7, 0.4],
          weights: [
            [0.7, 0.65, -0.95, 0.35, -0.45],
            [-0.8, 0.5, 1.05, -0.35, 0.75],
            [1.15, -0.85, 0.25, 0.7, -0.55],
            [-0.45, 0.95, -0.65, 0.55, 0.85]
          ]
        },
        {
          key: "h2",
          scale: 1.45,
          biases: [0.35, -0.25, 0.15],
          weights: [
            [0.8, 0.5, -0.55, 0.9],
            [-0.75, 0.95, 0.35, -0.45],
            [0.45, -0.65, 1.0, 0.55]
          ]
        }
      ],
      outputWeights: [
        [0.85, 0.35, -0.5],
        [-0.45, 0.75, 0.55],
        [0.6, -0.35, 0.8],
        [0.25, 0.65, -0.6]
      ]
    }
  ];

  const nodeDefinitions = [
    makeNodeLayer("input", 74, [190, 250, 310], ["A", "B", "C"]),
    makeNodeLayer("encoder1", 215, spreadY(6, 112, 388), ["1", "2", "3", "4", "5", "6"]),
    makeNodeLayer("encoder2", 355, spreadY(6, 112, 388), ["1", "2", "3", "4", "5", "6"]),
    makeNodeLayer("latent", 500, spreadY(5, 145, 355), ["z1", "z2", "z3", "z4", "z5"])
  ];

  const taskBlocks = [
    { key: "thermal", label: "Thermal", x: 642, y: 92, width: 150, height: 72 },
    { key: "mechanical", label: "Mechanical", x: 642, y: 214, width: 150, height: 72 },
    { key: "composition", label: "Composition", x: 642, y: 336, width: 150, height: 72 }
  ];

  const nodeMap = Object.fromEntries(nodeDefinitions.map((layer) => [layer.key, layer]));
  const blockMap = Object.fromEntries(taskBlocks.map((block) => [block.key, block]));
  const inputs = Array.from(root.querySelectorAll("[data-nn-input]"));
  const taskSelect = root.querySelector("[data-nn-task]");
  const runButton = root.querySelector("[data-nn-run]");
  const nodeLayer = root.querySelector("[data-nn-nodes]");
  const connectionLayer = root.querySelector("[data-nn-connections]");
  const taskBlockLayer = root.querySelector("[data-nn-task-blocks]");
  const popup = root.querySelector("[data-nn-head-popup]");
  const popupSvg = root.querySelector("[data-nn-popup-svg]");
  const popupTitle = root.querySelector("[data-nn-popup-title]");
  const popupStatus = root.querySelector("[data-nn-popup-status]");
  const popupOutput = root.querySelector("[data-nn-popup-output]");
  const popupCloseButtons = Array.from(root.querySelectorAll("[data-nn-popup-close]"));
  const outputElements = Object.fromEntries(
    Array.from(root.querySelectorAll("[data-nn-head-output]")).map((element) => [element.dataset.nnHeadOutput, element])
  );
  const outputCards = Object.fromEntries(
    Array.from(root.querySelectorAll("[data-nn-output-card]")).map((element) => [element.dataset.nnOutputCard, element])
  );

  const state = {
    nodes: [],
    blocks: [],
    connections: [],
    replayToken: 0,
    popupToken: 0,
    backgroundRgb: null,
    openHeadKey: null
  };

  function makeNodeLayer(key, x, yValues, labels) {
    return {
      key,
      nodes: yValues.map((y, index) => ({ x, y, label: labels[index] }))
    };
  }

  function spreadY(count, start, end) {
    if (count === 1) return [(start + end) / 2];
    const step = (end - start) / (count - 1);
    return Array.from({ length: count }, (_, index) => start + step * index);
  }

  function sigmoid(value) {
    return 1 / (1 + Math.exp(-value));
  }

  function dot(row, values) {
    return row.reduce((total, weight, index) => total + weight * values[index], 0);
  }

  function calculateLayer(layer, previous) {
    return layer.weights.map((row, index) => sigmoid(dot(row, previous) * layer.scale + layer.biases[index]));
  }

  function calculateOutputLayer(head, previous) {
    return head.outputWeights.map((row, index) => {
      const scale = Array.isArray(head.outputScales) ? head.outputScales[index] : head.outputScale;
      const bias = Array.isArray(head.outputBiases) ? head.outputBiases[index] : head.outputBias;
      return sigmoid(dot(row, previous) * scale + bias);
    });
  }

  function calculate() {
    const mode = taskSelect.value || "melt";
    const activations = {
      input: inputs.map((input) => Number(input.value))
    };

    let previous = activations.input;
    encoderLayers.forEach((layer) => {
      activations[layer.key] = layer.weights.map((row, index) => sigmoid(dot(row, previous) * layer.scale + layer.biases[mode][index]));
      previous = activations[layer.key];
    });

    const headResults = headConfigs.map((head) => {
      const h1 = calculateLayer(head.layers[0], activations.latent);
      const h2 = calculateLayer(head.layers[1], h1);
      const output = calculateOutputLayer(head, h2);

      return {
        key: head.key,
        name: head.name,
        activations: {
          latent: activations.latent,
          h1,
          h2,
          output
        },
        output
      };
    });

    return {
      activations,
      headResults,
      headMap: Object.fromEntries(headResults.map((head) => [head.key, head]))
    };
  }

  function contribution(weight, activation, target) {
    const directContribution = Math.abs(weight * activation);
    return Math.min(1, Math.max(directContribution, target * 0.35));
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function mixChannel(start, end, amount) {
    return Math.round(start + (end - start) * amount);
  }

  function mixRgb(start, end, amount) {
    const bounded = clamp(amount, 0, 1);
    return `rgb(${mixChannel(start[0], end[0], bounded)}, ${mixChannel(start[1], end[1], bounded)}, ${mixChannel(start[2], end[2], bounded)})`;
  }

  function parseRgb(value) {
    const match = value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  }

  function getBackgroundRgb() {
    if (state.backgroundRgb) return state.backgroundRgb;

    const candidates = [
      window.getComputedStyle(root).backgroundColor,
      window.getComputedStyle(document.querySelector(".nn-demo__visual-wrap") || root).backgroundColor,
      window.getComputedStyle(document.body).backgroundColor
    ];

    state.backgroundRgb = candidates.map(parseRgb).find(Boolean) || [248, 249, 250];
    return state.backgroundRgb;
  }

  function applyActivationStyle(node, activation) {
    const brightness = clamp(activation, 0, 1);
    const background = getBackgroundRgb();
    const quietFill = mixRgb(background, [69, 126, 143], 0.2);
    const circleFill = mixRgb(parseRgb(quietFill), [184, 246, 232], brightness);
    const strokeFill = mixRgb(background, [44, 139, 128], 0.28 + brightness * 0.72);
    const textFill = brightness > 0.48 ? "#17373c" : mixRgb(background, [36, 70, 80], 0.78);
    const circle = node.querySelector("circle");

    node.style.setProperty("--activation", brightness.toFixed(3));
    node.style.setProperty("--node-fill", circleFill);
    node.style.setProperty("--node-stroke", strokeFill);
    node.style.setProperty("--node-glow", `${(brightness * 13).toFixed(1)}px`);
    node.style.setProperty("--node-glow-alpha", (brightness * 0.72).toFixed(3));
    node.style.setProperty("--node-text", textFill);

    if (circle) {
      circle.setAttribute("fill", circleFill);
      circle.setAttribute("stroke", strokeFill);
      circle.style.fill = circleFill;
      circle.style.stroke = strokeFill;
    }
  }

  function makeSvgElement(name, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.keys(attributes).forEach((key) => element.setAttribute(key, attributes[key]));
    return element;
  }

  function drawNetwork() {
    addHandoffArrowMarker();
    addMatrixConnections("input", "encoder1", encoderLayers[0].weights, "encoder1");
    addMatrixConnections("encoder1", "encoder2", encoderLayers[1].weights, "encoder2");
    addMatrixConnections("encoder2", "latent", encoderLayers[2].weights, "latent");
    taskBlocks.forEach((block) => addHandoffConnection("latent", block.key, `${block.key}Handoff`));
    drawTaskBlocks();
    drawMainNodes();
  }

  function drawMainNodes() {
    nodeDefinitions.forEach((layer) => {
      layer.nodes.forEach((node, nodeIndex) => {
        const group = makeSvgElement("g", {
          class: "nn-node",
          "data-layer": layer.key,
          "data-index": nodeIndex
        });
        const radius = layer.key === "input" ? 20 : 12;
        const circle = makeSvgElement("circle", {
          cx: node.x,
          cy: node.y,
          r: radius
        });
        const label = makeSvgElement("text", {
          class: "nn-node__label",
          x: node.x,
          y: node.y + 4,
          "text-anchor": "middle"
        });
        const value = makeSvgElement("text", {
          class: "nn-node__value",
          x: node.x,
          y: node.y + radius + 12,
          "text-anchor": "middle"
        });
        label.textContent = node.label;
        value.textContent = "";
        group.appendChild(circle);
        group.appendChild(label);
        group.appendChild(value);
        nodeLayer.appendChild(group);
        state.nodes.push(group);
      });
    });
  }

  function drawTaskBlocks() {
    taskBlocks.forEach((block) => {
      const group = makeSvgElement("g", {
        class: "nn-task-block",
        "data-task-block": block.key,
        role: "button",
        tabindex: "0",
        "aria-label": `Inspect ${block.label} task head`
      });
      const rect = makeSvgElement("rect", {
        x: block.x,
        y: block.y,
        width: block.width,
        height: block.height,
        rx: "7"
      });
      const title = makeSvgElement("text", {
        class: "nn-task-block__title",
        x: block.x + block.width / 2,
        y: block.y + 21,
        "text-anchor": "middle"
      });
      const subtitle = makeSvgElement("text", {
        class: "nn-task-block__subtitle",
        x: block.x + block.width / 2,
        y: block.y + 38,
        "text-anchor": "middle"
      });
      const value = makeSvgElement("text", {
        class: "nn-task-block__value",
        x: block.x + block.width / 2,
        y: block.y + 58,
        "text-anchor": "middle",
        "data-task-block-value": block.key
      });
      title.textContent = block.label;
      subtitle.textContent = "Inspect";
      value.textContent = "";
      group.appendChild(rect);
      group.appendChild(title);
      group.appendChild(subtitle);
      group.appendChild(value);
      taskBlockLayer.appendChild(group);
      state.blocks.push(group);
    });
  }

  function addMatrixConnections(fromKey, toKey, matrix, segment) {
    matrix.forEach((row, toIndex) => {
      row.forEach((weight, fromIndex) => {
        addConnection(fromKey, fromIndex, toKey, toIndex, weight, segment);
      });
    });
  }

  function addHandoffArrowMarker() {
    const svg = connectionLayer.ownerSVGElement;
    if (!svg || svg.querySelector("#nn-handoff-arrow")) return;

    const defs = makeSvgElement("defs", {});
    const marker = makeSvgElement("marker", {
      id: "nn-handoff-arrow",
      markerHeight: "7",
      markerWidth: "7",
      orient: "auto",
      refX: "9",
      refY: "5",
      viewBox: "0 0 10 10"
    });
    const arrow = makeSvgElement("path", {
      d: "M 0 0 L 10 5 L 0 10 z",
      fill: "#457e8f"
    });

    marker.appendChild(arrow);
    defs.appendChild(marker);
    svg.insertBefore(defs, svg.firstChild);
  }

  function layerCenter(layerKey) {
    const nodes = nodeMap[layerKey].nodes;
    return {
      x: nodes.reduce((total, node) => total + node.x, 0) / nodes.length,
      y: nodes.reduce((total, node) => total + node.y, 0) / nodes.length
    };
  }

  function blockInputPoint(blockKey) {
    const block = blockMap[blockKey];
    return {
      x: block.x,
      y: block.y + block.height / 2
    };
  }

  function addHandoffConnection(fromKey, blockKey, segment) {
    const from = layerCenter(fromKey);
    const to = blockInputPoint(blockKey);
    const line = makeSvgElement("line", {
      x1: from.x + 24,
      y1: from.y,
      x2: to.x - 12,
      y2: to.y,
      class: "nn-connection nn-connection--handoff",
      "marker-end": "url(#nn-handoff-arrow)",
      "data-from-layer": fromKey,
      "data-to-block": blockKey,
      "data-segment": segment,
      "data-weight": "1"
    });
    connectionLayer.appendChild(line);
    state.connections.push(line);
  }

  function addConnection(fromKey, fromIndex, toKey, toIndex, weight, segment) {
    const from = nodeMap[fromKey].nodes[fromIndex];
    const to = nodeMap[toKey].nodes[toIndex];
    const line = makeSvgElement("line", {
      x1: from.x + 18,
      y1: from.y,
      x2: to.x - 18,
      y2: to.y,
      class: weight >= 0 ? "nn-connection nn-connection--positive" : "nn-connection nn-connection--negative",
      "data-from-layer": fromKey,
      "data-from-index": fromIndex,
      "data-to-layer": toKey,
      "data-to-index": toIndex,
      "data-segment": segment,
      "data-weight": weight
    });
    connectionLayer.appendChild(line);
    state.connections.push(line);
  }

  function getNode(layer, index) {
    return state.nodes.find((item) => item.dataset.layer === layer && Number(item.dataset.index) === index);
  }

  function setNodeActivation(layer, index, activation, showValue) {
    const node = getNode(layer, index);
    if (!node) return;

    applyActivationStyle(node, activation);
    node.classList.toggle("is-active", activation > 0.58);
    node.classList.toggle("has-value", showValue);
    node.classList.toggle("is-revealed", showValue);

    const value = node.querySelector(".nn-node__value");
    if (value) value.textContent = showValue ? activation.toFixed(2) : "";
  }

  function setLayerActivation(layer, values, showValues) {
    values.forEach((value, index) => setNodeActivation(layer, index, value, showValues));
  }

  function setTaskBlockState(key, stateName) {
    const block = state.blocks.find((item) => item.dataset.taskBlock === key);
    if (!block) return;
    block.classList.toggle("is-active", stateName === "active");
    block.classList.toggle("is-complete", stateName === "complete");
  }

  function resetConnections() {
    state.connections.forEach((line) => {
      line.classList.remove("is-flowing", "is-dimmed", "is-retained");
      line.style.setProperty("--strength", "0.02");
    });
  }

  function updateConnection(line, result, activeSegments, completedSegments) {
    const fromLayer = line.dataset.fromLayer;
    const segment = line.dataset.segment;
    const weight = Number(line.dataset.weight);
    const isHandoff = line.classList.contains("nn-connection--handoff");
    const source = isHandoff
      ? average(result.activations[fromLayer])
      : result.activations[fromLayer][Number(line.dataset.fromIndex)];
    const target = isHandoff
      ? average(result.headMap[line.dataset.toBlock].output)
      : result.activations[line.dataset.toLayer][Number(line.dataset.toIndex)];
    const strength = contribution(weight, source, target);
    const isActive = activeSegments === null || activeSegments.includes(segment);
    const isCompleted = activeSegments === null || completedSegments.includes(segment);
    const renderedStrength = isActive || isCompleted ? strength : 0.02;

    line.style.setProperty("--strength", renderedStrength.toFixed(3));
    line.classList.toggle("is-flowing", activeSegments !== null && isActive && strength > 0.28);
    line.classList.toggle("is-retained", activeSegments !== null && isCompleted && !isActive);
    line.classList.toggle("is-dimmed", activeSegments !== null && !isActive && !isCompleted);
  }

  function updateConnections(result, activeSegments, completedSegments) {
    state.connections.forEach((line) => updateConnection(line, result, activeSegments, completedSegments));
  }

  function average(values) {
    return values.reduce((total, value) => total + value, 0) / values.length;
  }

  function renderSteady() {
    const result = calculate();
    Object.keys(result.activations).forEach((key) => setLayerActivation(key, result.activations[key], true));
    updateConnections(result, null, []);
    renderOutputs(result, headConfigs.map((head) => head.key));
    headConfigs.forEach((head) => setTaskBlockState(head.key, "complete"));
    if (state.openHeadKey) renderHeadPopup(state.openHeadKey, result, { activeIndex: 3 });
  }

  function formatOutput(value) {
    if (Array.isArray(value)) return `[${value.map((item) => item.toFixed(2)).join(", ")}]`;
    return value.toFixed(2);
  }

  function formatCompactOutput(value) {
    if (!Array.isArray(value)) return value.toFixed(2);
    return value.length > 3
      ? `[${value.slice(0, 3).map((item) => item.toFixed(2)).join(", ")}...]`
      : formatOutput(value);
  }

  function pendingOutput(head) {
    const count = head.outputWeights.length;
    return `[${Array.from({ length: count }, () => "--").join(", ")}]`;
  }

  function setTaskBlockOutput(key, text) {
    const block = state.blocks.find((item) => item.dataset.taskBlock === key);
    const value = block ? block.querySelector("[data-task-block-value]") : null;
    if (value) value.textContent = text;
  }

  function renderOutputs(result, visibleHeads) {
    result.headResults.forEach((head) => {
      const visible = visibleHeads.includes(head.key);
      if (outputElements[head.key]) {
        outputElements[head.key].textContent = visible ? formatOutput(head.output) : pendingOutput(headConfigs.find((item) => item.key === head.key));
      }
      if (outputCards[head.key]) {
        outputCards[head.key].classList.toggle("is-active", visible);
      }
      setTaskBlockOutput(head.key, visible ? formatCompactOutput(head.output) : "");
    });
  }

  function resetReplay(result) {
    resetConnections();
    headConfigs.forEach((head) => setTaskBlockState(head.key, ""));

    Object.keys(result.activations).forEach((key) => {
      const showValues = key === "input";
      result.activations[key].forEach((value, index) => setNodeActivation(key, index, key === "input" ? value : 0, showValues));
    });

    renderOutputs(result, []);
  }

  function sleep(ms) {
    return new Promise((resolve) => window.setTimeout(resolve, ms));
  }

  async function revealLayer(result, layer, activeSegments, completedSegments, token) {
    if (state.replayToken !== token) return false;
    root.dataset.firingLayer = layer;
    updateConnections(result, activeSegments, completedSegments);
    await sleep(360);

    if (state.replayToken !== token) return false;
    setLayerActivation(layer, result.activations[layer], true);
    await sleep(560);
    return true;
  }

  async function replay() {
    const token = state.replayToken + 1;
    state.replayToken = token;
    const result = calculate();
    const completedSegments = [];
    const visibleHeads = [];

    resetReplay(result);
    await sleep(220);

    for (const layer of ["encoder1", "encoder2", "latent"]) {
      const ok = await revealLayer(result, layer, [layer], completedSegments, token);
      if (!ok) return;
      completedSegments.push(layer);
    }

    const handoffSegments = headConfigs.map((head) => `${head.key}Handoff`);
    root.dataset.firingLayer = "latentHandoff";
    updateConnections(result, handoffSegments, completedSegments);
    await sleep(900);
    completedSegments.push(...handoffSegments);

    for (const head of headConfigs) {
      setTaskBlockState(head.key, "active");
      root.dataset.firingLayer = `${head.key}Output`;
      await sleep(580);

      if (state.replayToken !== token) return;
      visibleHeads.push(head.key);
      renderOutputs(result, visibleHeads);
      setTaskBlockState(head.key, "complete");
      if (state.openHeadKey === head.key) renderHeadPopup(head.key, result, { activeIndex: 3 });
      await sleep(420);
    }

    if (state.replayToken !== token) return;
    root.dataset.firingLayer = "complete";
    updateConnections(result, null, completedSegments);
  }

  function openHeadPopup(headKey) {
    if (!popup || !popupSvg) return;
    state.openHeadKey = headKey;
    const token = state.popupToken + 1;
    state.popupToken = token;
    popup.classList.add("is-open");
    popup.setAttribute("aria-hidden", "false");
    animateHeadPopup(headKey, token);

    const closeButton = popup.querySelector(".nn-head-popup__close");
    if (closeButton) closeButton.focus();
  }

  function closeHeadPopup() {
    if (!popup) return;
    state.popupToken += 1;
    state.openHeadKey = null;
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
  }

  async function animateHeadPopup(headKey, token) {
    const steps = [
      { activeIndex: 0, status: "Latent vector received", delay: 420 },
      { activeIndex: 1, status: "Evaluating Head H1", delay: 520 },
      { activeIndex: 2, status: "Evaluating Head H2", delay: 560 },
      { activeIndex: 3, status: "Output vector ready", delay: 0 }
    ];

    for (const step of steps) {
      if (state.popupToken !== token || state.openHeadKey !== headKey) return;
      renderHeadPopup(headKey, calculate(), step);
      if (step.delay) await sleep(step.delay);
    }
  }

  function renderHeadPopup(headKey, result, options) {
    if (!popupSvg) return;
    const head = headConfigs.find((item) => item.key === headKey);
    if (!head) return;

    const headResult = result.headMap[head.key];
    const activeIndex = options && Number.isFinite(options.activeIndex) ? options.activeIndex : 3;
    popupSvg.textContent = "";

    if (popupTitle) popupTitle.textContent = head.name;
    if (popupStatus) popupStatus.textContent = options && options.status ? options.status : "Latent vector into two-layer task network";
    if (popupOutput) popupOutput.textContent = activeIndex >= 3 ? formatOutput(headResult.output) : pendingOutput(head);

    const outputCount = headResult.activations.output.length;
    const focusLayers = [
      makeFocusLayer("latent", 80, spreadY(5, 58, 174), ["z1", "z2", "z3", "z4", "z5"], headResult.activations.latent),
      makeFocusLayer("h1", 285, spreadY(4, 65, 165), ["1", "2", "3", "4"], headResult.activations.h1),
      makeFocusLayer("h2", 485, spreadY(3, 78, 152), ["1", "2", "3"], headResult.activations.h2),
      makeFocusLayer(
        "output",
        675,
        spreadY(outputCount, outputCount > 1 ? 78 : 104, outputCount > 1 ? 152 : 126),
        Array.from({ length: outputCount }, (_, index) => `y${index + 1}`),
        headResult.activations.output
      )
    ];

    drawFocusConnections(focusLayers, activeIndex);
    focusLayers.forEach((layer, layerIndex) => {
      layer.nodes.forEach((node, index) => {
        drawFocusNode(node, layer.values[index], layerIndex <= activeIndex);
      });
    });
    drawFocusLabels();
  }

  function makeFocusLayer(key, x, yValues, labels, values) {
    return {
      key,
      values,
      nodes: yValues.map((y, index) => ({ x, y, label: labels[index] }))
    };
  }

  function drawFocusConnections(layers, activeIndex) {
    for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex += 1) {
      layers[layerIndex].nodes.forEach((fromNode, fromIndex) => {
        layers[layerIndex + 1].nodes.forEach((toNode, toIndex) => {
          const source = layers[layerIndex].values[fromIndex];
          const target = layers[layerIndex + 1].values[toIndex];
          const strength = layerIndex <= activeIndex - 1 ? contribution(1, source, target) : 0.02;
          const line = makeSvgElement("line", {
            x1: fromNode.x + 15,
            y1: fromNode.y,
            x2: toNode.x - 15,
            y2: toNode.y,
            class: "nn-focus-connection",
            "data-active": layerIndex === activeIndex - 1 ? "true" : "false"
          });
          line.style.setProperty("--strength", strength.toFixed(3));
          popupSvg.appendChild(line);
        });
      });
    }
  }

  function drawFocusNode(node, activation, showValue) {
    const group = makeSvgElement("g", {
      class: "nn-node nn-focus-node"
    });
    const circle = makeSvgElement("circle", {
      cx: node.x,
      cy: node.y,
      r: "13"
    });
    const label = makeSvgElement("text", {
      class: "nn-node__label",
      x: node.x,
      y: node.y + 4,
      "text-anchor": "middle"
    });
    const value = makeSvgElement("text", {
      class: "nn-node__value",
      x: node.x,
      y: node.y + 25,
      "text-anchor": "middle"
    });

    label.textContent = node.label;
    value.textContent = showValue ? activation.toFixed(2) : "";
    group.appendChild(circle);
    group.appendChild(label);
    group.appendChild(value);
    group.classList.toggle("has-value", showValue);
    popupSvg.appendChild(group);
    applyActivationStyle(group, showValue ? activation : 0);
  }

  function drawFocusLabels() {
    [
      ["Latent", 80],
      ["Head H1", 285],
      ["Head H2", 485],
      ["Output", 675]
    ].forEach(([label, x]) => {
      const text = makeSvgElement("text", {
        class: "nn-focus-label",
        x,
        y: 26,
        "text-anchor": "middle"
      });
      text.textContent = label;
      popupSvg.appendChild(text);
    });
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      state.replayToken += 1;
      renderSteady();
      const output = root.querySelector(`[data-nn-input-value="${input.dataset.nnInput}"]`);
      if (output) output.textContent = Number(input.value).toFixed(2);
    });
  });

  function bindTaskBlockEvents() {
    state.blocks.forEach((block) => {
      block.addEventListener("click", () => openHeadPopup(block.dataset.taskBlock));
      block.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openHeadPopup(block.dataset.taskBlock);
      });
    });
  }

  popupCloseButtons.forEach((button) => {
    button.addEventListener("click", closeHeadPopup);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.openHeadKey) closeHeadPopup();
  });

  taskSelect.addEventListener("change", () => {
    renderSteady();
    replay();
  });
  runButton.addEventListener("click", replay);

  drawNetwork();
  bindTaskBlockEvents();
  renderSteady();
})();
