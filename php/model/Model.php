<?php

require_once ('../config/Conf.php');
require_once ('../lib/utils.php');

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
        $sql = "SELECT b.ID, NAME, CITY, ADRESS, ZIPCODE, src FROM tbl_businesses b JOIN tbl_pictures p ON b.ID = p.BID WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val GROUP BY (b.ID) LIMIT 8";
        $values['val'] = $val . '%';
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }

    public static function selectPlageWithFilter ($val, $listFilter){
        $listFilter = explode(',', $listFilter);
        $tab = [];
        foreach ($listFilter as $item) {
            echo "filter : " . $item . "<br>";
        }
        echo "<br> tab : ";



        foreach ($listFilter as $filter){
            $sql = "SELECT BID FROM tbl_service_buisnesse WHERE SID = :filter";
            $value['filter'] = $filter;
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tab[$filter] = $req_prep->fetchAll();
        }
        var_dump($tab);
        echo "<br><br>";

        foreach ($tab as $item){
            var_dump($item);
            echo "<br>";
        }

        $res = [];

        for ($i = 0; $i < sizeof($tab[$listFilter[0]]); $i++){
            $res[$i] = $tab[$listFilter[0]][$i]['BID'];
            echo $i . " : " . $res[$i] . "<br>";
        }
        echo "<br><br>";





        echo "<br><br>";
        var_dump($res);
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