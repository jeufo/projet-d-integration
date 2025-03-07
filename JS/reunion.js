// Réunions (Mock Data)
let meetings = [];

// Références DOM
const meetingsList = document.getElementById('meetingsList');
const addMeetingBtn = document.getElementById('addMeetingBtn');
const meetingModal = document.getElementById('meetingModal');
const closeModal = document.querySelector('.close');
const meetingForm = document.getElementById('meetingForm');

// Ouvrir le modal
addMeetingBtn.addEventListener('click', () => {
    meetingForm.reset();
    document.getElementById('modalTitle').innerText = 'Planifier une Réunion';
    meetingModal.style.display = 'flex';
});

// Fermer le modal
closeModal.addEventListener('click', () => {
    meetingModal.style.display = 'none';
});

// Ajouter une réunion
meetingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('meetingName').value;
    const date = document.getElementById('meetingDate').value;
    const time = document.getElementById('meetingTime').value;

    const meetingLink = `https://meeting-app.com/join/${Date.now()}`;

    meetings.push({
        id: Date.now(),
        name,
        date,
        time,
        link: meetingLink,
    });

    renderMeetings();
    meetingModal.style.display = 'none';
});

// Afficher les réunions
function renderMeetings() {
    meetingsList.innerHTML = meetings.map((meeting, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${meeting.name}</td>
            <td>${meeting.date}</td>
            <td>${meeting.time}</td>
            <td><a href="${meeting.link}" target="_blank">Rejoindre</a></td>
        </tr>
    `).join('');
}
