// Références DOM
const addContributionBtn = document.getElementById("addContributionBtn");
const contributionModal = document.getElementById("contributionModal");
const closeModal = document.querySelector(".close");
const contributionForm = document.getElementById("contributionForm");
const contributionsList = document.getElementById("contributionsList");

// Ouvrir le modal
addContributionBtn.addEventListener("click", () => {
 contributionForm.reset();
 document.getElementById("modalTitle").innerText = "Nouvelle Contribution";
 contributionModal.style.display = "flex";
});

// Fermer le modal
closeModal.addEventListener("click", () => {
 contributionModal.style.display = "none";
});

// Ajouter ou modifier une contribution
contributionForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const id = document.getElementById("contributionId").value;
 const nom_membre = document.getElementById("contributionMember").value;
 const montant = document.getElementById("contributionAmount").value;
 const date_limite = document.getElementById("dueDate").value;

 const contributionData = { nom_membre, montant, date_limite };

 if (id) {
  contributionData.id = id;
  fetch("../php/update_contribution.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(contributionData),
  })
   .then((response) => response.json())
   .then((data) => {
    alert(data.success || data.error);
    loadContributions();
    contributionModal.style.display = "none";
   })
   .catch((error) => console.error("Erreur:", error));
 } else {
  fetch("../php/add_contribution.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(contributionData),
  })
   .then((response) => response.json())
   .then((data) => {
    alert(data.success || data.error);
    loadContributions();
    contributionModal.style.display = "none";
   })
   .catch((error) => console.error("Erreur:", error));
 }
});

// Afficher les contributions
function renderContributions(contributions) {
 contributionsList.innerHTML = contributions
  .map(
   (contribution, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${contribution.nom_membre}</td>
            <td>${contribution.montant}</td>
            <td>${contribution.date_limite}</td>
            <td>
                <button class="bouton" onclick="editContribution(${
                 contribution.id
                })">Modifier</button>
                <button class="bouton" onclick="deleteContribution(${
                 contribution.id
                })">Supprimer</button>
            </td>
        </tr>
    `
  )
  .join("");
}

// Charger les contributions
function loadContributions() {
 fetch("../php/get_contributions.php")
  .then((response) => {
   if (!response.ok) {
    throw new Error("Erreur réseau");
   }
   return response.json(); // Lisez la réponse comme JSON
  })
  .then((data) => {
   console.log("Contributions chargées :", data);
   renderContributions(data);
  })
  .catch((error) => console.error("Erreur:", error));
}

// Modifier une contribution
function editContribution(id) {
 fetch(`../php/get_contribution.php?id=${id}`)
  .then((response) => response.json())
  .then((contribution) => {
   document.getElementById("contributionId").value = contribution.id;
   document.getElementById("contributionMember").value =
    contribution.nom_membre;
   document.getElementById("contributionAmount").value = contribution.montant;
   document.getElementById("dueDate").value = contribution.date_limite;
   document.getElementById("modalTitle").innerText =
    "Modifier une Contribution";
   contributionModal.style.display = "flex";
  })
  .catch((error) => console.error("Erreur:", error));
}

// Supprimer une contribution
function deleteContribution(id) {
 fetch(`../php/delete_contribution.php`, {
  method: "POST",
  headers: {
   "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `id=${id}`,
 })
  .then((response) => response.json())
  .then((data) => {
   alert(data.success || data.error);
   loadContributions();
  })
  .catch((error) => console.error("Erreur:", error));
}

// Charger les contributions au chargement de la page
document.addEventListener("DOMContentLoaded", loadContributions);
