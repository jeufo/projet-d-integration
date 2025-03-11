<?php
include 'db.php';

$type = isset($_GET['type']) ? $_GET['type'] : 'all';

if ($type === 'all') {
    $sql = "SELECT h.date, h.type, m.nom, h.montant
            FROM historique h
            JOIN membres m ON h.membre_id = m.id";
} else {
    $sql = "SELECT h.date, h.type, m.nom, h.montant
            FROM historique h
            JOIN membres m ON h.membre_id = m.id
            WHERE h.type = ?";
}

$stmt = $database->prepare($sql);

if ($type !== 'all') {
    $stmt->bindParam(1, $type);
}

$stmt->execute();
$history = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($history);
?>