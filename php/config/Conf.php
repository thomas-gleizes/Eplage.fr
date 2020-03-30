<?php
Class Conf{

    static private $debug = True;

    static private $databases = array(
        'hostname' => 'webinfo',
        'database' => 'gleizest',
        'login' => 'gleizest',
        'password' => 'azert123'
    );

    static public function getLogin() {
        return self::$databases['login'];
    }

    static public function getPassword() {
        return self::$databases['password'];
    }

    static public function getDatabase() {
        return self::$databases['database'];
    }

    static public function getHostname() {
        return self::$databases['hostname'];
    }

    static public function getDebug(){
        return self::$debug;
    }



}