// Switch between login and sign-up forms
/*document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Validation (in a real application, you would send this to a backend for verification)
    if (email && password) {
        alert('Connexion réussie !');
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});

// Handle sign-up form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    // Validation (in a real application, you would send this data to a backend to create the account)
    if (username && email && password && role) {
        alert(`Compte créé avec succès ! Rôle: ${role}`);
        document.getElementById('signup-form').reset();
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    } else {
        alert('Veuillez remplir tous les champs.');
    }
});*/

// Switch between login and sign-up forms
document.getElementById('show-signup').addEventListener('click', function() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', function() {
    document.getElementById('signup-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
});

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error('Erreur:', error));
});

// Handle sign-up form submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password, role })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if (data === 'Compte créé avec succès !') {
            document.getElementById('signup-form').reset();
            document.getElementById('signup-container').style.display = 'none';
            document.getElementById('login-container').style.display = 'block';
        }
    })
    .catch(error => console.error('Erreur:', error));
});