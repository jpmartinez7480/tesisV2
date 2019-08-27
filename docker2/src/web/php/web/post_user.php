<?php
header("Access-Control-Allow-Origin: *");
const VALID = 1;
const INVALID = 2;

require '../models/User.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $body = json_decode(file_get_contents("php://input"), true);
    $signal = User::postUser($body);
    if($signal){
        $data_array['status'] = VALID;
        $data_array['data'] = 'Ok.';
        print json_encode($data_array);
    }
    else{
        print json_encode(array(
            'status' => INVALID,
            'message' => 'Ha ocurrido un error al procesar la información'
        ));
    }
}