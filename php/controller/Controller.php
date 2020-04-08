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



    public static function SQL (){
        Model::SQL($_GET['sql']);
    }



}