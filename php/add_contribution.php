<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $database->prepare('INSERT INTO contributions (nom_membre, montant, date_limite) VALUES (:nom_membre, :montant, :date_limite)');
    $stmt->bindParam(':nom_membre', $data['nom_membre']);
    $stmt->bindParam(':montant', $data['montant']);
    $stmt->bindParam(':date_limite', $data['date_limite']);
    $stmt->execute();

    echo json_encode(['success' => 'Contribution added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>