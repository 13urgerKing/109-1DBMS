/* <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100">
        <a><img class="card-img-top" src="./img/Among Us.jpg" alt=""></a>
        <div class="card-body">
            <h4 class="card-title">
                <a>Among Us</a>
            </h4>
            <h5>NT$ 102</h5>
            <p class="card-text">一個在線和本地聚會的團隊合作和背叛遊戲，適合4-10位玩家...在太空中！</p>
            <div class="card-footer" style="border-style: none!important;color: #16202d!important;background-color: rgba(0,0,0,0)!important;">
                <button class="cart-btn btn-lg btn-block" style="border-style: none!important;cursor: pointer;">加入購物車</button>
            </div>
        </div>
    </div>
</div> */
function createContentHome(){
    var gamedata;
    var n=0;
    $.ajax({
        type: 'POST',
        async: false,
        url: '../php/home.php',
        dataType: 'json',
        data: {request: 'getgamedata'},
        success: function(data){
            msg=data.msg;
            gamedata=data.data;
            n=gamedata.length;
        }
    });
    for(var i=0;i<n;i++){
        var div1 = 
        $('<div/>', {
            class: 'col-lg-4 col-md-6 mb-4'
        });
        var div2 =
        $('<div/>', {
            class: 'card h-100'
        });
        var a1 = 
        $('<a/>', {
        });
        var img1 =
        $('<img>', {
            class: 'card-img-top',
            src: gamedata[i].ImageURL,
            alt: ""
        });
        var div3 =
        $('<div/>', {
            class: 'card-body'
        });
        var h41 =
        $('<h4/>', {
            class: 'card-title'
        });
        var a2 =
        $('<a/>', {
            text: gamedata[i].Name
        });
        var h51 =
        $('<h5/>', {
            text: 'NT$'+ gamedata[i].Price.toString()
        });
        var p1 = 
        $('<p/>', {
            class: 'card-text',
            text: gamedata[i].Description
        });
        var div4 =
        $('<div/>', {
            class: 'card-footer',
            style: 'border-style: none!important;color: #16202d!important;background-color: rgba(0,0,0,0)!important;'
        });
        var btn1 =
        $('<button/>', {
            id: gamedata[i].Game_No,
            name: "addgametocart",
            class: 'cart-btn btn-lg btn-block',
            style: 'border-style: none!important;cursor: pointer;',
            text: '加入購物車'
        });
        a1.append(img1);
        h41.append(a2);
        div4.append(btn1);
        div3.append(h41);
        div3.append(h51);
        div3.append(p1);
        div3.append(div4);
        div2.append(a1);
        div2.append(div3);
        div1.append(div2);
        $("#content-Home").append(div1);
    }
}
$(function(){
    createContentHome();
    $('[name="addgametocart"]').on("click", function(){
        var userId;
        var userrole;
        $.ajax({
            type: 'POST',
            async: false,
            url: '../php/login.php',
            dataType: 'json',
            data: {request: 'getuserno'},
            success: function(data){
                userId = data.userno;
            }
        });

        $.ajax({
            type: 'POST',
            async: false,
            url: '../php/login.php',
            dataType: 'json',
            data: {request: 'checkuserrole'},
            success: function(data){
                userrole=data.userrole;
            }
        });

        if(userId != undefined && userrole == 'buyer'){
            $.ajax({
                type: 'POST',
                async: false,
                url: '../php/home.php',
                dataType: 'json',
                data: {request: 'addtocart', userId: userId, gameId: $(this).attr("id")},
                success: function(data){
                    msg=data.msg;
                    gamedata=data.data;
                    n=gamedata.length;
                }
            });
        }
    });
    
});