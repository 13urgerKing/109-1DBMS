<?php
    header('Content-Type: application/json; charset=UTF-8');
    session_start();
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if ($req == 'getgamedata'){
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");

            $result = $conn -> query("SELECT * FROM game");
            if($result->num_rows > 0){
                $msg='success';
                while(($row_result = $result->fetch_assoc()) !== null) {
                    $row[] = $row_result;
                }
            }
            else{
                $msg='failed';
                $row[] = null;
            }
            $conn -> close();
            echo json_encode(array('msg' => $msg, 'data' => $row));
        }
    }
?>