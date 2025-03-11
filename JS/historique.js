// Références DOM
const historyTableBody = document.getElementById("historyTableBody");
const filterType = document.getElementById("filterType");

// Fonction pour récupérer les données de l'historique depuis le serveur
function fetchHistoryData(type = "all") {
 fetch(`../php/get_history.php?type=${type}`)
  .then((response) => response.json())
  .then((data) => {
   renderTable(data);
  })
  .catch((error) => console.error("Erreur:", error));
}

// Afficher les données dans le tableau
function renderTable(data) {
 historyTableBody.innerHTML = data
  .map(
   (item) => `
        <tr>
            <td>${item.date}</td>
            <td>${capitalizeFirstLetter(item.type)}</td>
            <td>${item.nom}</td>
            <td>${item.montant.toFixed(2)}</td>
        </tr>
    `
  )
  .join("");
}

// Filtrer les données en fonction du type
filterType.addEventListener("change", (e) => {
 const selectedType = e.target.value;
 fetchHistoryData(selectedType);
});

// Fonction utilitaire pour capitaliser la première lettre
function capitalizeFirstLetter(string) {
 return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialisation du tableau
fetchHistoryData();

document
 .getElementById("downloadCsvBtn")
 .addEventListener("click", function () {
  const rows = [["Date", "Type", "Nom", "Montant (€)"]];

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
