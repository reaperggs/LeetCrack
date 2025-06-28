const urlParams = new URLSearchParams(window.location.search);
const company = urlParams.get('company');

const titleEl = document.getElementById('page-title');
const container = document.getElementById('topic-container');

if (!company) {
  titleEl.textContent = "No company selected";
  container.innerHTML = "<p style='text-align:center'>Please go back and pick a company.</p>";
  throw new Error("Company not provided in URL.");
}

document.title = `Topics | ${company} | LeetCrack`;
document.getElementById("company-name").textContent = company;


fetch('data/data.json')
  .then(res => res.json())
  .then(data => {
    const topics = data[company];
    if (!topics) {
      container.innerHTML = `<p style='text-align:center'>No topics found for ${company}.</p>`;
      return;
    }

    Object.keys(topics).forEach(topic => {
      const cardLink = document.createElement('a');
      cardLink.href = `questions.html?company=${encodeURIComponent(company)}&topic=${encodeURIComponent(topic)}`;
      cardLink.className = 'card-link';

      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = topic;

      cardLink.appendChild(card);
      container.appendChild(cardLink);
    });
  })
  .catch(err => {
    console.error("Error loading topics:", err);
    container.innerHTML = "<p style='text-align:center'>Something went wrong. Please try again later.</p>";
  });
