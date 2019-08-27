<?php

require '../config/databaseConnection.php';

try{
    $pdo = databaseConnection::getInstance()->getDB();
    return $pdo;
}
    catch(PDOException $e){
    echo $e->getMessage();
    return $e->getMessage();
    }
