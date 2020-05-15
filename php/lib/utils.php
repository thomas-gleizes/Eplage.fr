<?php

class utils {


    public static function indexOf ($tab, $n){
        $i = 0;
        foreach ($tab as $item) {
            if ($item == $n) return $i;
            $i++;
        }
        return -1;
    }


    public static function reduce ($tab, $rab){
        $n = 0;
        while ($n < sizeof($tab)){
            if (self::indexOf($rab, $tab[$n]) == -1){
                array_splice($tab, $n, 1);
            } else {
                $n++;
            }
        }
        return $tab;
    }

    public static function parse($tab, $name){
        $rab = [];
        $n = 0;
        foreach ($tab as $item){
            $rab[$n] = $item[$name];
            $n++;
        }
        return $rab;
    }


    public static function splice ($tab, $index){
        $rab = [];
        for ($i = 0; $i < sizeof($tab); $i++){
            if ($i >= $index) {
                if ($i + 1 < sizeof($tab)) $rab[$i] = $tab[$i + 1];
                else break;
            } else $rab[$i] = $tab[$i];

        }
        return $rab;
    }

    public static function buildSQLfilter($filter){
        $sql = "";
        $filter = explode(',', $filter);
        $sql .= " IN ";
        for ($i = 0; $i < sizeof($filter); $i++){
            $sql .= "(SELECT BID FROM tbl_service_buisnesse WHERE SID = :filter" . $i;
            if ($i+1 != sizeof($filter)) $sql .= " AND BID IN ";
            else {
                for ($j = 0; $j < sizeof($filter); $j++){
                    $sql .= ")";
                }
            }
        }
        return $sql;
    }

    public static function buildTABfilter ($filter){
        $filter = explode(',', $filter);
        $values = [];
        for ($i = 0; $i < sizeof($filter); $i++){
            $values['filter' . $i] = $filter[$i];
        }
        return $values;
    }



}