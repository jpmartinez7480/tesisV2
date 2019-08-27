<?php
header("Access-Control-Allow-Origin: *");
const VALID = 1;
const INVALID = 2;

require '../models/Signal.php';

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $body = json_decode(file_get_contents("php://input"), true);
    $signal = Signal::postSignal($body);
    if($signal){
        $user_data = array('name'=>$signal[0]['name'],'email'=>$signal[0]['email'],'pass'=>$signal[0]['password_crypth']);
        $data_array['status'] = VALID;
        $data_array['data'] = $user_data;
        print json_encode($data_array);
    }
    else{
        print json_encode(array(
            'status' => INVALID,
            'message' => $signal
        ));
    }
}