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
        echo "<br> tab : ";
        var_dump($tab);
        echo "<br> rab : ";
        var_dump($rab);
        echo "<br>";
        for ($i = 0; $i < sizeof($tab); $i++){
            if (utils::indexOf($rab[], $tab[$i]) == -1){
                array_splice($tab, $i, 1);
            }
        }
        return $tab;
    }


}