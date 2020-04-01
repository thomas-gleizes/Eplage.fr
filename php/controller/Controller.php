<?php

require_once ('../model/Model.php');

class Controller {

    public static function getPlage (){
        if (!empty($_GET['search'])) echo json_encode(Model::selectPlage($_GET['search']));
        else echo json_encode("error");
    }

    public static function getFilter(){
        echo json_encode(Model::selectAllService());
    }

}