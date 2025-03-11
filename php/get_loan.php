<?php
include 'db.php';

$id = $_GET['id'];

$sql = "SELECT * FROM emprunts WHERE id = ?";
$stmt = $database->prepare($sql);
$stmt->bindParam(1, $id);
$stmt->execute();
$loan = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($loan);
?>