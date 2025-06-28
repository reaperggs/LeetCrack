const journey = document.getElementById("journey");

// Ordered topics (you can change this order based on difficulty/priority)
const topicOrder = [
  "Array", "String", "Hash Table", "Two Pointers", "Sliding Window",
  "Stack", "Queue", "Linked List", "Tree", "Binary Search", "Heap",
  "Graph", "Greedy", "Dynamic Programming", "Backtracking", "Trie"
];

const uniqueTopics = new Set();

fetch("data/raw_data.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      if (item["Frequency (Number of Companies)"] >= 5) {
        const topics = item["Topics"]
          .split(",")
          .map(t => t.trim());
        topics.forEach(t => uniqueTopics.add(t));
      }
    });

    topicOrder.forEach(topic => {
      if (!uniqueTopics.has(topic)) return;

      const step = document.createElement("div");
      step.className = "journey-step";
      step.textContent = topic;
      step.onclick = () => {
        window.location.href = `topic-roadmap.html?topic=${encodeURIComponent(topic)}`;
      };

      journey.appendChild(step);

      // Line between steps
      const line = document.createElement("div");
      line.className = "line";
      journey.appendChild(line);
    });

    // Remove last line
    if (journey.lastChild.className === "line") {
      journey.removeChild(journey.lastChild);
    }
  })
  .catch(err => {
    console.error("Failed to build journey map:", err);
    journey.innerHTML = "<p>Could not load roadmap. Try again later.</p>";
  });
