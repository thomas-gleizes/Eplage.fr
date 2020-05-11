<?php

require_once ('../model/Model.php');

class Controller {

    /** search */
    public static function search(){
        isset($_GET['index']) ? $index = $_GET['index'] : $index = 0;
        echo json_encode(Model::search($_GET['search'], $index));
    }

    public static function searchAdvance(){
        isset($_GET['long']) ? $long = $_GET['long'] : $long = '';
        isset($_GET['lat']) ? $lat = $_GET['lat'] : $lat = '';
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        isset($_GET['index']) ? $index = $_GET['index'] : $index = 0;
        echo json_encode(Model::searchAdvance($_GET['searchAdvance'], $long, $lat, $filter, $index));
    }

    /** filter */
    public static function getFilter(){
        echo json_encode(Model::selectAllFilter());
    }


    /** auto-complete */
    public static function getAutoDepa(){
        echo json_encode(Model::selectAutoDepa($_GET['searchAutoDepa']));
    }

    public static function getAutoCity(){
        echo json_encode(Model::selectAutoCity($_GET['searchAutoCity']));
    }

    public static function getAutoBeach(){
        echo json_encode(Model::selectAutoBeach($_GET['searchAutoBeach']));
    }


    /** info beach */
    public static function displayBeach (){
        echo json_encode(Model::selectBeach($_GET['displayBeach']));
    }

    public static function displayImg (){
        echo json_encode(Model::selectAllPicture($_GET['displayImg']));
    }


    /** random */
    public static function getRand (){
        echo json_encode(Model::selectRandom());
    }


    /** carouselle */
    public static function getDepa (){
        echo json_encode(Model::selectDepa($_GET['listfilter']));
    }

    public static function getCity (){
        echo json_encode(Model::selectCity($_GET['getCity'], $_GET['filter']));
    }

    public static function getBeach(){
        echo json_encode(Model::getBeach($_GET['getBeach'], $_GET['filter']));
    }

}