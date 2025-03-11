<?php
include 'db.php';

$id = $_GET['id'];

$sql = "UPDATE emprunts SET statut = 'Payé' WHERE id = ?";
$stmt = $database->prepare($sql);
$stmt->bindParam(1, $id);

if ($stmt->execute()) {
    echo "Emprunt marqué comme payé avec succès !";
} else {
    echo "Erreur lors de la mise à jour de l'emprunt : " . $stmt->errorInfo()[2];
}
?>