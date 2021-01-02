<?php
header('Content-Type: application/json; charset=UTF-8');
if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $req = $_POST['request'];
    if ($req == 'getgamedata') {
        $category = $_POST['category'];
        $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
        $conn->set_charset("UTF8");

        if ($category == "all") {
            $result = $conn->query("SELECT * FROM game WHERE game.Available=1");
        } else {
            $result = $conn->query("SELECT * FROM game WHERE game.Category='$category' and game.Available=1");
        }
        if ($result->num_rows > 0) {
            $msg = 'success';
            while (($row_result = $result->fetch_assoc()) !== null) {
                $row[] = $row_result;
            }
        }
        $conn->close();
        echo json_encode(array('msg' => $msg, 'data' => $row));
    }
}
