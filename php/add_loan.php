<?php
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $stmt = $database->prepare('INSERT INTO loans (membre_id, montant, date_emprunt) VALUES (:membre_id, :montant, :date_emprunt)');
    $stmt->bindParam(':membre_id', $data['membre_id']);
    $stmt->bindParam(':montant', $data['montant']);
    $stmt->bindParam(':date_emprunt', $data['date_emprunt']);
    $stmt->execute();

    echo json_encode(['success' => 'Loan added successfully']);
} catch (PDOException $e) {
    echo json_encode(['error' => 'Connection failed: ' . $e->getMessage()]);
}
?>