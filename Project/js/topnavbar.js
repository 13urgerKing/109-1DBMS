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
  var userrole;
  var navbarelm;
  var pagename = window.location.pathname.split("/").pop().toLowerCase();
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
    navbarelm = [
      "商店",
      "home.html",
      "購物車",
      "shoppingcart.html",
      "我的訂單",
      "orderrecord.html",
      "客服中心",
      "#",
      "登出",
      "#",
    ];
  } else if (userrole == "seller") {
    navbarelm = [
      "我的商品",
      "#",
      "上架商品",
      "publish.html",
      "訂單處理",
      "#",
      "客服中心",
      "#",
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
        url: "../php/login.php",
        dataType: "json",
        data: { request: "getcartnum" },
        success: function (data) {
          cartnum = data.cartnum;
        },
      });
      if (cartnum > 0) {
        div1 = $("<div/>", {
          style: "position: relative;",
        });
        div2 = $("<div/>", {
          class: "toprightnumber",
          text: cartnum,
        });
        div1.append(a);
        div1.append(div2);
        li.append(div1);
      } else {
        li.append(a);
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
