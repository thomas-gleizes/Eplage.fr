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


    public static function reduce ($tab , $rab){
        echo "tab : ";
        print_r($tab);

        echo "<br> rab : ";
        print_r($rab);
        for ($i = 0; $i < sizeof($tab); $i++){
            if (utils::indexOf($rab, $tab[$i]) == -1){
                array_splice($tab, $i, 1);
                echo "<br> tab-" . $i;
                var_dump(q);
            }
        }
        return $tab;
    }

    public static function parse ($tab){
        $rab = [];
        $n = 0;
        foreach ($tab as $item){
            $rab[$n] = $item['BID'];
            $n++;
        }
        return $rab;
    }



}