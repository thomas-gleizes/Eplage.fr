<?php

require_once ('../model/Model.php');

class Controller {

    public static function getPlage (){
        if (isset($_GET['search'])){
            if (isset($_GET['filter'])){
                echo json_encode(Model::selectPlageWithFilter($_GET['search'], $_GET['filter'], $_GET['index']));
            } else echo json_encode(Model::selectPlages($_GET['search'], $_GET['index']));
        } else echo json_encode("error");
    }

    public static function getFilter(){
        echo json_encode(Model::selectAllFilter());
    }

    public static function getAutoGeo(){
        echo json_encode(Model::selectGeographie($_GET['searchGeo']));
    }

    public static function getAutoLocal (){
        echo json_encode(Model::selectLocal($_GET['searchLocal']));
    }

    public static function getAutoEtabli (){
        echo json_encode(Model::selectEtablissements($_GET['searchEtabli']));
    }

    public static function getProxi (){
        echo json_encode(Model::selectWithLocalisation($_GET['searchProxi'], $_GET['long'], $_GET['lat'], $_GET['filter'], $_GET['index']));
    }


    public static function displayBeach (){
        echo json_encode(Model::selectBeach($_GET['displayBeach']));
    }

    public static function displayImg (){
        echo json_encode(Model::selectAllPicture($_GET['displayImg']));
    }

    public static function getRand (){
        echo json_encode(Model::selectRandom());
    }


    public static function countSearch (){
        echo json_encode(Model::countSearch($_GET['searchCount']));
    }

    public static function countSearchWIthFilter(){
        echo json_encode(Model::countSearchWithFilter($_GET['countFilter'], $_GET['listfilter']));
    }

    public static function countSearchWithLocalisation (){
        echo json_encode(Model::countSearchWithLocalisation($_GET['countLoca'], $_GET['long'], $_GET['lat'], $_GET['listfilter']));
    }
}