<?php

require_once ('../controller/Controller.php');

if (!$_GET == null){
    if (isset($_GET['search'])) Controller::getPlage();
    else if (isset($_GET['searchGeo'])) Controller::getAutoSearch();
    else if (isset($_GET['filter'])) Controller::getfilter();
}
