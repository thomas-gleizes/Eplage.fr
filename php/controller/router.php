<?php

require_once ('../controller/Controller.php');

if (!$_GET == null){
    if (isset($_GET['search'])) Controller::getPlage();
    else if (isset($_GET['autosearch'])) Controller::getAutoSearch();
    else if (isset($_GET['filter'])) Controller::getfilter();
}
