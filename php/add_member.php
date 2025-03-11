<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $database->prepare('INSERT INTO members (nom, adresse, telephone, email, role) VALUES (:nom, :adresse, :telephone, :email, :role)');
    $stmt->bindParam(':nom', $data['nom']);
    $stmt->bindParam(':adresse', $data['adresse']);
    $stmt->bindParam(':telephone', $data['telephone']);
    $stmt->bindParam(':email', $data['email']);
    $stmt->bindParam(':role', $data['role']);
    $stmt->execute();

    echo json_encode(['success' => 'Member added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>