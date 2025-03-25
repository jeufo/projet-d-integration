=<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $resultat = $database->query('SELECT * FROM users');
    while ($user = $resultat->fetch(PDO::FETCH_ASSOC)) {
         // Affichez les données des utilisateurs
    }
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>