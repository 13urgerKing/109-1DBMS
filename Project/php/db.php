<?php
    header('Content-Type: application/json; charset=UTF-8');
    if ($_SERVER['REQUEST_METHOD'] == "POST"){
        @$function = $_POST["function"];
        if ($function == 'connect'){
            $link = mysqli_connect("localhost", "root", "root", "gamlabdb");
            $link -> set_charset("UTF8");

            $result = $link -> query("SELECT * FROM gamlab_user");
            while ($row = $result->fetch_assoc()){
                $output[] = $row;
            }
            //$link -> close();
            echo json_encode(array('msg' => $output));
        }
    }
?>