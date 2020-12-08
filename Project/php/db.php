<?php
    header('Content-Type: application/json; charset=UTF-8');
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if ($req == 'login'){
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");

            $email = $_POST['email'];
            $password = $_POST['password'];
            $result = $conn -> query("SELECT * FROM gamlab_user WHERE Email='$email' AND Password='$password'");
            if($result->num_rows > 0){
                $msg='success';
            }
            else{
                $msg='failed';   
            }
            $conn -> close();
            echo json_encode(array('msg' => $msg));
            // while ($row = $result->fetch_assoc()){
            //     $output[] = $row;
            // }
            // echo json_encode(array('msg' => $output));
        }
    }
?>