<?php
header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getmyproduct') {
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT game.Name, game.Price, game.Description, game.ImageURL FROM game WHERE game.Seller_No = '$userno'");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
}
