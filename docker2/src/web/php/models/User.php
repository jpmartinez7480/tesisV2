<?php

require '../config/databaseConnection.php';


class User{
    
    function construct(){}
    
    public static function getUser($object){
        try{
            $pdo = databaseConnection::getInstance()->getDB();
            $query = "SELECT U.id,U.name FROM User U WHERE :email=U.email and :password = U.password_login";
            $exec_query = $pdo ->prepare($query);
            $exec_query->bindParam(':email',$object['email']);
            $exec_query->bindParam(':password',$object['password']);
            $exec_query->execute();
            return $exec_query->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(PDOException $e){
            echo $e->getMessage();
            return false;
        }
    }

    public static function postUser($object){
        try{
            $pdo = databaseConnection::getInstance()->getDB();
            $query = "INSERT INTO User (email,name,password_login,password_crypth) values (:email,:name,:password_login,:password_crypth)";
            $exec_query = $pdo -> prepare($query);
            $exec_query->bindParam(':email',$object['email']);
            $exec_query->bindParam(':name',$object['name']);
            $exec_query->bindParam(':password_login',$object['password_login']);
            $exec_query->bindParam(':password_crypth',$object['password_crypth']);
            $exec_query->execute();
            return true;
        }
        catch(PDOEXception $e){
            return $e->getMessage();
        }
    }


}