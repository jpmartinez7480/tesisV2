<?php

require '../config/databaseConnection.php';

class Signal{
    
    function construct(){}
    
    public static function getSignals(){
        try{
            $pdo = databaseConnection::getInstance()->getDB();
            $query = "SELECT S.name_signal,S.type_signal,S.duration,S.frecuency,S.date_upload FROM Signals S";
            $exec_query = $pdo ->prepare($query);
            $exec_query->execute();
            return $exec_query->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(PDOException $e){
            echo $e->getMessage();
            return $e->getMessage();
        }
    }

    public static function postSignal($object){
        try{
            $id_user = self::getID($object);
            if($id_user){
                $pdo = databaseConnection::getInstance()->getDB();
                $query = "INSERT INTO Signals (name_signal,type_signal,duration,frecuency,date_upload,upload_for) values (:name_signal,:type_signal,:duration, :frecuency, :date_upload, :upload_for)";
                $exec_query = $pdo -> prepare($query);
                $exec_query->bindParam(':name_signal',$object['name_signal']);
                $exec_query->bindParam(':type_signal',$object['type_signal']);
                $exec_query->bindParam(':duration',$object['duration']);
                $exec_query->bindParam(':frecuency',$object['frecuency']);
                $exec_query->bindParam(':date_upload',$object['date_upload']);
                $exec_query->bindParam(':upload_for',$id_user[0]['id']);
                $exec_query->execute();
                return $id_user;
            }
            else{
                return $id_user;
            }
        }
        catch(PDOEXception $e){
            return $e->getMessage();
        }

    }

    public static function getID($object){
        try{
            $pdo = databaseConnection::getInstance()->getDB();
            $query = "SELECT U.id,U.name, U.email, U.password_crypth FROM User U WHERE :email=U.email and :password = U.password_login";
            $exec_query = $pdo ->prepare($query);
            $exec_query->bindParam(':email',$object['email']);
            $exec_query->bindParam(':password',$object['password']);
            $exec_query->execute();
            return $exec_query->fetchAll(PDO::FETCH_ASSOC);
        }
        catch(PDOException $e){
            echo $e->getMessage();
            return $e->getMessage();
        }
    }
}