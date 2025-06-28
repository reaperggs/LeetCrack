const roadmapContainer = document.getElementById("roadmap-container");
const topicTitle = document.getElementById("topic-title");

const params = new URLSearchParams(window.location.search);
const topic = params.get("topic");

if (!topic) {
  topicTitle.textContent = "No topic specified.";
  roadmapContainer.innerHTML = "";
  throw new Error("No topic specified in URL");
}

topicTitle.textContent = `Topic: ${topic}`;

const difficultyLabels = ["EASY", "MEDIUM", "HARD"];
const difficultyColumns = {};

// Setup columns for each difficulty
difficultyLabels.forEach(diff => {
  const col = document.createElement("div");
  col.className = "difficulty-column";

  const title = document.createElement("h2");
  title.textContent = diff.charAt(0) + diff.slice(1).toLowerCase();
  col.appendChild(title);

  const list = document.createElement("ul");
  list.className = "problem-list";
  col.appendChild(list);

  difficultyColumns[diff] = list;
  roadmapContainer.appendChild(col.parentElement || col);
});

fetch("data/raw_data.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(item => {
      const freq = item["Frequency (Number of Companies)"];
      if (freq < 6) return;

      const itemTopics = item["Topics"]
        .split(",")
        .map(t => t.trim().toLowerCase());

      if (!itemTopics.includes(topic.toLowerCase())) return;

      const difficulty = item["Difficulty"].toUpperCase();
      if (!difficultyLabels.includes(difficulty)) return;

      const list = difficultyColumns[difficulty];
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = item["Link of Question"];
      link.target = "_blank";
      link.textContent = `${item["Question"]} (${freq})`;
      li.appendChild(link);
      list.appendChild(li);
    });

    // Check if any column is empty
    difficultyLabels.forEach(diff => {
      if (!difficultyColumns[diff].children.length) {
        const li = document.createElement("li");
        li.textContent = "No problems found.";
        difficultyColumns[diff].appendChild(li);
      }
    });
  })
  .catch(err => {
    console.error("Failed to load topic roadmap:", err);
    topicTitle.textContent = "Error loading topic.";
    roadmapContainer.innerHTML =
      "<p style='padding:20px;'>Could not load topic problems. Please try again later.</p>";
  });
