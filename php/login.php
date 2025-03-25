<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $email = $data['email'];
    $password = $data['password'];

    $stmt = $database->prepare('SELECT * FROM users WHERE email = :email');
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if (password_verify($password, $user['password'])) {
            // Connexion réussie, redirection vers le tableau de bord
            echo json_encode(['success' => true, 'redirect' => '../HTML/dashbord.html']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Mot de passe incorrect.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Email incorrect.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $e->getMessage()]);
}
?>