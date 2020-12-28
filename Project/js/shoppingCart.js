/* <div class="card mb-3">
      <div class="card-body" style="text-align: center;">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div> */
    $(function(){
        var shoppingCartData;
        var userno;
        var gamelistdiv;
        var n=0;
        $.ajax({
            type: 'POST',
            async: false,
            url: '../php/login.php',
            dataType: 'json',
            data: {request: 'getuserno'},
            success: function(data){
                userno = data.userno;
            }
        });
        $.ajax({
            type: 'POST',
            async: false,
            url: '../php/shoppingCart.php',
            dataType: 'json',
            data: {request: 'getshoppingcart',userno: userno},
            success: function(data){
                shoppingCartData = data.data;
                n=shoppingCartData.length;
            }
        });

        if(n>0){
            gamelistdiv = 
            $("<div/>",{
                id:"div-gamelist"
            });
        }

        for(var i=0;i<n;i++){
            var div1 = 
            $("<div/>",{
                class:"card",
                style: 'border-style: none!important;color: #16202d!important;background-color: rgba(0,0,0,0)!important;'
            });

            var div2 = 
            $("<div/>",{
                class:"row no-gutters"
            });

            var div3 = 
            $("<div/>",{
                class:"col-md-4 d-flex align-items-center"
            });

            var img1 = 
            $("<img/>",{
                src:shoppingCartData[i].ImageURL,
                class:"card-img"

            });

            var div4 =
            $("<div/>",{
                class:"col-md-8"
            });

            var div5 =
            $("<div/>",{
                class:"card-body text-left",
                style:"color:#acb2b8;"
            }); 

            var h51 =
            $("<h5/>",{
                class:"card-title",
                style:"margin-bottom:0.75rem;",
                text:shoppingCartData[i].Name
            }); 

            var p1 =
            $("<p/>",{
                class:"card-text",
                style:"margin-bottom:0.25rem;",
                text:shoppingCartData[i].Description
            }); 

            var p2 =
            $("<p/>",{
                class:"card-text",
                style:"margin-bottom:0.25rem;",
                text:"NT$：" + shoppingCartData[i].Price
            });
            div5.append(h51);
            div5.append(p1);
            div5.append(p2);
            div4.append(div5);
            div3.append(img1);
            div2.append(div3);
            div2.append(div4);
            div1.append(div2);
            gamelistdiv.append(div1);
        }
        $("#content-shoppingCart").append(gamelistdiv);
        // $('[name="showorderlist"]').on("click",function(){
        //     if($("#div2-"+$(this).attr('id')).children("#div3").length>0){
        //         $("#div2-"+$(this).attr('id')).children("#div3").remove();
        //     }
        //     else{
        //         var gamedata;
        //         var listdiv;
        //         n = 0;
        //         $.ajax({
        //             type: 'POST',
        //             async: false,
        //             url: '../php/orderrecord.php',
        //             dataType: 'json',
        //             data: {request: 'getOrderlist',orderno:$(this).attr('id')},
        //             success: function(data){
        //                 gamedata = data.data;
        //                 n = gamedata.length;
        //             }
        //         });
        //         if(n>0){
        //             listdiv = 
        //             $("<div/>",{
        //                 id:"div3"
        //             });
        //         }
                
        //         $("#div2-"+$(this).attr('id')).append(listdiv);
        //     }
        // });
    });
    
    /*   <div class="card mb-3">
          <div class="row no-gutters">
            <div class="col-md-4 d-flex align-items-center">
              <img src="./img/Among Us.jpg" class="card-img" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title" style="margin-bottom:0.75rem;">Card title</h5>
                <p class="card-text" style="margin-bottom:0.25rem;">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <p class="card-text" style="margin-bottom:0.25rem;">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
        </div> */