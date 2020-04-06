<?php

require_once ('../config/Conf.php');

class Model{
    public static $pdo;

    public static function  Init(){
        try {
            $hostname=Conf::getHostname();
            $login=Conf::getLogin();
            $database=Conf::getDatabase();
            $password=Conf::getPassword();
            self::$pdo = new PDO("mysql:host=$hostname;dbname=$database", $login, $password,array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            self::$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            if (Conf::getDebug()) {
                echo $e->getMessage(); // affiche un message d'erreur
            }
            die();
        }
    }

    public static function selectPlage ($val){
        $sql = "SELECT b.ID, NAME, CITY, ADRESS, ZIPCODE, src FROM tbl_business b JOIN tbl_picture p ON b.ID = p.ID_plage WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val GROUP BY (b.ID) LIMIT 8";
        $values['val'] = $val . '%';
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }

    public static function selectPlageWithFilter ($val, $filter){
        $filter = explode(',', $filter);

    }
    


    public static function selectRandomPlage (){
        $sql = "SELECT b.ID, NAME, CITY, ADRESS, ZIPCODE, src FROM tbl_business b JOIN tbl_picture p ON b.ID = p.ID_plage GROUP BY (b.ID) ORDER BY RAND() LIMIT 8;";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }

    public static function SQL ($sql){
        echo $sql . "<br><br>";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        foreach ($tab as $item) {
            echo "<br><br>";
            var_dump($item);
        }
    }

}
Model::Init();