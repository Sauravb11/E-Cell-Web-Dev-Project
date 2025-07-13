const startups = [
  { name: "EduTech", pitch: "Personalized learning app", category: "EdTech", email: "random@edutech.com", website: "https://www.google.com", },
  { name: "FarmConnect", pitch: "Connecting farmers to buyers", category: "Social", email: "random@farmconnect.in", website: "https://www.google.com" },
  { name: "CodeBolt", pitch: "Collaborative coding platform", category: "Tech", email: "random@codebolt.com", website: "https://www.google.com" },
];


const searchInput   = document.getElementById("searchInput");
const categorySelect= document.getElementById("categorySelect");
const cardContainer = document.getElementById("cardContainer");
const detailView    = document.getElementById("detailView");
const listView      = document.getElementById("listView");
const backBtn       = document.getElementById("backBtn");

const detailName     = document.getElementById("detailName");
const detailPitch    = document.getElementById("detailPitch");
const detailCategory = document.getElementById("detailCategory");
const detailEmail    = document.getElementById("detailEmail");
const detailWebsite  = document.getElementById("detailWebsite");


const submitForm  = document.getElementById("submitForm");
const formMessage = document.getElementById("formMessage");

function showStartups() {
  cardContainer.innerHTML = ""; 

  const keyword = searchInput.value.toLowerCase();
  const selectedCategory = categorySelect.value;

  const filtered = startups.filter(item => {
    const matchText = item.name.toLowerCase().includes(keyword) || item.pitch.toLowerCase().includes(keyword);
    const matchCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchText && matchCategory;
  });

  if (!filtered.length) {
    cardContainer.innerHTML = '<p class="text-center">No startups found.</p>';
    return;
  }

  filtered.forEach(item => {
    const div = document.createElement("div");
    div.className = "bg-white p-4 rounded shadow hover:shadow-md";



    div.innerHTML = `
      <h3 class="font-bold mb-1">${item.name}</h3>
      <p class="mb-1">${item.pitch}</p>
      <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">${item.category}</span>
      <a href="#" class="block text-blue-600 text-sm underline">View</a>
    `;

    div.addEventListener("click", () => showDetails(item));
    div.querySelector("a").addEventListener("click", (e) => {
      e.stopPropagation();
      showDetails(item);
    });

    cardContainer.appendChild(div);
  });
}


function showDetails(item) {
  detailName.textContent     = item.name;
  detailPitch.textContent    = item.pitch;
  detailCategory.textContent = item.category;
  detailEmail.textContent    = item.email;
  detailEmail.href           = `mailto:${item.email}`;
  detailWebsite.textContent  = item.website || "—";
  detailWebsite.href         = item.website || "#";

  listView.classList.add("hidden");
  detailView.classList.remove("hidden");
}


searchInput.addEventListener("input", showStartups);
categorySelect.addEventListener("change", showStartups);
backBtn.addEventListener("click", () => {
  detailView.classList.add("hidden");
  listView.classList.remove("hidden");
});

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (submitForm.checkValidity()) {
    formMessage.classList.remove("hidden");
    submitForm.reset();
    setTimeout(() => formMessage.classList.add("hidden"), 3000);
  } else {
    submitForm.reportValidity();
  }
});

document.addEventListener("DOMContentLoaded", showStartups);
