/* <div class="card mb-3">
      <div class="card-body" style="text-align: center;">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div> */
$(function () {
  var shoppingCartData;
  var userno;
  var gamelistdiv;
  var coupondata;
  var couponlistdiv;
  var total;
  var couponid = null;
  var amount = 0;
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
    url: "../php/shoppingCart.php",
    dataType: "json",
    data: { request: "getshoppingcart", userno: userno },
    success: function (data) {
      shoppingCartData = data.data;
      n = shoppingCartData.length;
    },
  });

  $.ajax({
    type: "POST",
    async: false,
    url: "../php/shoppingCart.php",
    dataType: "json",
    data: { request: "gettotal", userno: userno },
    success: function (data) {
      total = data.total;
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
      src: shoppingCartData[i].ImageURL,
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
      text: shoppingCartData[i].Name,
    });

    var p1 = $("<p/>", {
      class: "card-text",
      style: "margin-bottom:0.25rem;",
      text: shoppingCartData[i].Description,
    });

    var p2 = $("<p/>", {
      class: "card-text",
      text: "NT$：" + shoppingCartData[i].Price,
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

  $.ajax({
    type: "POST",
    async: false,
    url: "../php/shoppingCart.php",
    dataType: "json",
    data: { request: "getcoupon", userno: userno },
    success: function (data) {
      coupondata = data.data;
      n = coupondata.length;
    },
  });

  if (n > 0) {
    couponlistdiv = $("<div/>", {
      id: "div-couponlist",
    });
  }

  for (var i = 0; i < n; i++) {
    var div1 = $("<div/>", {
      name: "div-coupon",
      id: coupondata[i].Coupon_No,
      class: "card my-3",
      style:
        "cursor: pointer;border-style: none!important;background-color: #16202d!important;",
    });

    var div2 = $("<div/>", {
      class: "row no-gutters",
    });

    var div3 = $("<div/>", {
      class: "col-md-4 d-flex align-items-center",
    });

    var img1 = $("<img/>", {
      src: "./img/coupon.jpg",
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
      text: "Coupon",
    });

    var p1 = $("<p/>", {
      class: "card-text",
      style: "margin-bottom:0.25rem;",
      text: "使用期限：" + coupondata[i].Expiry_date,
    });

    var p2 = $("<p/>", {
      class: "card-text",
      text: "NT$：" + coupondata[i].Amount,
    });
    div5.append(h51);
    div5.append(p1);
    div5.append(p2);
    div4.append(div5);
    div3.append(img1);
    div2.append(div3);
    div2.append(div4);
    div1.append(div2);
    couponlistdiv.append(div1);
  }

  $("#content-coupon").append(couponlistdiv);

  $("#payprice").text("付款金額：NT$" + total.toString());

  $('[name="div-coupon"]').on("click", function () {
    if ($(this).css("background-color") == "rgb(16, 24, 34)") {
      $(this).css({ "background-color": "#16202d" });
      couponid = null;
      amount = 0;
    } else {
      couponid = $(this).attr("id");
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: { request: "getcouponamount", couponid: couponid },
        success: function (data) {
          amount = data.amount;
        },
      });
      if (amount > total) {
        alert("使用優惠券後付款金額不可少於NT$0");
        amount = 0;
        couponid = null;
      } else {
        $('[name="div-coupon"]').each(function () {
          $(this).css({ "background-color": "#16202d" });
        });
        $(this).css({ "background-color": "#101822" });
      }
    }
    $("#payprice").text("付款金額：NT$" + (total - amount).toString());
    $("#couponprice").text("優惠折抵：NT$" + amount.toString());
  });

  $("#btn-deletecart").on("click", function () {
    n = 0;
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/shoppingCart.php",
      dataType: "json",
      data: { request: "getshoppingcart", userno: userno },
      success: function (data) {
        shoppingCartData = data.data;
        n = shoppingCartData.length;
      },
    });
    if (n > 0) {
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: { request: "deleteshoppingcart", userno: userno },
      });
      window.location.reload();
      alert("購物車已清空");
    } else {
      alert("購物車是空的");
    }
  });
  $("#btn-purchasecart").on("click", function () {
    n = 0;
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/shoppingCart.php",
      dataType: "json",
      data: { request: "getshoppingcart", userno: userno },
      success: function (data) {
        shoppingCartData = data.data;
        n = shoppingCartData.length;
      },
    });
    if (n > 0) {
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: { request: "gettotal", userno: userno },
        success: function (data) {
          total = data.total;
        },
      });
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: {
          request: "purchaseshoppingcart",
          userno: userno,
          total: total - amount,
          couponid: couponid,
        },
      });
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: { request: "deleteshoppingcart", userno: userno },
      });
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: { request: "updatecoupon", couponid: couponid },
      });
      window.location.reload();
      alert("購買成功!");
    } else {
      alert("購物車是空的");
    }
  });
});

/*  <div class="card mb-3">
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
    </div>  */
