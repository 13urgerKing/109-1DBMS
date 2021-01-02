// <li class="nav-item">
//     <a class="nav-link currentpage" href="#">商店</a>
// </li>

// <li class="nav-item">
//     <div style="position: relative;">
//         <a class="nav-link" href="#">商店</a>
//         <div class="toprightnumber">5</div>
//     </div>
// </li>

function createTopNavbar() {
  var num = 0;
  var userrole;
  var userno;
  var navbarelm;
  var pagename = window.location.pathname.split("/").pop().toLowerCase();
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
    url: "../php/login.php",
    dataType: "json",
    data: { request: "checkuserrole" },
    success: function (data) {
      userrole = data.userrole;
    },
  });
  if (userrole == "buyer") {
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/login.php",
      dataType: "json",
      data: { request: "getwallet" },
      success: function (data) {
        num = data.wallet;
      },
    });
    navbarelm = [
      "商店",
      "home.html",
      "購物車",
      "shoppingcart.html",
      "我的訂單",
      "orderrecord.html",
      "儲值",
      "deposit.html",
      "【餘額：NT$" + num.toString() + "】",
      null,
      "登出",
      "#",
    ];
  } else if (userrole == "seller") {
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/login.php",
      dataType: "json",
      data: { request: "getprofit" },
      success: function (data) {
        num = data.profit;
      },
    });
    navbarelm = [
      "我的商品",
      "myproduct.html",
      "新增商品",
      "publish.html",
      "訂單處理",
      "processorder.html",
      "收益：" + num.toString(),
      null,
      "登出",
      "#",
    ];
  } else {
    navbarelm = ["商店", "home.html", "客服中心", "#", "登入", "login.html"];
  }
  for (var i = 0; i < navbarelm.length; i = i + 2) {
    var li = $("<li/>", {
      class: "nav-item",
    });
    var a = $("<a/>", {
      class: "nav-link",
      href: navbarelm[i + 1],
      text: navbarelm[i],
    });
    if (pagename == navbarelm[i + 1]) {
      a.addClass("currentpage");
    }
    if (navbarelm[i] == "購物車") {
      var cartnum = 0;
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/shoppingCart.php",
        dataType: "json",
        data: { request: "getcartnum", userno: userno },
        success: function (data) {
          cartnum = data.cartnum;
        },
      });
      div1 = $("<div/>", {
        id: "navbar-shoppingcart",
        style: "position: relative;",
      });
      div1.append(a);
      if (cartnum > 0) {
        div2 = $("<div/>", {
          id: "cartnum",
          class: "toprightnumber",
          text: cartnum,
        });
        div1.append(div2);
        li.append(div1);
      } else {
        li.append(div1);
      }
    } else {
      li.append(a);
    }
    $("#topnavbar").append(li);
  }
}

$(function () {
  createTopNavbar();
  $('a:contains("登出")').on("click", function () {
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/login.php",
      dataType: "json",
      data: { request: "logout" },
      success: function (data) {
        if (data.msg == "success") {
          alert("登出成功");
          window.location.href = "home.html";
        }
      },
    });
  });
});
