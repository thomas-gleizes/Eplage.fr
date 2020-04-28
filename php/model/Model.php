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

    public static function selectPlages ($val, $index){

        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses WHERE (NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val)";
        $values['val'] = '%' . $val . '%';
        if  ($index != 0){
            $sql = $sql . " AND ID > :index";
            $values['index'] = $index;
        }
        $sql = $sql . " ORDER BY (ID) LIMIT 8";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        if (empty($tab)) return [];
        $i = 0;
        foreach ($tab as $item) {
            $sql = "SELECT src FROM tbl_pictures WHERE BID = :ID LIMIT 1";
            $value['ID'] = $item['ID'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $src = $req_prep->fetchAll();
            if (empty($src)) $item['src'] = "plage0.jpg";
            else $item['src'] = $src[0]['src'];
            $res[$i] = $item;
            $i++;
        }
        return $res;
    }

    public static function selectPlageWithFilter ($val, $listFilter, $index){
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

        if (empty($tab)) return [];

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
            $sql = "SELECT ID FROM tbl_businesses WHERE (NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val)";
            $values['val'] = '%' . $val . '%';
            $sql .= " GROUP BY (ID) ORDER BY (ID)";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tabID = $req_prep->fetchAll();
            if (!empty($tabID)){
                $res = utils::reduce($res, utils::parse($tabID, 'ID'));
                if (!empty($res)){
                    $values = [];
                    $sql = "SELECT ID, NAME, CITY, ADRESS, ZIPCODE, FLEACHID FROM tbl_businesses WHERE (";
                    for ($i = 0; $i < sizeof($res); $i++) {
                        $values['BID' . $i] = $res[$i];
                        $sql = $sql . "ID = :BID" . $i;
                        if ($i + 1 != sizeof($res)) $sql .= " OR ";
                        else $sql .= ")";
                    }
                    if ($index != 0){
                        $values['index'] = $index;
                        $sql .= " AND ID > :index";
                    }
                    $sql = $sql . " ORDER BY (ID) LIMIT 8;";
                    $req_prep = self::$pdo->prepare($sql);
                    $req_prep->execute($values);
                    $req_prep->setFetchMode(PDO::FETCH_ASSOC);
                    $tab = $req_prep->fetchAll();
                    $i = 0;
                    $value = [];
                    $finalRes = [];
                    foreach ($tab as $item) {
                        $sql = "SELECT src FROM tbl_pictures WHERE BID = :ID LIMIT 1";
                        $value['ID'] = $item['ID'];
                        $req_prep = self::$pdo->prepare($sql);
                        $req_prep->execute($value);
                        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
                        $src = $req_prep->fetchAll();
                        if (empty($src)) $item['src'] = "plage0.jpg";
                        else $item['src'] = $src[0]['src'];
                        $finalRes[$i] = $item;
                        $i++;
                    }
                    return $finalRes;
                }
            } else return [];
        } else return [];
        //echo "<br><br> --------- END ------------";
        return [];
    }

    public static function selectAllFilter(){
        $sql = "SELECT * FROM tbl_services";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }

    public static function selectDepa (){
        $sql = "SELECT d.id_departement, d.departement FROM departement d JOIN tbl_businesses b ON SUBSTR(ZIPCODE, 1, 2) = d.id_departement GROUP BY (d.ID)";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }


    public static function selectGeographie ($val){
        $sql = "SELECT d.ID FROM tbl_businesses b JOIN departement d ON SUBSTR(ZIPCODE, 1, 2) = d.id_departement WHERE COUNTY LIKE :val GROUP BY (d.ID);";
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
        $sql = "SELECT ZIPCODE FROM tbl_businesses b WHERE ZIPCODE like :CP OR CITY like :city GROUP BY (ZIPCODE)";
        $value['city'] = "%" . $val . "%";
        $value['CP'] = $val . "%";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        if(empty($tab)) return [];
        $i = 0;
        foreach ($tab as $item){
            $sql = "SELECT COUNT(b.ID) AS NBID, CITY, ZIPCODE FROM tbl_businesses b WHERE ZIPCODE = :ZIPCODE GROUP BY (ZIPCODE);";
            $values['ZIPCODE'] = $item['ZIPCODE'];
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
        $values['val'] = '%' . $val . "%";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab;
    }


    public static function selectWithLocalisation ($val, $long, $lat, $listfilter, $index){
        $sql = "SELECT ID FROM tbl_businesses WHERE LONGI BETWEEN :long - :precilong AND :long + :precilong AND LAT BETWEEN :lat - :precilat AND :lat + :precilat";
        $values['long'] = $long;
        $values['lat'] = $lat;
        $values['precilong'] = 0.9; // environ 100 km
        $values['precilat'] = 0.45; // environ 100 km
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tabProxi = $req_prep->fetchAll();
        if (empty($tabProxi)) return [];

        $res = utils::parse($tabProxi, 'ID');

        if (!empty($listfilter)){
            $value = [];
            $listfilter = explode(',', $listfilter);
            foreach ($listfilter as $filter){
                $sql = "SELECT BID FROM tbl_service_buisnesse WHERE SID = :filter";
                $value['filter'] = $filter;
                $req_prep = self::$pdo->prepare($sql);
                $req_prep->execute($value);
                $req_prep->setFetchMode(PDO::FETCH_ASSOC);
                $tabfilter[$filter] = $req_prep->fetchAll();
            }

            foreach ($tabfilter as $item){
                $res = utils::reduce($res, utils::parse($item, 'BID'));
            }
        }

        if (!empty($val)){
            $value = [];
            $sql = "SELECT ID FROM tbl_businesses WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val GROUP BY (ID)";
            $value['val'] = "%" . $val . "%";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tabSearch = $req_prep->fetchAll();
            $tabSearch = utils::parse($tabSearch, 'ID');
            $res = utils::reduce($tabSearch, $res);
        }

        if (empty($res)) return [];

        $value = [];
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses WHERE (";
        for ($i = 0; $i < sizeof($res); $i++){
            $sql = $sql . " ID = :ID" . $i;
            $value['ID' . $i] = $res[$i];
            if ($i + 1 < sizeof($res)) $sql = $sql . " OR";
            else $sql .= ")";
        }
        if ($index != 0){
            $value['index'] = $index;
            $sql .= " AND ID > :index";
        }
        $sql .= " ORDER BY (ID) LIMIT 8";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();

        $i = 0;
        $tabFinal = [];
        $value = [];
        foreach ($tab as $item) {
            $sql = "SELECT src FROM tbl_pictures WHERE BID = :ID LIMIT 1";
            $value['ID'] = $item['ID'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $src = $req_prep->fetchAll();
            if (empty($src)) $item['src'] = "plage0.jpg";
            else $item['src'] = $src[0]['src'];
            $tabFinal[$i] = $item;
            $i++;
        }
        return $tabFinal;
    }

    public static function selectBeach ($ID){
        $sql = "SELECT * FROM tbl_businesses b JOIN departement d ON id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE b.ID = :ID;";
        $value['ID'] = $ID;
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        if (!empty($tab)) return $tab;
        $sql = "SELECT * FROM tbl_businesses WHERE ID = :ID;";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        return $req_prep->fetchAll();
    }

    public static function selectAllPicture ($BID) {
        $sql = "SELECT src FROM tbl_pictures WHERE BID = :BID;";
        $value['BID'] = $BID;
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        return $req_prep->fetchAll();
    }

    public static function selectRandom (){
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses ORDER BY RAND() LIMIT 8";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute();
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        if (empty($tab)) return [];
        $i = 0;
        foreach ($tab as $item) {
            $sql = "SELECT src FROM tbl_pictures WHERE BID = :ID LIMIT 1";
            $value['ID'] = $item['ID'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $src = $req_prep->fetchAll();
            if (empty($src)) $item['src'] = "plage0.jpg";
            else $item['src'] = $src[0]['src'];
            $res[$i] = $item;
            $i++;
        }
        return $res;
    }

    public static function countSearch($val){
        $sql = "SELECT COUNT(ID) AS NB FROM tbl_businesses WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val";
        $value['val'] = "%" . $val . "%";
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($value);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tab = $req_prep->fetchAll();
        return $tab[0]['NB'];
    }

    public static function countSearchWithFilter($val, $listFilter){
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

        if (empty($tab)) return 0;

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
            $sql = "SELECT ID FROM tbl_businesses WHERE (NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val)";
            $values['val'] = '%' . $val . '%';
            $sql .= " GROUP BY (ID) ORDER BY (ID)";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tabID = $req_prep->fetchAll();
            if (!empty($tabID)){
                $res = utils::reduce($res, utils::parse($tabID, 'ID'));
                return sizeof($res);
            } else return 0;
        } else return 0;
        //echo "<br><br> --------- END ------------";
        return 0;
    }

    public static function countSearchWithLocalisation ($val, $long, $lat, $filter){
        $sql = "SELECT ID FROM tbl_businesses WHERE LONGI BETWEEN :long - :precilong AND :long + :precilong AND LAT BETWEEN :lat - :precilat AND :lat + :precilat";
        $values['long'] = $long;
        $values['lat'] = $lat;
        $values['precilong'] = 0.9; // environ 100 km
        $values['precilat'] = 0.45; // environ 100 km
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        $tabProxi = $req_prep->fetchAll();
        if (empty($tabProxi)) return [];

        $res = utils::parse($tabProxi, 'ID');

        if (!empty($listfilter)){
            $value = [];
            $listfilter = explode(',', $listfilter);
            foreach ($listfilter as $filter){
                $sql = "SELECT BID FROM tbl_service_buisnesse WHERE SID = :filter";
                $value['filter'] = $filter;
                $req_prep = self::$pdo->prepare($sql);
                $req_prep->execute($value);
                $req_prep->setFetchMode(PDO::FETCH_ASSOC);
                $tabfilter[$filter] = $req_prep->fetchAll();
            }

            foreach ($tabfilter as $item){
                $res = utils::reduce($res, utils::parse($item, 'BID'));
            }
        }
        if (!empty($val)){
            $value = [];
            $sql = "SELECT ID FROM tbl_businesses WHERE NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ADRESS like :val OR ZIPCODE like :val GROUP BY (ID)";
            $value['val'] = "%" . $val . "%";
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($value);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $tabSearch = $req_prep->fetchAll();
            $tabSearch = utils::parse($tabSearch, 'ID');
            $res = utils::reduce($tabSearch, $res);
        }
        return sizeof($res);
    }



}
Model::Init();