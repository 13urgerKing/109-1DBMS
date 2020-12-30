// <footer class="mt-3 py-5 bg-dark">
//   <div class="container">
//     <p class="m-0 text-center text-white">Copyright &copy; GAMELAB</p>
//   </div>
// </footer>

function createFooter() {
  var footer = $("<footer/>", {
    class: "mt-3 py-5 bg-dark",
  });
  var div = $("<div/>", {
    class: "container",
  });
  var p = $("<p/>", {
    class: "m-0 text-center text-white",
    text: "Copyright © GAMELAB",
  });
  div.append(p);
  footer.append(div);
  $("#body").append(footer);
}

$(function () {
  createFooter();
});
