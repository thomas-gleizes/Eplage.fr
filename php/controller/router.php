<?php

require_once ('../controller/Controller.php');

if (!$_GET == null){
    if (isset($_GET['search'])) Controller::search();
    else if (isset($_GET['searchAdvance'])) Controller::searchAdvance();

    else if (isset($_GET['searchAutoDepa'])) Controller::getAutoDepa();
    else if (isset($_GET['searchAutoCity'])) Controller::getAutoCity();
    else if (isset($_GET['searchAutoBeach'])) Controller::getAutoBeach();

    else if (isset($_GET['getfilter'])) Controller::getfilter();

    else if (isset($_GET['displayBeach'])) Controller::displayBeach();
    else if (isset($_GET['displayImg'])) Controller::displayImg();

    else if (isset($_GET['getRand'])) Controller::getRand();

    else if (isset($_GET['getDepa'])) Controller::getDepa();
    else if (isset($_GET['getCity'])) Controller::getCity();
    else if (isset($_GET['getBeach'])) Controller::getBeach();
}
