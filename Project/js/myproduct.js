/* <div class="card mb-3">
      <div class="card-body" style="text-align: center;">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div> */
    $(function () {
        var myProduct;
        var userno;
        var gamelistdiv;
        var coupondata;
        var couponlistdiv;
        var available = 0;
        var n = 0;
        $.ajax({
          type: "POST",
          async: false,
          url: "../php/login.php",
          dataType: "json",
          data: { request: "getuserno" },
          success: function (data) {
            userno = data.userno;
          },
        });
        $.ajax({
          type: "POST",
          async: false,
          url: "../php/myproduct.php",
          dataType: "json",
          data: { request: "getmyproduct", userno: userno },
          success: function (data) {
            myProduct = data.data;
            n = myProduct.length;
            available = myProduct.Available;
          },
        });
      
        if (n > 0) {
          gamelistdiv = $("<div/>", {
            id: "div-gamelist",
          });
        }
      
        for (var i = 0; i < n; i++) {
          var div1 = $("<div/>", {
            class: "card my-3",
            style:
              "border-style: none!important;color: #16202d!important;background-color: rgba(0,0,0,0)!important;",
          });
      
          var div2 = $("<div/>", {
            class: "row no-gutters",
          });
      
          var div3 = $("<div/>", {
            class: "col-md-4 d-flex align-items-center",
          });
      
          var img1 = $("<img/>", {
            src: myProduct[i].ImageURL,
            class: "card-img w-100 h-100",
          });
      
          var div4 = $("<div/>", {
            class: "col-md-6",
          });
      
          var div5 = $("<div/>", {
            class: "card-body text-left",
            style: "color:#acb2b8;",
          });
      
          var h51 = $("<h5/>", {
            class: "card-title",
            style: "margin-bottom:0.75rem;",
            text: myProduct[i].Name,
          });
      
          var p1 = $("<p/>", {
            class: "card-text",
            style: "margin-bottom:0.25rem;",
            text: myProduct[i].Description,
          });
      
          var p2 = $("<p/>", {
            class: "card-text",
            text: "NT$：" + myProduct[i].Price,
          });

          var div6 = $("<div/>", {
            class: "col-md-2 d-flex align-items-center",
            style: "justify-content: space-between;"
          });
          
          if(myProduct[i].Available==0){
            var btn1 = $("<button/>",{
              class: "col-5 btn",
              text: "上架",
              name: "launch",
              id: myProduct[i].Game_No
            });

            var btn2 = $("<button/>",{
              class: "col-5 btn",
              text: "下架",
              style: "cursor: not-allowed;",
              disabled: "True",
              name: "off",
              id: myProduct[i].Game_No
            });
          }
          else{
            var btn1 = $("<button/>",{
              class: "col-5 btn",
              text: "上架",
              style: "cursor: not-allowed;",
              disabled: "True",
              name: "launch",
              id: myProduct[i].Game_No
            });

            var btn2 = $("<button/>",{
              class: "col-5 btn",
              text: "下架",
              name: "off",
              id: myProduct[i].Game_No
            });
          }
          
          div5.append(h51);
          div5.append(p1);
          div5.append(p2);
          div6.append(btn1);
          div6.append(btn2);
          div4.append(div5);
          div3.append(img1);
          div2.append(div3);
          div2.append(div4);
          div2.append(div6);
          div1.append(div2);
          gamelistdiv.append(div1);
        }
      
        $("#MyProduct").append(gamelistdiv);
        
        $('[name="off"]').on("click", function (){
          var gameno = this.id;
          $.ajax({
            type: "POST",
            async: false,
            url: "../php/myproduct.php",
            dataType: "json",
            data: { request: "offgame", GameNo: gameno },
            
          });
          window.location.reload();
        });

        $('[name="launch"]').on("click", function (){
          var gameno = this.id;
          $.ajax({
            type: "POST",
            async: false,
            url: "../php/myproduct.php",
            dataType: "json",
            data: { request: "launchgame", GameNo: gameno },
            
          });
          window.location.reload();
        });
      });
      /*   <div class="card mb-3">
                <div class="row no-gutters">
                  <div class="col-md-4 d-flex align-items-center">
                    <img src="./img/Among Us.jpg" class="card-img" alt="...">
                  </div>
                  <div class="col-md-8" style="float:left;">
                    <div class="card-body">
                      <h5 class="card-title" style="margin-bottom:0.75rem;">Card title</h5>
                      <p class="card-text" style="margin-bottom:0.25rem;">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                      <p class="card-text" style="margin-bottom:0.25rem;">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    
                  </div>
                  <div stlyle="float:left;">
                        <button class="col-5 btn">上架商品</button>
                        <button class="col-5 btn">下架商品</button>
                    </div>
                </div>

              </div> */
      