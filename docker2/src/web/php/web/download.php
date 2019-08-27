<?php
header("Access-Control-Allow-Origin: *");

$file = basename($_GET['file']);
$path = '../repository/'.$file;
if(!file_exists($path)){
    die('file not found');
}
else{
    header("Cache-Control: public");
    header("Content-Description: File Transfer");
    header("Content-Disposition: attachment; filename=$file");
    header("Content-Type: application/zip");
    header("Content-Transfer-Encoding: binary");
    // read the file from disk
    readfile($path);
}

