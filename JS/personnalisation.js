// Référence au formulaire et au message de confirmation
const languageForm = document.getElementById('languageForm');
const confirmationMessage = document.getElementById('confirmationMessage');

// Gestion de la sauvegarde des préférences
languageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Empêche le rechargement de la page

    // Récupération des données saisies
    const language = document.getElementById('language').value;
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const smsNotifications = document.getElementById('smsNotifications').checked;

    // Simuler la sauvegarde des préférences
    console.log(`Langue: ${language}, Email: ${emailNotifications}, SMS: ${smsNotifications}`);
    alert(`Préférences sauvegardées:\nLangue: ${language}\nNotifications Email: ${emailNotifications}\nNotifications SMS: ${smsNotifications}`);

    // Afficher un message de confirmation
    languageForm.classList.add('hidden'); // Cacher le formulaire
    confirmationMessage.classList.remove('hidden'); // Afficher le message
});
