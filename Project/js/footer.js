// <footer class="mt-3 py-5 bg-dark">
//   <div class="container">
//     <p class="m-0 text-center text-white">Copyright &copy; GAMELAB</p>
//   </div>
// </footer>

function createFooter() {
  var pagename = window.location.pathname.split("/").pop().toLowerCase();
  if ($("#content").height() < $(window).height()) {
    $("body").css({ height: "100%" });
    $("#body").css({ height: "100%" });
    $("#content").css({ height: "100%" });
  }
  var footer = $("<footer/>", {
    class: "mt-3 py-5 bg-dark",
  });
  var div = $("<div/>", {
    class: "container",
  });
  var p = $("<p/>", {
    class: "m-0 text-center text-white",
    text: "Copyright © GAMLAB",
  });
  div.append(p);
  footer.append(div);
  $("#body").append(footer);
}

$(function () {
  createFooter();
});
