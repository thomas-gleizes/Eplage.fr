<?php

require_once ('../controller/Controller.php');

if (!$_GET == null){
    if (isset($_GET['sql'])) Controller::SQL();
    else if (isset($_GET['search'])) Controller::getPlage();
    else if (isset($_GET['filter'])) Controller::getFilter();
    else if (isset($_GET['loca'])) Controller::getlocalisation();
}
