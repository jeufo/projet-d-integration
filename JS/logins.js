document
 .getElementById("login-form")
 .addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  fetch("../php/login.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ email, password }),
  })
   .then((response) => response.text())
   .then((data) => {
    console.log("Réponse du serveur :", data); // Affiche la réponse dans la console
    if (data === "Connexion réussie !") {
     window.location.href = "/../HTML/dashbord.html";
    } else {
     alert(data); // Affiche un message d'erreur
    }
   })
   .catch((error) => console.error("Erreur:", error));
 });
