// Données factices
const dashboardData = {
    totalContributions: 100000,
    totalLoans: 50000,
    totalMeetings: 10,
};

// Références DOM
const totalContributions = document.getElementById('totalContributions');
const totalLoans = document.getElementById('totalLoans');
const totalMeetings = document.getElementById('totalMeetings');
const reportForm = document.getElementById('reportForm');
const reportOutput = document.getElementById('reportOutput');

// Mettre à jour les indicateurs
function updateDashboard() {
    totalContributions.textContent = `${dashboardData.totalContributions} CAD`;
    totalLoans.textContent = `${dashboardData.totalLoans} CAD`;
    totalMeetings.textContent = `${dashboardData.totalMeetings}`;
}

// Générer un rapport
reportForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const startDate = document.getElementById('reportStart').value;
    const endDate = document.getElementById('reportEnd').value;

    if (startDate && endDate) {
        reportOutput.innerHTML = `
            <h3>Rapport Généré</h3>
            <p>Période : ${startDate} - ${endDate}</p>
            <ul>
                <li>Total Contributions : ${dashboardData.totalContributions} CAD</li>
                <li>Total Emprunts : ${dashboardData.totalLoans} CAD</li>
                <li>Réunions Planifiées : ${dashboardData.totalMeetings}</li>
            </ul>
        `;
    } else {
        reportOutput.textContent = 'Veuillez sélectionner des dates valides.';
    }
});

// Initialiser le tableau de bord
updateDashboard();
