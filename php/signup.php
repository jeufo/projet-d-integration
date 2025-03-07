<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$role = $data->role;

$sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
$stmt = $database->prepare($sql);
$stmt->bindParam(1, $username);
$stmt->bindParam(2, $email);
$stmt->bindParam(3, $password);
$stmt->bindParam(4, $role);

if ($stmt->execute()) {
    echo "Compte créé avec succès !";
} else {
    echo "Erreur lors de la création du compte : " . $stmt->errorInfo()[2];
}
?>