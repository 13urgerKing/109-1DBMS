<?php
    header('Content-Type: application/json; charset=UTF-8');
    session_start();
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if($req == 'check_orderlist'){
            $userno = $_POST['userno'];
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");
            $result = $conn -> query("SELECT * From order_info WHERE Buyer_No='$userno'");
            if($result -> num_rows>0){
                while(($row_result = $result->fetch_assoc()) !== null) {
                    if($row_result['Coupon_No']!=NULL){
                        $amount = $conn -> query("SELECT Amount From coupon WHERE Coupon_No={$row_result['Coupon_No']}");
                        $amount = $amount->fetch_assoc()['Amount'];
                    }
                    else{
                        $amount=0;
                    }
                    $row_result["Coupon_Amount"]=strval($amount);
                    $row[] = $row_result;
                }
                echo json_encode(array("data"=>$row));
                $conn -> close();  
            }
        }
        if($req == 'getOrderlist'){
            $orderno = $_POST['orderno'];
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");
            $result = $conn -> query("SELECT ol.Game_No,G.Name,G.Price,G.Description,G.ImageURL FROM order_list ol,game G WHERE ol.Order_No='$orderno' AND ol.Game_No=G.Game_No");
            if($result -> num_rows>0){
                while(($row_result = $result->fetch_assoc()) !== null) {
                    $row[] = $row_result;
                }
                echo json_encode(array("data"=>$row));
                $conn -> close();
            }
        }
    }
?>