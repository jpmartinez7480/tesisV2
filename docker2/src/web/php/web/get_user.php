<?php

const VALID = 1;
const INVALID = 2;

require '../models/User.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $body = json_decode(file_get_contents("php://input"), true);
    $user = User::getID($body);
    if($user){
        $data_array['status'] = VALID;
        $data_array['data'] = $user;
        print json_encode($user);
    }
    else{
        print json_encode(array(
            'status' => INVALID,
            'message' => 'Usuario inválido'
        ));
    }
}