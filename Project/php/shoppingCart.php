<?php
    header('Content-Type: application/json; charset=UTF-8');
    session_start();
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if($req == 'getshoppingcart'){
            $userno = $_POST['userno'];
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");
            $result = $conn -> query("SELECT game.Name, game.Price, game.Description, game.ImageURL FROM game, shopping_cart where shopping_cart.Buyer_No = '$userno' and shopping_cart.Game_No = game.Game_No");
            if($result -> num_rows>0){
                while(($row_result = $result->fetch_assoc()) !== null) {
                    $row[] = $row_result;
                }
                echo json_encode(array("data"=>$row));
                $conn -> close();
            }
        }
        if($req == 'getcoupon'){
            $userno = $_POST['userno'];
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");
            $result = $conn -> query("SELECT * FROM coupon where coupon.Buyer_No = '$userno' and coupon.used = 0");
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