// Simuler l'intégration de la visioconférence
function joinMeeting() {
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = "https://meet.google.com";
    alert("Vous avez rejoint la réunion !");
}

// Gestion du chat
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

// Ajouter un message au chat
function addMessage(content, isSelf = true) {
    const message = document.createElement('div');
    message.className = `message ${isSelf ? 'self' : ''}`;
    message.textContent = content;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroller automatiquement vers le bas
}

// Soumettre un message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageContent = chatInput.value;
    if (messageContent.trim()) {
        addMessage(messageContent); // Ajouter le message de l'utilisateur
        chatInput.value = ''; // Réinitialiser le champ d'entrée

        // Simuler une réponse automatique
        setTimeout(() => {
            addMessage("Réponse automatique du système", false);
        }, 1000);
    }
});
