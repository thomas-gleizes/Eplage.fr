<?php

require_once ('../controller/Controller.php');

if (!$_GET == null){
    if (isset($_GET['search'])) Controller::getPlage();
    else if (isset($_GET['searchGeo'])) Controller::getAutoGeo();
    else if (isset($_GET['searchLocal'])) Controller::getAutoLocal();
    else if (isset($_GET['searchEtabli'])) Controller::getAutoEtabli();
    else if (isset($_GET['searchProxi'])) Controller::getProxi();
    else if (isset($_GET['filter'])) Controller::getfilter();
    else if (isset($_GET['loca'])) Controller::getProxi();
}
