(function ($) {
    "use strict";

    var input = $('.validate-input .input100');
    var mailvalidate = true;
    var passvalidate = true;

    $('.validate-form').on('submit',function(){
        var check = true;
        for(var i=0; i<input.length; i++) {
            if(!validate(input[i])){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/) == null) {
                mailvalidate = false;
                return false;
            }
        }
        else if($(input).val().trim() == ''){
            passvalidate = false;
            return false;
        }
        return true;
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        if($(input).attr('name') == 'email' && !mailvalidate) {
            input.value = '';
            mailvalidate = true
            var thisAlert = $(input).parent();
            $(thisAlert).removeClass('alert-validate');
        }
        if($(input).attr('name') == 'pass' && !passvalidate) {
            input.value = '';
            passvalidate = true
            var thisAlert = $(input).parent();
            $(thisAlert).removeClass('alert-validate');
        }
    }
})(jQuery);