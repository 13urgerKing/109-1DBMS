<?php
    header('Content-Type: application/json; charset=UTF-8');
    session_start();
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if ($req == 'check_orderlist'){
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");

            $result = $conn -> query("SELECT * From order_info");
            while(($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            
            echo json_encode(array("data"=>$row));
            $conn -> close();
            
        }
    }
?>