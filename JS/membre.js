// Membres (Mock Data)
let members = [];

// Références DOM
const membersList = document.getElementById('membersList');
const addMemberBtn = document.getElementById('addMemberBtn');
const memberModal = document.getElementById('memberModal');
const closeModal = document.querySelector('.close');
const memberForm = document.getElementById('memberForm');

// Ouvrir le modal
addMemberBtn.addEventListener('click', () => {
    memberForm.reset();
    document.getElementById('modalTitle').innerText = 'Ajouter un Membre';
    memberModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    memberModal.style.display = 'none';
});

// Ajouter ou modifier un membre
memberForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('memberId').value;
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    if (id) {
        const member = members.find((m) => m.id === parseInt(id));
        Object.assign(member, { name, address, phone, email, role });
    } else {
        members.push({ id: Date.now(), name, address, phone, email, role });
    }

    renderMembers();
    memberModal.style.display = 'none';
});

// Afficher les membres
function renderMembers() {
    membersList.innerHTML = members.map((member, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${member.name}</td>
            <td>${member.address}</td>
            <td>${member.phone}</td>
            <td>${member.email}</td>
            <td>${member.role}</td>
            <td>
                <button class="bouton" onclick="editMember(${member.id})">Modifier</button>
                <button class="bouton" onclick="deleteMember(${member.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

// Modifier un membre
function editMember(id) {
    const member = members.find((m) => m.id === id);
    document.getElementById('memberId').value = member.id;
    document.getElementById('name').value = member.name;
    document.getElementById('address').value = member.address;
    document.getElementById('phone').value = member.phone;
    document.getElementById('email').value = member.email;
    document.getElementById('role').value = member.role;
    document.getElementById('modalTitle').innerText = 'Modifier un Membre';
    memberModal.style.display = 'flex' , memberModal.style.width = '50%';
}

// Supprimer un membre
function deleteMember(id) {
    members = members.filter((m) => m.id !== id);
    renderMembers();
}
