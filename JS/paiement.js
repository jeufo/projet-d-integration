// Référence au formulaire et au message de confirmation
const paymentForm = document.getElementById('paymentForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// Simulation de traitement de paiement
paymentForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des données saisies
    const amount = document.getElementById('amount').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const email = document.getElementById('email').value;

    // Simuler une requête de paiement
    console.log(`Montant: ${amount}€, Méthode: ${paymentMethod}, Email: ${email}`);
    alert(`Traitement du paiement de ${amount}€ via ${paymentMethod}...`);

    // Afficher un message de confirmation
    paymentForm.classList.add('hidden'); // Cacher le formulaire
    confirmationMessage.classList.remove('hidden'); // Afficher le message
});
