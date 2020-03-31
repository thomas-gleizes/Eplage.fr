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
        $sql = "SELECT ID, NAME, CITY, ADRESS, ZIPCODE FROM tbl_business WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val LIMIT 10";
        $values['val'] = $val . '%';
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        foreach ($tab as $item){
            $sql = "SELECT src FROM tbl_picture WHERE ID_plage = :ID_plage";
            $valSrc['ID_plage'] = $item['ID'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($valSrc);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tabsrc = $req_prep->fetchAll();
            $src = "";
            foreach ($tabsrc as $i){
               var_dump($i);
            }
        }






        echo "<br><br> ---- END ---- <br>";
    }


}
Model::Init();