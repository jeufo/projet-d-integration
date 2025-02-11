// Contributions (Mock Data)
let contributions = [];

// Références DOM
const contributionsList = document.getElementById('contributionsList');
const addContributionBtn = document.getElementById('addContributionBtn');
const contributionModal = document.getElementById('contributionModal');
const closeModal = document.querySelector('.close');
const contributionForm = document.getElementById('contributionForm');

// Ouvrir le modal
addContributionBtn.addEventListener('click', () => {
    contributionForm.reset();
    document.getElementById('modalTitle').innerText = 'Nouvelle Contribution';
    contributionModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    contributionModal.style.display = 'none';
});

// Ajouter une nouvelle contribution
contributionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const member = document.getElementById('member').value;
    const amount = document.getElementById('amount').value;
    const dueDate = document.getElementById('dueDate').value;

    contributions.push({
        id: Date.now(),
        member,
        amount,
        dueDate,
        status: 'En attente',
    });

    renderContributions();
    contributionModal.style.display = 'none';
});

// Afficher les contributions
function renderContributions() {
    contributionsList.innerHTML = contributions.map((contribution, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${contribution.member}</td>
            <td>${contribution.amount} CAD</td>
            <td>${contribution.dueDate}</td>
            <td>${contribution.status}</td>
            <td>
                <button class="btn" onclick="markPaid(${contribution.id})">Marquer comme payé</button>
            </td>
        </tr>
    `).join('');
}

// Marquer une contribution comme payée
function markPaid(id) {
    const contribution = contributions.find((c) => c.id === id);
    contribution.status = 'Payé';
    renderContributions();
}
