$(function(){
    var orderdata;
    $.ajax({
        type: 'POST',
        async: false,
        url: '../php/order_list.php',
        dataType: 'json',
        data: {request: 'check_orderlist'},
        success: function(data){
            orderdata = data.data;
        } 
    });
    for(var i=0;i<orderdata.length;i++){
        var div1 = 
        $("<div/>",{
            class:"card mb-3",
            style:"cursor:pointer;"
        });
        var div2 = 
        $("<div/>",{
            class:"card-body",
            style:"text-align: center;"
        });
        var h31 =
        $("<h3/>",{
            class:"card-title",
            text:"訂單編號：" + orderdata[i].Order_No
        })
        var p1 =
        $("<p/>",{
            class:"card-text",
            style:"font-size: 20px;",
            text:"訂單日期：" + orderdata[i].Date
        })
        var p2 =
        $("<p/>",{
            class:"card-text",
            style:"font-size: 20px;",
            text:"付款金額：" + orderdata[i].Price
        })
        div2.append(h31);
        div2.append(p1);
        div2.append(p2);
        div1.append(div2);
        $("#content-Check_orderlist").append(div1);
    }
    

})
/* <div class="card mb-3">
      <div class="card-body" style="text-align: center;">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div> */

