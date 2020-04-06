<?php

require_once ('../controller/Controller.php');

if (!$_GET == null){
    if (isset($_GET['sql'])) Controller::SQL();
    else if (isset($_GET['search'])) Controller::getPlage();
}
