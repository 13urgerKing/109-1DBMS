$(function () {
  var userno;
  var orderno;
  var n = 0;
  var finishorder;
  var processorder;
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
    url: "../php/processorder.php",
    dataType: "json",
    data: { request: "getorderno" },
    success: function (data) {
      orderno = data.data;
      n = orderno.length;
    },
  });
  for (var i = n - 1; i >= 0; i--) {
    if (orderno[i].Finished == true) {
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/processorder.php",
        dataType: "json",
        data: { request: "processfinishorder", orderno: orderno[i].Order_No },
        success: function (data) {
          finishorder = data.data;
        },
      });
      var div1 = $("<div/>", {
        class: "card mb-3",
        style: "cursor:pointer",
      });
      var div2 = $("<div/>", {
        class: "card-body",
        style: "text-align: center",
      });
      var h31 = $("<h3/>", {
        class: "card-title",
        style: "margin-bottom:0.75rem;Color:#00FF00;",
        text: "訂單編號：" + finishorder[0].Order_No,
      });
      var p1 = $("<p/>", {
        class: "card-text",
        style: "font-size: 20px;margin-bottom:0.25rem;",
        text: "訂單日期：" + finishorder[0].Date,
      });
      var p2 = $("<p/>", {
        class: "card-text",
        style: "font-size: 20px;margin-bottom:0.25rem;",
        text: "金額：NT$" + finishorder[0].Price,
      });
      div2.append(h31);
      div2.append(p1);
      div2.append(p2);
      div1.append(div2);
      $("#content-ProcessOrder").append(div1);
    } else if (orderno[i].Finished == false) {
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/processorder.php",
        dataType: "json",
        data: {
          request: "processorder",
          orderno: orderno[i].Order_No,
        },
        success: function (data) {
          processorder = data.data;
          n = processorder.length;
        },
      });
      var div1 = $("<div/>", {
        class: "card mb-3",
        style: "cursor:pointer",
      });
      var div2 = $("<div/>", {
        class: "card-body",
        style: "text-align: center",
      });
      var h31 = $("<h3/>", {
        class: "card-title",
        style: "margin-bottom:0.75rem;Color:#FF0000;",
        text: "訂單編號：" + orderno[i].Order_No,
      });
      var p1 = $("<p/>", {
        class: "card-text",
        style: "font-size: 20px;margin-bottom:0.25rem;",
        text: "訂單日期：" + processorder[0].Date,
      });
      var p2 = $("<p/>", {
        class: "card-text",
        style: "font-size: 20px;margin-bottom:0.25rem;",
        text: "金額：NT$" + processorder[0].Order_Price,
      });
      var btn1 = $("<button/>", {
        class: "cart-btn btn-lg btn-block",
        style: "border-style: none!important;cursor: pointer;",
        id: orderno[i].Order_No,
        text: "確認訂單",
        name: "updateorder",
      });
      div2.append(h31);
      div2.append(p1);
      div2.append(p2);
      for (j = 0; j < n; j++) {
        var div3 = $("<div/>", {
          class: "card my-3",
          style:
            "border-style: none!important;color: #16202d!important;background-color: rgba(0,0,0,0)!important;",
        });
        var div4 = $("<div/>", {
          class: "row no-gutters",
        });
        var div5 = $("<div/>", {
          class: "col-md-4 d-flex align-items-center",
        });
        var img1 = $("<img/>", {
          src: processorder[j].ImageURL,
          class: "card-img w-100",
        });
        var div6 = $("<div/>", {
          class: "col-md-8",
        });
        var div7 = $("<div/>", {
          class: "card-body text-left",
          style: "color:#acb2b8;",
        });
        var h51 = $("<h5/>", {
          class: "card-title",
          style: "margin-bottom:0.75rem;",
          text: processorder[j].Name,
        });
        var p3 = $("<p/>", {
          class: "card-text",
          style: "font-size: 20px;margin-bottom:0.25rem;",
          text: processorder[j].Description,
        });
        var p4 = $("<p/>", {
          class: "card-text",
          text: "NT$: " + processorder[j].Price,
        });
        div7.append(h51);
        div7.append(p3);
        div7.append(p4);
        div6.append(div7);
        div5.append(img1);
        div4.append(div5);
        div4.append(div6);
        div3.append(div4);
        div2.append(div3);
      }
      div2.append(btn1);
      div1.append(div2);
      $("#content-ProcessOrder").append(div1);
    }
  }
  $('[name="updateorder"]').on("click", function () {
    var orderno = $(this).attr("id");
    var result;
    var profit = 0;
    var sales;
    var n = 0;
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/processorder.php",
      dataType: "json",
      data: { request: "updateorder", orderno: orderno },
    });
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/processorder.php",
      dataType: "json",
      data: { request: "getprofit", orderno: orderno },
      success: function (data) {
        result = data.data;
        profit = result[0].Price;
      },
    });
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/processorder.php",
      dataType: "json",
      data: { request: "updateprofit", userno: userno, profit: profit },
    });
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/processorder.php",
      dataType: "json",
      data: { request: "getsalesamount", orderno: orderno },
      success: function (data) {
        sales = data.data;
        n = sales.length;
      },
    });
    for (i = 0; i < n; i++) {
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/processorder.php",
        dataType: "json",
        data: {
          request: "updatesalesamount",
          gameno: sales[i].Game_No,
          amount: sales[i].Amount,
        },
      });
    }
    window.location.reload();
  });
});
// <div class="card mb-3">
//     <div class="row no-gutters">
//       <div class="col-md-4 d-flex align-items-center">
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
