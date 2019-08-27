<?php
header("Access-Control-Allow-Origin: *");
const VALID = 1;
const INVALID = 2;

require '../models/Signal.php';

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    header('Content-Type: application/json');
    $signals = Signal::getSignals();
    if($signals){
        $data_array['status'] = VALID;
        $data_array['data'] = $signals;
        print json_encode($data_array);
    }
    else{
        print json_encode(array(
            'status' => INVALID,
            'message' => 'Ha ocurrido un error al procesar la información'
        ));
    }
}