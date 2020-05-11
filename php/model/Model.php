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


    /** search */
    public static function search ($val, $index){
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses WHERE (NAME like :val OR COUNTRY like :val OR COUNTY like :val OR CITY like :val OR ZIPCODE like :val)";
        $values['val'] = '%' . $val . '%';
        if  ($index != 0){
            $sql = $sql . " AND ID > :index";
            $values['index'] = $index;
        }
        $sql = $sql . " ORDER BY (ID) LIMIT 8";
        $tab = self::sendRequest($sql, $values);
        if (empty($tab)) return [];
        $tab = self::getSrc($tab);
        return $tab;
    }

    public static function searchAdvance ($search, $long, $lat, $filter, $index){
        $geo = false;
        $sql = "SELECT ID FROM tbl_businesses";
        $values = [];
        if (!empty($long) || !empty($lat)){
            $sql .= " WHERE (LONGI BETWEEN :long - :precilong AND :long + :precilong AND LAT BETWEEN :lat - :precilat AND :lat + :precilat)";
            $values['long'] = $long;
            $values['lat'] = $lat;
            $values['precilong'] = 0.9; // environ 100 km
            $values['precilat'] = 0.45; // environ 100 km
            $geo = true;
        }

        if (!empty($filter)){
            $geo ? $sql .= " AND " : $sql .= " WHERE ";
            $sql .= "(" . utils::buildSQLfilter($filter) . ")";
            $values = array_merge($values, utils::buildTABfilter($filter));
        }

        if (!empty($search)) {
            $geo || !empty($filter) ? $sql .= " AND " : $sql .= " WHERE ";
            $sql .= "(NAME like :search OR COUNTRY like :search OR COUNTY like :search OR CITY like :search OR ZIPCODE like :search)";
            $values['search'] = '%' . $search . '%';
        }

        $res = self::sendRequest($sql, $values);
        if (empty($res)) return ['0', []];
        $res = utils::parse($res, 'ID');
        $json_tab['count'] = sizeof($res);
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses WHERE (";
        $value = [];
        for ($i = 0; $i < sizeof($res); $i++){
            $sql = $sql . " ID = :ID" . $i;
            $value['ID' . $i] = $res[$i];
            if ($i + 1 < sizeof($res) && $i < 7) $sql = $sql . " OR";
            else $sql .= ")";
            if ($i == 7) break;
        }
        if ($index != 0){
            $value['index'] = $index;
            $sql .= " AND ID > :index";
        }
        $sql .= " ORDER BY (ID) LIMIT 8";
        $tab = self::sendRequest($sql, $value);
        $json_tab['card'] = self::getSrc($tab);
        return $json_tab;
    }


    /** Carrouselle */
    public static function selectDepa ($listfilter){
        $values = [];
        $sql = "SELECT SUBSTR(ZIPCODE, 1, 2) AS ID, COUNTY AS NAME FROM tbl_businesses";
        if (!empty($listfilter)){
            $sql .= " WHERE " . utils::buildSQLfilter($listfilter);
            $values = utils::buildTABfilter($listfilter);
        }
        $sql .= " GROUP BY(COUNTY)";
        return self::sendRequest($sql, $values);
    }

    public static function selectCity ($id, $listfilter){
        $sql = "SELECT ZIPCODE AS ID, CITY AS NAME FROM tbl_businesses WHERE SUBSTR(ZIPCODE, 1, 2) = :ID";
        $values['ID'] = $id;
        if (!empty($listfilter)){
            $sql .= " AND" . utils::buildSQLfilter($listfilter);
            $values = array_merge($values, utils::buildTABfilter($listfilter));
        }
        $sql .= " GROUP BY (CITY)";
        return self::sendRequest($sql, $values);
    }

    public static function getBeach($id, $listfilter){
        $sql = "SELECT ID, NAME, FLEACHID FROM tbl_businesses WHERE ZIPCODE = :ID";
        $values['ID'] = $id;
        if (!empty($listfilter)){
            $sql .= " AND" . utils::buildSQLfilter($listfilter);
            $values = array_merge($values, utils::buildTABfilter($listfilter));
        }
        return self::sendRequest($sql, $values);
    }


    /** auto-complete TODO */
    public static function selectAutoDepa ($val){
        $sql = "SELECT SUBSTR(ZIPCODE, 1, 2) AS ID FROM tbl_businesses WHERE COUNTY like :val GROUP BY (COUNTY)";
        $value['val'] = "%" . $val . "%";
        $tab = self::sendRequest($sql, $value);
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

    public static function selectAutoCity($val){
        $sql = "SELECT ZIPCODE FROM tbl_businesses b WHERE ZIPCODE like :CP OR CITY like :city GROUP BY (ZIPCODE)";
        $value['city'] = "%" . $val . "%";
        $value['CP'] = $val . "%";
        $tab = self::sendRequest($sql, $value);
        if(empty($tab)) return [];
        $i = 0;
        foreach ($tab as $item){
            $sql = "SELECT COUNT(b.ID) AS NBID, CITY, ZIPCODE, departement AS depa FROM tbl_businesses b JOIN departement d ON d.id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE ZIPCODE = :ZIPCODE GROUP BY (ZIPCODE);";
            $values['ZIPCODE'] = $item['ZIPCODE'];
            $req_prep = self::$pdo->prepare($sql);
            $req_prep->execute($values);
            $req_prep->setFetchMode(PDO::FETCH_ASSOC);
            $res[$i] = $req_prep->fetchAll();
            $i++;
        }
        return $res;
    }

    public static function selectAutoBeach ($val){
        $sql = "SELECT b.ID, NAME, CITY, ZIPCODE, departement AS depa FROM tbl_businesses b JOIN departement d ON d.id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE NAME LIKE :val;";
        $values['val'] = '%' . $val . "%";
        return self::sendRequest($sql, $values);
    }


    /** filter */
    public static function selectAllFilter(){
        return self::sendRequest("SELECT * FROM tbl_services", []);
    }

    /** info beach */
    public static function selectBeach ($ID){
        $sql = "SELECT * FROM tbl_businesses b JOIN departement d ON id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE b.ID = :ID;";
        $value['ID'] = $ID;
        $tab = self::sendRequest($sql, $value);
        if (!empty($tab)) return $tab;
        $sql = "SELECT * FROM tbl_businesses WHERE ID = :ID;";
        return self::sendRequest($sql, []);
    }

    public static function selectAllPicture ($BID) {
        $sql = "SELECT src FROM tbl_pictures WHERE BID = :BID;";
        $value['BID'] = $BID;
        return self::sendRequest($sql, $value);
    }

    /** random  */
    public static function selectRandom (){
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses ORDER BY RAND() LIMIT 8";
        $tab = self::sendRequest($sql, []);
        $json_tab['card'] = self::getSrc($tab);
        $json_tab['count'] = 8;
        return $json_tab;
    }

    /** utils model */
    public static function sendRequest($sql, $values){
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        return $req_prep->fetchAll();
    }

    public static function getSrc ($tab){
        $i = 0;
        $tabFinal = [];
        $value = [];
        foreach ($tab as $item) {
            $sql = "SELECT src FROM tbl_pictures WHERE BID = :ID LIMIT 1";
            $value['ID'] = $item['ID'];
            $src = self::sendRequest($sql, $value);
            empty($src) ? $item['src'] = "plage0.jpg" : $item['src'] = $src[0]['src'];
            $tabFinal[$i] = $item;
            $i++;
        }
        return $tabFinal;
    }


}
Model::Init();