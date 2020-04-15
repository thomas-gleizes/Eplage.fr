<?php

require_once ('../model/Model.php');

class Controller {

    public static function getPlage (){
        if (isset($_GET['search'])){
            if (isset($_GET['filter'])){
                echo json_encode(Model::selectPlageWithFilter($_GET['search'], $_GET['filter']));
            } else echo json_encode(Model::selectPlage($_GET['search']));
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
        echo json_encode(Model::selectWithLocalisation($_GET['searchProxi'], $_GET['long'], $_GET['lat'], $_GET['filter']));
    }

    //wtf



    public static function SQL (){
        Model::SQL($_GET['sql']);
    }



}