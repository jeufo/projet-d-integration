<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $database->prepare('UPDATE contributions SET nom_membre = :nom_membre, montant = :montant, date_limite = :date_limite WHERE id = :id');
    $stmt->bindParam(':nom_membre', $data['nom_membre']);
    $stmt->bindParam(':montant', $data['montant']);
    $stmt->bindParam(':date_limite', $data['date_limite']);
    $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['success' => 'Contribution updated successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>