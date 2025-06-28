// Sidebar alphabet links
const sidebar = document.querySelector('.alphabet-sidebar');
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  const link = document.createElement("a");
  link.href = `#${letter}`;
  link.textContent = letter;
  sidebar.appendChild(link);
}

const container = document.getElementById('company-container');
const searchInput = document.getElementById('search-input');
let allCompanies = [];

// Render grouped companies
function renderCompanies(companies) {
  container.innerHTML = ''; // Clear current content
  const grouped = {};

  companies.sort().forEach(company => {
    const letter = company[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(company);
  });

  for (const letter in grouped) {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'letter-group';
    groupDiv.id = letter;

    const header = document.createElement('h2');
    header.textContent = letter;
    groupDiv.appendChild(header);
    groupDiv.appendChild(document.createElement('hr'));

    grouped[letter].forEach(company => {
      const link = document.createElement('a');
      link.className = 'company-link';
      link.href = `topics.html?company=${encodeURIComponent(company)}`;
      link.textContent = company;
      groupDiv.appendChild(link);
    });

    container.appendChild(groupDiv);
  }
}

// Filter companies on input
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allCompanies.filter(company =>
    company.toLowerCase().includes(query)
  );
  renderCompanies(filtered);
});

// Load and display all companies
fetch('data/companies.json')
  .then(res => res.json())
  .then(data => {
    allCompanies = data;
    renderCompanies(allCompanies);
  })
  .catch(err => {
    console.error("Failed to load companies:", err);
    container.innerHTML = "<p>Error loading companies.</p>";
  });
