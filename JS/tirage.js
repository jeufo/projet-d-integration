// Mock data des membres
const members = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

// Références DOM
const drawsList = document.getElementById('drawsList');
const startDrawBtn = document.getElementById('startDrawBtn');
const drawModal = document.getElementById('drawModal');
const closeModal = document.querySelector('.close');
const criteriaForm = document.getElementById('criteriaForm');

// Historique des tirages
let draws = [];

// Ouvrir le modal
startDrawBtn.addEventListener('click', () => {
    drawModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    drawModal.style.display = 'none';
});

// Lancer un tirage
criteriaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Récupérer les critères
    const criteria = document.getElementById('criteriaInput').value;

    // Sélectionner un gagnant aléatoire
    const winner = members[Math.floor(Math.random() * members.length)];

    // Ajouter le tirage à l'historique
    const draw = {
        id: draws.length + 1,
        date: new Date().toLocaleDateString(),
        criteria,
        winner,
    };

    draws.push(draw);

    // Rafraîchir l'affichage des tirages
    renderDraws();

    // Fermer le modal
    drawModal.style.display = 'none';
});

// Afficher les tirages
function renderDraws() {
    drawsList.innerHTML = draws.map((draw, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${draw.date}</td>
            <td>${draw.criteria}</td>
            <td>${draw.winner}</td>
        </tr>
    `).join('');
}
