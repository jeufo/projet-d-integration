<?php
try {
    $database = new PDO('mysql:host=localhost;dbname=tontine', 'root', '');
    $database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $resultat = $database->query('SELECT * FROM users');
    while ($user = $resultat->fetch(PDO::FETCH_ASSOC)) {
        
       
    }
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>