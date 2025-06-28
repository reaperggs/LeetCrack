// Extract 'company' and 'topic' from URL parameters
const params = new URLSearchParams(window.location.search);
const company = params.get("company");
const topic = params.get("topic");

// Update heading
const topicHeading = document.getElementById("topic-name");
if (topicHeading) {
  topicHeading.innerHTML = `
    <a href="topics.html?company=${encodeURIComponent(company)}" style="color: maroon; text-decoration: none;">${company}</a> / ${topic}
  `;
}

// Fetch questions from data/data.json
fetch("data/data.json")
  .then((res) => res.json())
  .then((data) => {
    const questions = data?.[company]?.[topic];
    if (!questions || !Array.isArray(questions)) {
      document.querySelector(".question-container").innerHTML =
        `<p style="color: maroon;">No data found for ${company} / ${topic}.</p>`;
      return;
    }

    const easyList = document.getElementById("easy-list");
    const mediumList = document.getElementById("medium-list");
    const hardList = document.getElementById("hard-list");

    questions.forEach((q) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = q.link;
      a.target = "_blank";
      a.textContent = q.title;
      li.appendChild(a);

      const difficulty = q.difficulty?.toLowerCase();
      if (difficulty === "easy") {
        easyList.appendChild(li);
      } else if (difficulty === "medium") {
        mediumList.appendChild(li);
      } else if (difficulty === "hard") {
        hardList.appendChild(li);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to load questions:", err);
    document.querySelector(".question-container").innerHTML =
      `<p style="color: red;">Error loading questions. Check console.</p>`;
  });
