(function () {
  const chat = document.getElementById("wellness-chat");
  const signal = document.getElementById("wellness-signal");
  const confidence = document.getElementById("wellness-confidence");
  const source = document.getElementById("wellness-source");
  const topics = document.getElementById("wellness-topics");

  if (!chat || !signal || !confidence || !source || !topics) {
    return;
  }

  const conversations = [
    {
      user: "I feel very sad and tired today.",
      assistant: "I am sorry you are feeling this way. This message may contain signs of emotional distress. This is not a diagnosis, but it may be a good moment to pause, reflect, and reach out for support.",
      signal: "Possible emotional concern",
      confidence: "0.91",
      source: "fallback model",
      topics: ["sadness", "fatigue", "support-seeking"],
    },
    {
      user: "I had a calm walk and feel a little better.",
      assistant: "This message sounds more positive and grounded. Keep noticing what helps your wellbeing, and consider journaling what made the walk feel helpful.",
      signal: "No clear concern",
      confidence: "0.84",
      source: "transformer fallback",
      topics: ["calm", "wellbeing", "reflection"],
    },
    {
      user: "Everything feels overwhelming and I cannot focus.",
      assistant: "This may reflect stress or emotional overload. Try breaking the next step into something small, and consider reaching out to someone you trust if the feeling continues.",
      signal: "Possible emotional concern",
      confidence: "0.88",
      source: "saved ML model",
      topics: ["stress", "focus", "coping"],
    },
    {
      user: "I wrote in my journal and I want to track my mood this week.",
      assistant: "That is a useful reflective step. The dashboard can summarize journal entries, average mood, latest mood, and recent notes so patterns are easier to notice over time.",
      signal: "Reflective check-in",
      confidence: "0.79",
      source: "rule-based support layer",
      topics: ["journaling", "mood tracking", "dashboard"],
    },
  ];

  let index = 0;

  function createBubble(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `wellness-bubble ${role}`;
    bubble.textContent = text;
    return bubble;
  }

  function renderTopics(items) {
    topics.innerHTML = "";
    items.forEach((item) => {
      const chip = document.createElement("span");
      chip.textContent = item;
      topics.appendChild(chip);
    });
  }

  function renderConversation() {
    const item = conversations[index];
    chat.innerHTML = "";
    signal.textContent = item.signal;
    confidence.textContent = item.confidence;
    source.textContent = item.source;
    renderTopics(item.topics);

    const userBubble = createBubble("user", item.user);
    const assistantBubble = createBubble("assistant", item.assistant);

    chat.appendChild(userBubble);
    window.setTimeout(() => {
      chat.appendChild(assistantBubble);
    }, 900);

    index = (index + 1) % conversations.length;
  }

  renderConversation();
  window.setInterval(renderConversation, 5200);
})();
