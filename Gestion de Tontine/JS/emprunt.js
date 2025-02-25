// Emprunts (Mock Data)
let loans = [];

// Références DOM
const loansList = document.getElementById('loansList');
const addLoanBtn = document.getElementById('addLoanBtn');
const loanModal = document.getElementById('loanModal');
const closeModal = document.querySelector('.close');
const loanForm = document.getElementById('loanForm');

// Ouvrir le modal
addLoanBtn.addEventListener('click', () => {
    loanForm.reset();
    document.getElementById('modalTitle').innerText = 'Nouvelle Demande d\'Emprunt';
    loanModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    loanModal.style.display = 'none';
});

// Ajouter une nouvelle demande d'emprunt
loanForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const member = document.getElementById('loanMember').value;
    const amount = document.getElementById('loanAmount').value;

    loans.push({
        id: Date.now(),
        member,
        amount,
        status: 'En attente',
        requestDate: new Date().toLocaleDateString(),
    });

    renderLoans();
    loanModal.style.display = 'none';
});

// Afficher les emprunts
function renderLoans() {
    loansList.innerHTML = loans.map((loan, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${loan.member}</td>
            <td>${loan.amount} CAD</td>
            <td>${loan.status}</td>
            <td>${loan.requestDate}</td>
            <td>
                <button class="bouton" onclick="approveLoan(${loan.id})">Valider</button>
                <button class="bouton" onclick="rejectLoan(${loan.id})">Refuser</button>
            </td>
        </tr>
    `).join('');
}

// Valider un emprunt
function approveLoan(id) {
    const loan = loans.find((l) => l.id === id);
    loan.status = 'Approuvé';
    renderLoans();
}

// Refuser un emprunt
function rejectLoan(id) {
    const loan = loans.find((l) => l.id === id);
    loan.status = 'Refusé';
    renderLoans();
}
