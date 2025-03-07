document
 .getElementById("signup-form")
 .addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  const role = document.getElementById("signup-role").value;

  fetch("../php/signup.php", {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify({ username, email, password, role }),
  })
   .then((response) => response.text())
   .then((data) => {
    alert(data);
    if (data === "Compte créé avec succès !") {
     document.getElementById("signup-form").reset();
     document.getElementById("signup-container").style.display = "none";
     document.getElementById("login-container").style.display = "block";
    }
   })
   .catch((error) => console.error("Erreur:", error));
 });
