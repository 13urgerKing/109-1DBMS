// (function($) {
//     var CheckboxDropdown = function(el) {
//         var _this = this;
//         this.isOpen = false;
//         this.areAllChecked = false;
//         this.$el = $(el);
//         this.$label = this.$el.find('.dropdown-label');
//         this.$inputs = this.$el.find('[type="checkbox"]');

//         this.onCheckBox();
        
//         this.$label.on('click', function(e) {
//         e.preventDefault();
//         _this.toggleOpen();
//         });
        
//         this.$inputs.on('change', function(e) {
//         _this.onCheckBox();
//         });
//     };
    
//     CheckboxDropdown.prototype.onCheckBox = function() {
//         this.updateStatus();
//     };
    
//     CheckboxDropdown.prototype.updateStatus = function() {
//         var checked = this.$el.find(':checked');
        
//         this.areAllChecked = false;
        
//         if(checked.length <= 0) {
//             this.$label.html('選擇分類');
//         }
//         else if(checked.length === 1) {
//             this.$label.html(checked.parent('label').text());
//         }
//         else if(checked.length === this.$inputs.length) {
//             this.$label.html('All Selected');
//             this.areAllChecked = true;
//         }
//         else {
//             this.$label.html(checked.length + ' Selected');
//         }
//     };
    
//     CheckboxDropdown.prototype.toggleOpen = function(forceOpen) {
//         var _this = this;

//         if(!this.isOpen || forceOpen) {
//             this.isOpen = true;
//             this.$el.addClass('open');
//         $(document).on('click', function(e) {
//             if(!$(e.target).closest('[data-control]').length) {
//                 _this.toggleOpen();
//             }
//         });
//         }
//         else {
//             this.isOpen = false;
//             this.$el.removeClass('open');
//             $(document).off('click');
//         }
//     };
    
//     var checkboxesDropdowns = document.querySelectorAll('[data-control="checkbox-dropdown"]');
//     for(var i = 0, length = checkboxesDropdowns.length; i < length; i++) {
//       new CheckboxDropdown(checkboxesDropdowns[i]);
//     }
// })(jQuery);

$(function(){
    $('input[type=radio][name=options]').change(function() {
        if (this.value == '單人') {
            console.log("單人");
        }
        else if (this.value == '多人') {
            console.log("多人");
        }
        else {
            console.log("玩家對戰");
        }
    });
});