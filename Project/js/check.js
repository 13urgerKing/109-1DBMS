$("#check_btn").click(function(){
    $.ajax({
        type: 'POST',
        async: false,
        url: '../Project/php/order_list.php',
        dataType: 'json',
        data: {request: 'check_orderlist'},
        success: function(data){
            console.log(data.row[0])
        }
        
    });    
}); 