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
    public static function searchAdvance($search, $long, $lat, $filter, $index){
        $json_tab['count'] = 0;
        $json_tab['card'] = [];

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
            $sql .= "(ID" . utils::buildSQLfilter($filter) . ")";
            $values = array_merge($values, utils::buildTABfilter($filter));
        }

        if (!empty($search)) {
            $geo || !empty($filter) ? $sql .= " AND " : $sql .= " WHERE ";
            $sql .= "(NAME like :search OR COUNTRY like :search OR COUNTY like :search OR CITY like :search OR ZIPCODE like :search)";
            $values['search'] = '%' . $search . '%';
        }

        $res = self::sendRequest($sql, $values);
        if (empty($res)) return $json_tab;
        $res = utils::parse($res, 'ID');
        $json_tab['count'] = sizeof($res);
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses WHERE (";
        $value = [];
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
        $tab = self::sendRequest($sql, $value);
        $json_tab['card'] = self::getSrc($tab);
        return $json_tab;
    }

    /** random  */
    public static function selectRandom(){
        $sql = "SELECT ID, NAME, CITY, ZIPCODE, CITY, FLEACHID FROM tbl_businesses ORDER BY RAND() LIMIT 8";
        $tab = self::sendRequest($sql, []);
        $json_tab['card'] = self::getSrc($tab);
        $json_tab['count'] = 8;
        return $json_tab;
    }


    /** Carrouselle */
    public static function selectDepa($filter){
        $values = [];
        $sql = "SELECT SUBSTR(ZIPCODE, 1, 2) AS ID, COUNTY AS NAME FROM tbl_businesses";
        if (!empty($filter)){
            $sql .= " WHERE ID" . utils::buildSQLfilter($filter);
            $values = utils::buildTABfilter($filter);
        }
        $sql .= " GROUP BY(COUNTY)";
        return self::sendRequest($sql, $values);
    }

    public static function selectCity($id, $filter){
        $sql = "SELECT ZIPCODE AS ID, CITY AS NAME FROM tbl_businesses WHERE SUBSTR(ZIPCODE, 1, 2) = :ID";
        $values['ID'] = $id;
        if (!empty($filter)){
            $sql .= " AND ID" . utils::buildSQLfilter($filter);
            $values = array_merge($values, utils::buildTABfilter($filter));
        }
        $sql .= " GROUP BY (CITY)";
        return self::sendRequest($sql, $values);
    }

    public static function getBeach($id, $filter){
        $sql = "SELECT ID, NAME, FLEACHID FROM tbl_businesses WHERE ZIPCODE = :ID";
        $values['ID'] = $id;
        if (!empty($filter)){
            $sql .= " AND ID" . utils::buildSQLfilter($filter);
            $values = array_merge($values, utils::buildTABfilter($filter));
        }
        return self::sendRequest($sql, $values);
    }


    /** auto-complete */
    public static function selectAutoDepa($val, $filter){
        $sql = "SELECT SUBSTR(ZIPCODE, 1, 2) AS ID FROM tbl_businesses WHERE COUNTY like :val";
        $value['val'] = "%" . $val . "%";
        if (!empty($filter)){
            $sql .= " AND ID" . utils::buildSQLfilter($filter);
            $value = array_merge($value, utils::buildTABfilter($filter));
        }
        $sql .= " GROUP BY (COUNTY)";
        $tab = self::sendRequest($sql, $value);
        $res = [];
        for($i = 0; $i < sizeof($tab); $i++){
            $sql = "SELECT count(d.ID) as NBID, departement as depa, d.id_departement as IDdepa FROM tbl_businesses b JOIN departement d ON SUBSTR(ZIPCODE, 1, 2) = d.id_departement WHERE d.id_departement = :ID";
            $values['ID'] = $tab[$i]['ID'];
            $res[$i] = self::sendRequest($sql, $values)[0];
        }
        return $res;
    }

    public static function selectAutoCity($val, $filter){
        $sql = "SELECT ZIPCODE FROM tbl_businesses b WHERE (ZIPCODE like :CP OR CITY like :city)";
        $value['city'] = "%" . $val . "%";
        $value['CP'] = $val . "%";
        if (!empty($filter)){
            $sql .= " AND (ID" . utils::buildSQLfilter($filter) . ")";
            $value = array_merge($value, utils::buildTABfilter($filter));
        }
        $sql .= " GROUP BY (ZIPCODE)";
        $tab = self::sendRequest($sql, $value);
        $res = [];
        for ($i = 0; $i < sizeof($tab); $i++){
            $sql = "SELECT COUNT(b.ID) AS NBID, CITY, ZIPCODE, departement AS depa FROM tbl_businesses b JOIN departement d ON d.id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE ZIPCODE = :ZIPCODE GROUP BY (ZIPCODE);";
            $values['ZIPCODE'] = $tab[$i]['ZIPCODE'];
            $res[$i] = self::sendRequest($sql, $values)[0];
        }
        return $res;
    }

    public static function selectAutoBeach($val, $filter){
        $sql = "SELECT b.ID, NAME, CITY, ZIPCODE, departement AS depa FROM tbl_businesses b JOIN departement d ON d.id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE NAME LIKE :val ";
        $values['val'] = '%' . $val . "%";
        if (!empty($filter)){
            $sql .= " AND b.ID" . utils::buildSQLfilter($filter);
            $values = array_merge($values, utils::buildTABfilter($filter));
        }
        $sql .= " GROUP BY(b.id)";
        return self::sendRequest($sql, $values);
    }


    /** filter */
    public static function selectAllFilter(){
        return self::sendRequest("SELECT * FROM tbl_services", []);
    }

    /** info beach */
    public static function selectBeach($ID){
        $sql = "SELECT * FROM tbl_businesses b JOIN departement d ON id_departement = SUBSTR(ZIPCODE, 1, 2) WHERE b.ID = :ID;";
        $value['ID'] = $ID;
        $tab = self::sendRequest($sql, $value);
        if (!empty($tab)) return $tab;
        $sql = "SELECT * FROM tbl_businesses WHERE ID = :ID;";
        return self::sendRequest($sql, []);
    }

    public static function selectAllPicture($BID) {
        $sql = "SELECT src FROM tbl_pictures WHERE BID = :BID;";
        $value['BID'] = $BID;
        return self::sendRequest($sql, $value);
    }


    /** utils model */
    public static function sendRequest($sql, $values){
        $req_prep = self::$pdo->prepare($sql);
        $req_prep->execute($values);
        $req_prep->setFetchMode(PDO::FETCH_ASSOC);
        return $req_prep->fetchAll();
    }

    public static function getSrc($tab){
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