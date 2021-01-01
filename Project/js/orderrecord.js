// <div class="card mb-3">
//   <div class="card-body" style="text-align: center;">
//     <h5 class="card-title">Card title</h5>
//     <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//     <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
//   </div>
// </div>

// <div class="card mb-3">
//   <div class="row no-gutters">
//     <div class="col-md-4 d-flex align-items-center">
//       <img src="./img/Among Us.jpg" class="card-img" alt="...">
//     </div>
//     <div class="col-md-8">
//       <div class="card-body">
//         <h5 class="card-title" style="margin-bottom:0.75rem;">Card title</h5>
//         <p class="card-text" style="margin-bottom:0.25rem;">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//         <p class="card-text" style="margin-bottom:0.25rem;">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
//       </div>
//     </div>
//   </div>
// </div>
$(function () {
  var orderdata;
  var userno;
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
    url: "../php/orderrecord.php",
    dataType: "json",
    data: { request: "checkOrderRecord", userno: userno },
    success: function (data) {
      orderdata = data.data;
      n = orderdata.length;
    },
  });
  for (var i = n - 1; i >= 0; i--) {
    var div1 = $("<div/>", {
      name: "showorderlist",
      id: orderdata[i].Order_No,
      class: "card mb-3",
      style: "cursor:pointer",
    });
    var div2 = $("<div/>", {
      id: "div2-" + orderdata[i].Order_No,
      class: "card-body",
      style: "text-align: center",
    });
    if (orderdata[i].Finished == 1) {
      var h31 = $("<h3/>", {
        class: "card-title",
        style: "margin-bottom:0.75rem;Color:#00FF00;",
        text: "訂單編號：" + orderdata[i].Order_No,
      });
    } else {
      var h31 = $("<h3/>", {
        class: "card-title",
        style: "margin-bottom:0.75rem;Color:#FF0000;",
        text: "訂單編號：" + orderdata[i].Order_No,
      });
    }
    var p1 = $("<p/>", {
      class: "card-text",
      style: "font-size: 20px;margin-bottom:0.25rem;",
      text: "訂單日期：" + orderdata[i].Date,
    });
    var p2 = $("<p/>", {
      class: "card-text",
      style: "font-size: 20px;margin-bottom:0.25rem;",
      text: "付款金額：NT$" + orderdata[i].Price,
    });
    var p3 = $("<p/>", {
      class: "card-text",
      style: "font-size: 20px;margin-bottom:0.25rem;",
      text: "優惠折抵：NT$" + orderdata[i].Coupon_Amount,
    });
    div2.append(h31);
    div2.append(p1);
    div2.append(p2);
    div2.append(p3);
    div1.append(div2);
    $("#content-OrderRecord").append(div1);
  }

  $('[name="showorderlist"]').on("click", function () {
    if ($("#div2-" + $(this).attr("id")).children("#div3").length > 0) {
      $("#div2-" + $(this).attr("id"))
        .children("#div3")
        .remove();
      if ($("#content").height() < $(window).height()) {
        $("body").css({ height: "100%" });
        $("#body").css({ height: "100%" });
        $("#content").css({ height: "100%" });
      }
    } else {
      var gamedata;
      var listdiv;
      n = 0;
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/orderrecord.php",
        dataType: "json",
        data: { request: "getOrderlist", orderno: $(this).attr("id") },
        success: function (data) {
          gamedata = data.data;
          n = gamedata.length;
        },
      });
      if (n > 0) {
        listdiv = $("<div/>", {
          id: "div3",
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
          src: gamedata[i].ImageURL,
          class: "card-img w-100 h-100",
        });

        var div4 = $("<div/>", {
          class: "col-md-8",
        });

        var div5 = $("<div/>", {
          class: "card-body text-left",
          style: "color:#acb2b8;",
        });

        var h51 = $("<h5/>", {
          class: "card-title",
          style: "margin-bottom:0.75rem;",
          text: gamedata[i].Name,
        });

        var p1 = $("<p/>", {
          class: "card-text",
          style: "margin-bottom:0.25rem;",
          text: gamedata[i].Description,
        });

        var p2 = $("<p/>", {
          class: "card-text",
          text: "NT$：" + gamedata[i].Price,
        });
        div5.append(h51);
        div5.append(p1);
        div5.append(p2);
        div4.append(div5);
        div3.append(img1);
        div2.append(div3);
        div2.append(div4);
        div1.append(div2);
        listdiv.append(div1);
      }
      $("#div2-" + $(this).attr("id")).append(listdiv);
      if ($("#content-OrderRecord").height() > $(window).height()) {
        if (typeof $("#content").attr("style") != typeof undefined) {
          $("body").removeAttr("style");
          $("#body").removeAttr("style");
          $("#content").removeAttr("style");
        }
      }
    }
  });
});
