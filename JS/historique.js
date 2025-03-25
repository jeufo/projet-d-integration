// Données factices pour l'historique
const historyData = [
 {
  date: "2024-11-01",
  type: "contribution",
  description: "Cotisation mensuelle",
  amount: 100,
 },
 {
  date: "2024-11-05",
  type: "loan",
  description: "Demande d’emprunt validée",
  amount: 500,
 },
 {
  date: "2024-11-10",
  type: "decision",
  description: "Décision de réunion : Allocation de fonds",
  amount: 0,
 },
 {
  date: "2024-11-15",
  type: "contribution",
  description: "Cotisation supplémentaire",
  amount: 200,
 },
 {
  date: "2024-11-20",
  type: "loan",
  description: "Remboursement d’emprunt",
  amount: -100,
 },
];

// Références DOM
const historyTableBody = document.getElementById("historyTableBody");
const filterType = document.getElementById("filterType");

// Afficher les données dans le tableau
function renderTable(data) {
 historyTableBody.innerHTML = data
  .map(
   (item) => `
        <tr>
            <td>${item.date}</td>
            <td>${capitalizeFirstLetter(item.type)}</td>
            <td>${item.description}</td>
            <td>${item.amount.toFixed(2)}</td>
        </tr>
    `
  )
  .join("");
}

// Filtrer les données en fonction du type
filterType.addEventListener("change", (e) => {
 const selectedType = e.target.value;
 const filteredData =
  selectedType === "all"
   ? historyData
   : historyData.filter((item) => item.type === selectedType);
 renderTable(filteredData);
});

// Fonction utilitaire pour capitaliser la première lettre
function capitalizeFirstLetter(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialisation du tableau
renderTable(historyData);

document
 .getElementById("downloadCsvBtn")
 .addEventListener("click", function () {
  const rows = [["Date", "Type", "Description", "Montant (€)"]];

  const tableRows = document.querySelectorAll("#historyTableBody tr");
  tableRows.forEach((row) => {
   const cells = row.querySelectorAll("td");
   const rowData = Array.from(cells).map((cell) => cell.textContent);
   rows.push(rowData);
  });

  let csvContent =
   "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "historique.csv");
  document.body.appendChild(link);

  link.click();
  document.body.removeChild(link);
 });

// filepath: /c:/Users/Ibrahim/Downloads/Gestion de Tontine maquette/Gestion de Tontine/JS/historique.js

document.addEventListener("DOMContentLoaded", function () {
 const historyData = [
  {
   date: "2025-02-18",
   type: "Contribution",
   description: "Contribution mensuelle",
   amount: 100,
  },
  {
   date: "2025-02-17",
   type: "Emprunt",
   description: "Emprunt pour projet",
   amount: 500,
  },
  // Ajoutez d'autres données ici
 ];

 const historyTableBody = document.getElementById("historyTableBody");
 historyData.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.type}</td>
            <td>${item.description}</td>
            <td>${item.amount}</td>
        `;
  historyTableBody.appendChild(row);
 });
});
