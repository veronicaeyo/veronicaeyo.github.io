(function () {
  const chat = document.getElementById("wellness-chat");
  const signal = document.getElementById("wellness-signal");
  const confidence = document.getElementById("wellness-confidence");
  const source = document.getElementById("wellness-source");
  const topics = document.getElementById("wellness-topics");

  if (!chat || !signal || !confidence || !source || !topics) {
    return;
  }

  const workflow = [
    {
      signal: "Possible emotional concern",
      confidence: "0.80",
      source: "fallback",
      topics: ["overwhelmed", "sadness", "fatigue", "support"],
      blocks: [
        { type: "user", text: "I feel overwhelmed, sad, and tired today. I don't know what to do and I need support." },
        { type: "meta", title: "Transformer model id", text: "Optional field available for transformer-backed inference." },
      ],
    },
    {
      signal: "Possible emotional concern",
      confidence: "0.80",
      source: "fallback",
      topics: ["coping", "support-seeking", "safety"],
      blocks: [
        {
          type: "panel",
          title: "Gentle suggestions",
          items: [
            "Take a slow breath for 60 seconds and pause before making major decisions.",
            "Reach out to a trusted friend, family member, or counselor for support.",
            "Take a short walk, drink water, and rest if you can.",
            "If this feels urgent or unsafe, seek immediate help from emergency services or a crisis line.",
          ],
        },
      ],
    },
    {
      signal: "Support resources shown",
      confidence: "0.80",
      source: "fallback",
      topics: ["resources", "care", "urgent support"],
      blocks: [
        {
          type: "panel",
          title: "Crisis and support resources",
          text: "If you need immediate support, please use the resources below.",
          items: [
            "988 Suicide & Crisis Lifeline",
            "Emergency Services",
            "Samaritans",
            "Local Mental Health Services",
          ],
        },
      ],
    },
    {
      signal: "Possible emotional concern",
      confidence: "0.80",
      source: "fallback",
      topics: ["summary", "confidence", "non-diagnostic"],
      blocks: [
        {
          type: "assistant",
          text: "Wellness summary\n\nPossible emotional concern\n\nThis result suggests the message may contain signs of emotional distress. It is not a diagnosis and should be treated as a prompt for support and reflection. Confidence is moderate, so the result may be uncertain.\n\nIf this feels urgent, contact a crisis helpline or a trusted professional right away. If you are in immediate danger, seek emergency help now.",
        },
      ],
    },
    {
      signal: "Explanation ready",
      confidence: "0.80",
      source: "fallback",
      topics: ["explainability", "dashboard", "journal"],
      blocks: [
        { type: "meta", title: "Why this result appeared", text: "The model detected language associated with feeling overwhelmed, sadness, tiredness, uncertainty, and need for support." },
        {
          type: "dashboard",
          title: "Wellness dashboard",
          metrics: [
            ["Entries logged", "0"],
            ["Average mood", "0.0"],
            ["Latest mood", "0"],
          ],
        },
        { type: "meta", title: "Daily journal", text: "Mood slider: 1 to 5\nOptional note: No entries yet. Start your journal by saving one." },
      ],
    },
  ];

  let index = 0;

  function createBlock(block) {
    const element = document.createElement("div");
    element.className = `wellness-bubble ${block.type}`;

    if (block.type === "panel") {
      element.innerHTML = `<strong>${block.title}</strong>${block.text ? `<p>${block.text}</p>` : ""}<ul>${block.items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
      return element;
    }

    if (block.type === "dashboard") {
      element.innerHTML = `<strong>${block.title}</strong><div class="wellness-metrics">${block.metrics.map((metric) => `<span><b>${metric[1]}</b>${metric[0]}</span>`).join("")}</div>`;
      return element;
    }

    if (block.type === "meta") {
      element.innerHTML = `<strong>${block.title}</strong><p>${block.text}</p>`;
      return element;
    }

    element.textContent = block.text;
    return element;
  }

  function renderTopics(items) {
    topics.innerHTML = "";
    items.forEach((item) => {
      const chip = document.createElement("span");
      chip.textContent = item;
      topics.appendChild(chip);
    });
  }

  function renderWorkflow() {
    const item = workflow[index];
    chat.innerHTML = "";
    signal.textContent = item.signal;
    confidence.textContent = item.confidence;
    source.textContent = item.source;
    renderTopics(item.topics);

    item.blocks.forEach((block, blockIndex) => {
      window.setTimeout(() => {
        chat.appendChild(createBlock(block));
      }, blockIndex * 650);
    });

    index = (index + 1) % workflow.length;
  }

  renderWorkflow();
  window.setInterval(renderWorkflow, 5200);
})();
