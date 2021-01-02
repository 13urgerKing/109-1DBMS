$(function () {
  ("use strict");
  var input = $(".validate-input .input100");
  var nameValidate = true;
  var priceValidate = true;
  var descriptionValidate = true;
  var linkValidate = true;

  $(".validate-form").on("submit", function () {
    var check = true;
    var msg = null;
    for (var i = 0; i < input.length; i++) {
      if (!validate(input[i])) {
        showValidate(input[i]);
        check = false;
      }
    }
    if (check) {
      $.ajax({
        type: "POST",
        async: false,
        url: "../php/publish.php",
        dataType: "json",
        data: {
          request: "publish",
          name: $(input[0]).val(),
          price: $(input[1]).val(),
          category: $("input[type=radio][name=options]:checked").val(),
          description: $(input[2]).val(),
          link: $(input[3]).val(),
        },
        success: function (data) {
          msg = data.msg;
        },
      });
    }
    if (msg == "success") {
      alert("上架成功!");
    } else {
      alert("上架失敗!");
    }
    return false;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("name") == "name") {
      if ($(input).val().trim() == "") {
        nameValidate = false;
        return false;
      }
    } else if ($(input).attr("name") == "price") {
      if ($(input).val().trim() == "") {
        priceValidate = false;
        return false;
      }
    } else if ($(input).attr("name") == "description") {
      if ($(input).val().trim() == "") {
        descriptionValidate = false;
        return false;
      }
    } else if ($(input).attr("name") == "link") {
      if ($(input).val().trim() == "") {
        linkValidate = false;
        return false;
      }
    }
    return true;
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();
    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    if ($(input).attr("name") == "name" && !nameValidate) {
      input.value = "";
      nameValidate = true;
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass("alert-validate");
    }
    if ($(input).attr("name") == "price" && !priceValidate) {
      input.value = "";
      priceValidate = true;
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass("alert-validate");
    }
    if ($(input).attr("name") == "description" && !descriptionValidate) {
      input.value = "";
      descriptionValidate = true;
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass("alert-validate");
    }
    if ($(input).attr("name") == "link" && !linkValidate) {
      input.value = "";
      linkValidate = true;
      var thisAlert = $(input).parent();
      $(thisAlert).removeClass("alert-validate");
    }
  }
});
