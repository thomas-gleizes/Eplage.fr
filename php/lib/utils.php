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
}