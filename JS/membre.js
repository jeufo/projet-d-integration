// Références DOM
const membersList = document.getElementById("membersList");
const addMemberBtn = document.getElementById("addMemberBtn");
const memberModal = document.getElementById("memberModal");
const closeModal = document.querySelector(".close");
const memberForm = document.getElementById("memberForm");

// Ouvrir le modal
addMemberBtn.addEventListener("click", () => {
 memberForm.reset();
 document.getElementById("modalTitle").innerText = "Ajouter un Membre";
 memberModal.style.display = "flex";
});

// Fermer le modal
closeModal.addEventListener("click", () => {
 memberModal.style.display = "none";
});

// Ajouter ou modifier un membre
memberForm.addEventListener("submit", (e) => {
 e.preventDefault();
 const id = document.getElementById("memberId").value;
 const nom = document.getElementById("name").value;
 const adresse = document.getElementById("address").value;
 const telephone = document.getElementById("phone").value;
 const email = document.getElementById("email").value;
 const role = document.getElementById("role").value;

 const memberData = { nom, adresse, telephone, email, role };

 if (id) {
  memberData.id = id;
  fetch("../php/update_member.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(memberData),
  })
   .then((response) => response.json())
   .then((data) => {
    alert(data.success || data.error);
    loadMembers();
    memberModal.style.display = "none";
   })
   .catch((error) => console.error("Erreur:", error));
 } else {
  fetch("../php/add_member.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(memberData),
  })
   .then((response) => response.json())
   .then((data) => {
    alert(data.success || data.error);
    loadMembers();
    memberModal.style.display = "none";
   })
   .catch((error) => console.error("Erreur:", error));
 }
});

// Afficher les membres
function renderMembers(members) {
 membersList.innerHTML = members
  .map(
   (member, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${member.nom}</td>
            <td>${member.adresse}</td>
            <td>${member.telephone}</td>
            <td>${member.email}</td>
            <td>${member.role}</td>
            <td>
                <button class="bouton" onclick="editMember(${
                 member.id
                })">Modifier</button>
                <button class="bouton" onclick="deleteMember(${
                 member.id
                })">Supprimer</button>
            </td>
        </tr>
    `
  )
  .join("");
}

// Charger les membres
function loadMembers() {
 fetch("../php/get_members.php")
  .then((response) => {
   if (!response.ok) {
    throw new Error("Erreur réseau");
   }
   return response.json(); // Lisez la réponse comme JSON
  })
  .then((data) => {
   console.log("Membres chargés :", data);
   renderMembers(data);
  })
  .catch((error) => console.error("Erreur:", error));
}

// Modifier un membre
function editMember(id) {
 fetch(`../php/get_member.php?id=${id}`)
  .then((response) => response.json())
  .then((member) => {
   document.getElementById("memberId").value = member.id;
   document.getElementById("name").value = member.nom;
   document.getElementById("address").value = member.adresse;
   document.getElementById("phone").value = member.telephone;
   document.getElementById("email").value = member.email;
   document.getElementById("role").value = member.role;
   document.getElementById("modalTitle").innerText = "Modifier un Membre";
   memberModal.style.display = "flex";
  })
  .catch((error) => console.error("Erreur:", error));
}

// Supprimer un membre
function deleteMember(id) {
 fetch(`../php/delete_member.php`, {
  method: "POST",
  headers: {
   "Content-Type": "application/x-www-form-urlencoded",
  },
  body: `id=${id}`,
 })
  .then((response) => response.json())
  .then((data) => {
   alert(data.success || data.error);
   loadMembers();
  })
  .catch((error) => console.error("Erreur:", error));
}

// Charger les membres au chargement de la page
document.addEventListener("DOMContentLoaded", loadMembers);
