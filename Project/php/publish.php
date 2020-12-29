<?php
    header('Content-Type: application/json; charset=UTF-8');
    if($_SERVER['REQUEST_METHOD'] == "POST"){
        $req = $_POST['request'];
        if($req == 'publish'){
            $userno = $_POST['userno'];
            $name = $_POST['name'];
            $price = $_POST['price'];
            $category = $_POST['category'];
            $description = $_POST['description'];
            $link = $_POST['link'];
            $conn = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $conn -> set_charset("UTF8");
            $currMax = $conn -> query("SELECT Game_No From game WHERE Game_No=(SELECT MAX(CAST(Game_No as SIGNED)) from game)");
            $gameno = str_pad((int)$currMax -> fetch_assoc()['Game_No'] + 1, 5, '0', STR_PAD_LEFT);

            if($conn -> query("INSERT INTO game VALUES ('$gameno', '$userno', '$price', '0', '$category', '$name', '$description', '$link', TRUE)") === TRUE){
                $msg='success';
            }
            else{
                $msg='failed';
            }
            $conn -> close();  
            echo json_encode(array('msg' => $msg));
        }
    }
?>