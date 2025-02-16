// Historique des décisions
let decisions = [];

// Références DOM
const decisionsList = document.getElementById('decisionsList');
const addDecisionBtn = document.getElementById('addDecisionBtn');
const decisionModal = document.getElementById('decisionModal');
const closeModal = document.querySelector('.close');
const decisionForm = document.getElementById('decisionForm');

// Ouvrir le modal
addDecisionBtn.addEventListener('click', () => {
    decisionForm.reset();
    decisionModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    decisionModal.style.display = 'none';
});

// Ajouter une décision
decisionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('decisionTitle').value;
    const description = document.getElementById('decisionDescription').value;

    const decision = {
        id: decisions.length + 1,
        date: new Date().toLocaleDateString(),
        title,
        description,
    };

    decisions.push(decision);

    renderDecisions();
    decisionModal.style.display = 'none';
});

// Afficher les décisions
function renderDecisions() {
    decisionsList.innerHTML = decisions.map((decision, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${decision.date}</td>
            <td>${decision.title}</td>
            <td>${decision.description}</td>
        </tr>
    `).join('');
}
