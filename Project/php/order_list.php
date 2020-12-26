<?php
    header('Content-Type: application/json; charset=UTF-8');
    session_start();
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if ($req == 'check_orderlist'){
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");

            $result = $conn -> query("SELECT * FROM order_list");
            while(($row_result = $result->fetch_assoc()) !== null) {
                // 將查詢結果(陣列)，儲存在陣列中
                $row[] = $row_result;
            }
            
            echo json_encode(array("row"=>$row));
            // echo json_encode(array('result' => $result ));
            $conn -> close();
            
        }
    }
?>