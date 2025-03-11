// Références DOM
const addLoanBtn = document.getElementById("addLoanBtn");
const loanModal = document.getElementById("loanModal");
const closeModal = document.querySelector(".close");
const loanForm = document.getElementById("loanForm");
const loansList = document.getElementById("loansList");

// Ouvrir le modal
addLoanBtn.addEventListener("click", () => {
 loanForm.reset();
 document.getElementById("modalTitle").innerText = "Nouvelle Demande d'Emprunt";
 loanModal.style.display = "flex";
});

// Fermer le modal
closeModal.addEventListener("click", () => {
 loanModal.style.display = "none";
});

// Ajouter ou modifier un emprunt
loanForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const id = document.getElementById("loanId").value;
 const membre_id = document.getElementById("loanMemberId").value;
 const montant = document.getElementById("loanAmount").value;
 const date_emprunt = document.getElementById("dueDate").value;

 const loanData = { membre_id, montant, date_emprunt };

 if (id) {
  loanData.id = id;
  fetch("../php/update_loan.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(loanData),
  })
   .then((response) => response.json())
   .then((data) => {
    alert(data.success || data.error);
    loadLoans();
    loanModal.style.display = "none";
   })
   .catch((error) => console.error("Erreur:", error));
 } else {
  fetch("../php/add_loan.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(loanData),
  })
   .then((response) => response.json())
   .then((data) => {
    alert(data.success || data.error);
    loadLoans();
    loanModal.style.display = "none";
   })
   .catch((error) => console.error("Erreur:", error));
 }
});

// Afficher les emprunts
function renderLoans(loans) {
 loansList.innerHTML = loans
  .map(
   (loan, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${loan.membre_id}</td>
            <td>${loan.montant}</td>
            <td>${loan.statut}</td>
            <td>${loan.date_emprunt}</td>
            <td>
                <button class="bouton" onclick="editLoan(${
                 loan.id
                })">Modifier</button>
                <button class="bouton" onclick="deleteLoan(${
                 loan.id
                })">Supprimer</button>
            </td>
        </tr>
    `
  )
  .join("");
}

// Charger les emprunts
function loadLoans() {
 fetch("../php/get_loans.php")
  .then((response) => {
   if (!response.ok) {
    throw new Error("Erreur réseau");
   }
   return response.json(); // Lisez la réponse comme JSON
  })
  .then((data) => {
   console.log("Emprunts chargés :", data);
   renderLoans(data);
  })
  .catch((error) => console.error("Erreur:", error));
}

// Modifier un emprunt
function editLoan(id) {
 fetch(`../php/get_loan.php?id=${id}`)
  .then((response) => response.json())
  .then((loan) => {
   document.getElementById("loanId").value = loan.id;
   document.getElementById("loanMemberId").value = loan.membre_id;
   document.getElementById("loanAmount").value = loan.montant;
   document.getElementById("dueDate").value = loan.date_emprunt;
   document.getElementById("modalTitle").innerText = "Modifier un Emprunt";
   loanModal.style.display = "flex";
  })
  .catch((error) => console.error("Erreur:", error));
}

// Supprimer un emprunt
function deleteLoan(id) {
 fetch(`../php/delete_loan.php`, {
  method: "POST",
  headers: {
   "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `id=${id}`,
 })
  .then((response) => response.json())
  .then((data) => {
   alert(data.success || data.error);
   loadLoans();
  })
  .catch((error) => console.error("Erreur:", error));
}

// Charger les emprunts au chargement de la page
document.addEventListener("DOMContentLoaded", loadLoans);
