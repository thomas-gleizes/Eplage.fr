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
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        echo json_encode(Model::selectAutoDepa($_GET['searchAutoDepa'], $filter));
    }

    public static function getAutoCity(){
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        echo json_encode(Model::selectAutoCity($_GET['searchAutoCity'], $filter));
    }

    public static function getAutoBeach(){
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        echo json_encode(Model::selectAutoBeach($_GET['searchAutoBeach'], $filter));
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
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        echo json_encode(Model::selectDepa($filter));
    }

    public static function getCity (){
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        echo json_encode(Model::selectCity($_GET['getCity'], $filter));
    }

    public static function getBeach(){
        isset($_GET['filter']) ? $filter = $_GET['filter'] : $filter = '';
        echo json_encode(Model::getBeach($_GET['getBeach'], $filter));
    }

}