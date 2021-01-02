$(function () {
  $("#btn-deposit").on("click", function () {
    $.ajax({
      type: "POST",
      async: false,
      url: "../php/login.php",
      dataType: "json",
      data: {
        request: "deposit",
        value: $("#input-deposit").val(),
      },
    });
    window.location.reload();
  });
});
