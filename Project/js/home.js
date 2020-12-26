$("#a-Login").click(function(event){
    var msg;
    if($("#a-Login").text()=="登入"){
        document.location.href="./Login.html";
    }
    else{
        $.ajax({
            type: 'POST',
            async: false,
            url: '../Project/php/db.php',
            dataType: 'json',
            data: {request: 'logout'},
            success: function(data){
                msg=data.msg;
            }
        });
        if(msg=="success"){
            alert("登出成功");
            window.location.reload();
        }
    }
});
$(function(){
    var url = window.location.pathname;
    var pagename = url.substring(url.lastIndexOf('/') + 1);
    if(pagename=="Home.html"){
        var msg;
        var el=document.getElementById('a-Login');
        $.ajax({
            type: 'POST',
            async: false,
            url: '../Project/php/db.php',
            dataType: 'json',
            data: {request: 'checklogin'},
            success: function(data){
                msg=data.msg;
            }
        });
        if(msg == "login"){
            el.textContent='登出';
            el.href="#";
        }
        else{
            el.textContent="登入";
            el.href="#";
        }
    }
});