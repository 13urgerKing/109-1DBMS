<?php
header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getorderno') {
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT order_info.Finished,order_list.Order_No FROM order_list,order_info WHERE order_list.Order_No=order_info.Order_No GROUP by order_list.Order_No");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'processfinishorder') {
        $orderno = $_POST['orderno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT * FROM order_info WHERE order_info.Order_No='$orderno'");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'processorder') {
        $orderno = $_POST['orderno'];
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT order_info.Date, order_info.Price as Order_Price, order_list.Game_No, game.Name,game.Description,game.ImageURL,game.Price FROM order_info, order_list, game WHERE order_list.Order_No='$orderno' AND order_info.Order_No=order_list.Order_No AND order_list.Game_No=game.Game_No AND game.Seller_No='$userno' GROUP by order_list.Game_No");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'updateorder') {
        $orderno = $_POST['orderno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $conn->query("UPDATE order_info SET Finished = true WHERE order_info.Order_No = '$orderno'");
    }
    if ($req == 'getprofit') {
        $orderno = $_POST['orderno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT order_info.Price FROM order_info WHERE order_info.Order_No='$orderno'");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'updateprofit') {
        $userno = $_POST['userno'];
        $profit = $_POST['profit'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $conn->query("UPDATE seller SET Profit = Profit + $profit  WHERE seller.User_No = '$userno';");
    }
}
