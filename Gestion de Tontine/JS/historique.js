// Données factices pour l'historique
const historyData = [
    { date: '2024-11-01', type: 'contribution', description: 'Cotisation mensuelle', amount: 100 },
    { date: '2024-11-05', type: 'loan', description: 'Demande d’emprunt validée', amount: 500 },
    { date: '2024-11-10', type: 'decision', description: 'Décision de réunion : Allocation de fonds', amount: 0 },
    { date: '2024-11-15', type: 'contribution', description: 'Cotisation supplémentaire', amount: 200 },
    { date: '2024-11-20', type: 'loan', description: 'Remboursement d’emprunt', amount: -100 },
];

// Références DOM
const historyTableBody = document.getElementById('historyTableBody');
const filterType = document.getElementById('filterType');

// Afficher les données dans le tableau
function renderTable(data) {
    historyTableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.date}</td>
            <td>${capitalizeFirstLetter(item.type)}</td>
            <td>${item.description}</td>
            <td>${item.amount.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Filtrer les données en fonction du type
filterType.addEventListener('change', (e) => {
    const selectedType = e.target.value;
    const filteredData = selectedType === 'all' 
        ? historyData 
        : historyData.filter(item => item.type === selectedType);
    renderTable(filteredData);
});

// Fonction utilitaire pour capitaliser la première lettre
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialisation du tableau
renderTable(historyData);
