<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $database->prepare('UPDATE loans SET membre_id = :membre_id, montant = :montant, date_emprunt = :date_emprunt WHERE id = :id');
    $stmt->bindParam(':membre_id', $data['membre_id']);
    $stmt->bindParam(':montant', $data['montant']);
    $stmt->bindParam(':date_emprunt', $data['date_emprunt']);
    $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode(['success' => 'Loan updated successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>