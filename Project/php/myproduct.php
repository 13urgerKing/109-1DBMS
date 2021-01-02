<?php
header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getmyproduct') {
        $userno = $_POST['userno'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $result = $conn->query("SELECT game.Name, game.Price, game.Description, game.Sales_volume, game.ImageURL, game.Available, game.Game_No FROM game WHERE game.Seller_No = '$userno'");
        if ($result->num_rows > 0) {
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
            echo json_encode(array("data" => $row));
            $conn->close();
        }
    }
    if ($req == 'offgame') {
        $gameno = $_POST['GameNo'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $conn->query("UPDATE game SET Available = False WHERE game.Game_No = '$gameno';");
    }
    if ($req == 'launchgame') {
        $gameno = $_POST['GameNo'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");
        $conn->query("UPDATE game SET Available = True WHERE game.Game_No = '$gameno';");
    }
}
