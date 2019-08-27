<?php
    header("Access-Control-Allow-Origin: *");
    if (is_uploaded_file($_FILES['signal']['tmp_name'])) {
        $uploads_dir = '/var/www/html/repository/';
        $tmp_name = $_FILES['signal']['tmp_name'];
        $filename = $_FILES['signal']['name'];
        move_uploaded_file($tmp_name, $uploads_dir.$filename);
        echo "upload OK";
    }
    else{
        echo "File not uploaded successfully.";
    }

   ?>