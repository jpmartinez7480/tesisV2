<?php

require_once 'mysql_login.php';

class databaseConnection{
    private static $db = null;
    private static $pdo;

    final private function _construct(){
        try{
            self::getDB();
        }
        catch(PDOException $e){
            return $e->getMessage();
        }

    }

    public static function getInstance(){
        if(self::$db === null)
            self::$db = new self();
        return self::$db;
    }

    public function getDB(){
        if(self::$pdo == null){
            self::$pdo = new PDO(
                'mysql:dbname=' . DATABASE .
                ';host=' . HOSTNAME .';',
                USERNAME,
                PASSWORD,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") 
            );
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        }
        return self::$pdo;
    }

    final protected function _clone(){}
    
        
}

?>