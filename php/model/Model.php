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
        $sql = "SELECT b.ID, NAME, CITY, ZIPCODE, CITY, FLEACHID, src FROM tbl_businesses b JOIN tbl_pictures p ON b.ID = p.BID WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val GROUP BY (b.ID) LIMIT 8";
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

        foreach ($listFilter as $filter){
            $sql = "SELECT BID FROM tbl_service_buisnesse WHERE SID = :filter";
            $value['filter'] = $filter;
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tab[$filter] = $req_prep->fetchAll();
        }

        $res = [];
        for ($i = 0; $i < sizeof($tab[$listFilter[0]]); $i++){
            $res[$i] = $tab[$listFilter[0]][$i]['BID'];
        }

        $first = true;
        foreach ($tab as $item){
            if ($first) {
                $first = false;
            } else {
                $res = utils::reduce($res, utils::parse($item, 'BID'));
            }
        }

        if (!empty($res)){
            $sql = "SELECT ID FROM tbl_businesses WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val GROUP BY (ID)";
            $values['val'] = $val . '%';
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tabID = $req_prep->fetchAll();
            if (!empty($tabID)){
                $res = utils::reduce($res, utils::parse($tabID, 'ID'));
                if (!empty($res)){
                    $values = [];
                    $sql = "SELECT b.ID, NAME, CITY, ADRESS, ZIPCODE, FLEACHID, src FROM tbl_businesses b JOIN tbl_pictures p ON b.ID = p.BID WHERE ";
                    for ($i = 0; $i < sizeof($res); $i++) {
                        $values['BID' . $i] = $res[$i];
                        $sql = $sql . " ID = :BID" . $i;
                        if ($i + 1 != sizeof($res)){
                            $sql = $sql . " OR ";
                        }
                    }
                    $sql = $sql . " GROUP BY (b.ID) LIMIT 8;";
                    $req_prep = self::$pdo->prepare($sql);
                    $req_prep->execute($values);
                    $req_prep->setFetchMode(PDO::FETCH_ASSOC);
                    $tab = $req_prep->fetchAll();
                }
            } else {
                $tab = [];
            }
        } else {
            $tab = [];
        }
        //echo "<br><br> --------- END ------------";
        return $tab;
    }

    public static function selectAllFilter(){
        $sql = "SELECT * FROM tbl_services";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }


    public static function selectGeographie ($val){

        $sql = "SELECT d.ID FROM tbl_businesses b JOIN departement d ON SUBSTR(ZIPCODE, 1, 2) = d.id_departement WHERE departement LIKE :val GROUP BY (d.ID);";
        $value['val'] = "%" . $val . "%";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();

        if (empty($tab)) return [];

        $i = 0;
        foreach ($tab as $item){
            $sql = "SELECT count(d.ID) as NBID, departement as depa, d.id_departement as IDdepa FROM tbl_businesses b JOIN departement d ON SUBSTR(ZIPCODE, 1, 2) = d.id_departement WHERE d.ID = :ID";
            $values['ID'] = $item['ID'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $res[$i] = $req_prep->fetchAll();
            $i++;
        }
        return $res;
    }

    public static function selectLocal($val){
        $sql = "SELECT CP FROM tbl_businesses b JOIN cp_autocomplete a ON a.CP = ZIPCODE WHERE VILLE LIKE :val OR CP LIkE :val GROUP BY (ZIPCODE)";
        $value['val'] = "%" . $val . "%";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        if(empty($tab)) return [];
        $i = 0;
        foreach ($tab as $item){
            $sql = "SELECT COUNT(b.ID) AS NBID, CITY, ZIPCODE FROM tbl_businesses b WHERE ZIPCODE = :CP GROUP BY (ZIPCODE);";
            $values['CP'] = $item['CP'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $res[$i] = $req_prep->fetchAll();
            $i++;
        }
        return $res;
    }

    public static function selectEtablissements ($val){
        $sql = "SELECT ID, NAME, CITY FROM tbl_businesses WHERE NAME LIKE :val;";
        $values['val'] = $val . "%";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }

    public static function selectPlageProxi($lONG, $LAT){

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