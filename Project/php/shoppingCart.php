<?php
header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getshoppingcart') {
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT game.Name, game.Price, game.Description, game.ImageURL FROM game, shopping_cart WHERE shopping_cart.Buyer_No = '$userno' AND shopping_cart.Game_No = game.Game_No");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'getcoupon') {
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT * FROM coupon WHERE coupon.Buyer_No = '$userno' AND coupon.used = 0");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'getcartnum') {
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT Count(Game_No) FROM shopping_cart WHERE Buyer_No=$userno");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("cartnum" => $row[0]["Count(Game_No)"]));
        } else {
            echo json_encode(array("cartnum" => 0));
        }
    }
    if ($req == 'gettotal') {
        $total = 0;
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT Price FROM game,shopping_cart WHERE shopping_cart.Buyer_No=$userno and shopping_cart.Game_No = game.Game_No");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
                $total += $row_result["Price"];
            }
            echo json_encode(array("total" => $total));
        } else {
            echo json_encode(array("total" => $total));
        }
    }
    if ($req == 'addtocart') {
        $userId = $_POST['userId'];
        $gameId = $_POST['gameId'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");

        $result = $conn->query("INSERT INTO shopping_cart VALUES('$userId', '$gameId')");
    }
    if ($req == "purchaseshoppingcart") {
        $userno = $_POST['userno'];
        $total = $_POST['total'];
        $couponid = $_POST['couponid'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $currMax = $conn->query("SELECT Order_No FROM order_info WHERE Order_No=(SELECT MAX(CAST(Order_No as SIGNED)) FROM order_info)");
        $orderno = str_pad((int)$currMax->fetch_assoc()['Order_No'] + 1, 5, '0', STR_PAD_LEFT);
        date_default_timezone_set('Asia/Taipei');
        $date = date('Y-m-d');
        if ($couponid == "") {
            $result = $conn->query("INSERT INTO order_info VALUES('$orderno', '$userno', NULL, '$date', '$total', False)");
        } else {
            $result = $conn->query("INSERT INTO order_info VALUES('$orderno', '$userno', '$couponid', '$date', '$total', False)");
        }
        $result = $conn->query("SELECT Game_No FROM shopping_cart WHERE Buyer_No='$userno'");
        while (($row_result = $result->fetch_assoc()) !== null) {
            $row[] = $row_result;
        }
        for ($i = 0; $i < count($row); $i++) {
            $gameno = $row[$i]['Game_No'];
            $rowitem = $conn->query("INSERT INTO order_list VALUES('$orderno', '$gameno')");
        }
        $conn->close();
    }
    if ($req == "deleteshoppingcart") {
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("DELETE FROM shopping_cart WHERE Buyer_No='$userno'");
        $conn->close();
    }
    if ($req == "getcouponamount") {
        $couponid = $_POST['couponid'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT Amount FROM coupon WHERE Coupon_No = $couponid");
        while (($row_result = $result->fetch_assoc()) !== null) {
            $row[] = $row_result;
        }
        echo json_encode(array("amount" => $row[0]["Amount"]));
        $conn->close();
    }
    if ($req == "updatecoupon") {
        $couponid = $_POST['couponid'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("UPDATE coupon SET used=1 WHERE Coupon_NO='$couponid'");
        while (($row_result = $result->fetch_assoc()) !== null) {
            $row[] = $row_result;
        }
        echo json_encode(array("amount" => $row[0]["Amount"]));
        $conn->close();
    }
}
