/* <li class="nav-item active">
    <a class="nav-link currentpage" href="#">商店</a>
</li>*/
function createTopNavbar(){
    var userrole;
    var navbarelm;
    var pagename=window.location.pathname.split("/").pop().toLowerCase();
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
    if(userrole=="buyer"){
        navbarelm=["商店","home.html","購物車","shoppingcart.html","歷史訂單","orderrecord.html","客服中心","#","登出","#"];
    }
    else if(userrole=="seller"){
        navbarelm=["我的商品","#","上架商品","publish.html","下架商品","#","客服中心","#","登出","#"]
    }
    else{
        navbarelm=["商店","home.html","客服中心","#","登入","login.html"];
    }
    for(var i=0;i<navbarelm.length;i=i+2){
        var li =
        $("<li/>", {
            class: "nav-item"
        });
        var a =
        $("<a/>", {
            class: "nav-link",
            href: navbarelm[i+1],
            text: navbarelm[i]
        });
        if(pagename==navbarelm[i+1]){
            a.addClass("currentpage");
        }
        li.append(a);
        $("#topnavbar").append(li);
    }
};
$(function(){
    createTopNavbar();
    $('a:contains("登出")').on("click", function(){
        $.ajax({
            type: 'POST',
            async: false,
            url: '../php/login.php',
            dataType: 'json',
            data: {request: 'logout'},
            success: function(data){
                if(data.msg=="success"){
                    alert("登出成功");
                    window.location.href="home.html";
                }
            }
        });
    });
});