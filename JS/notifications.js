// Liste des notifications
let notifications = [];

// Références DOM
const notificationsList = document.getElementById('notificationsList');
const sendNotificationBtn = document.getElementById('sendNotificationBtn');
const notificationModal = document.getElementById('notificationModal');
const closeModal = document.querySelector('.close');
const notificationForm = document.getElementById('notificationForm');

// Ouvrir le modal
sendNotificationBtn.addEventListener('click', () => {
    notificationForm.reset();
    notificationModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    notificationModal.style.display = 'none';
});

// Ajouter une notification
notificationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('notificationTitle').value;
    const message = document.getElementById('notificationMessage').value;

    const notification = {
        id: notifications.length + 1,
        date: new Date().toLocaleString(),
        title,
        message,
    };

    notifications.push(notification);

    renderNotifications();
    notificationModal.style.display = 'none';
});

// Afficher les notifications
function renderNotifications() {
    notificationsList.innerHTML = notifications.map(notification => `
        <li>
            <h3>${notification.title}</h3>
            <p>${notification.message}</p>
            <span class="timestamp">${notification.date}</span>
        </li>
    `).join('');
}
