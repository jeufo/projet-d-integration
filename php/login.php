<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

if ($data === null) {
    echo "Erreur : Données JSON invalides.";
    exit;
}

$email = $data->email;
$password = $data->password;

if (empty($email) || empty($password)) {
    echo "Erreur : Email ou mot de passe manquant.";
    exit;
}

$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $database->prepare($sql);
$stmt->bindParam(1, $email);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo "Connexion réussie !";
} else {
    echo "Email ou mot de passe incorrect";
}
?>