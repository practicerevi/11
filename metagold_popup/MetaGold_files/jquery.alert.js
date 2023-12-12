(function($) {
    var error_icon = '<img src="/assets/images/common/icon_alert_01.png" alt="alert image" />';
    var check_icon = '<img src="/assets/images/common/icon_alert_02.png" alt="alert image" />';
    var close_button = '';

    /**
     * USE: $.alert('TEST!!');
     */
    $.alert = function(msg, callback) {
        var toast = new iqwerty.toast.Toast();
        toast.callback = callback;
        toast.setContent('<div class="alert-body blue"><i>' + check_icon + '</i><p>' + msg + '</p>' + close_button + '</div>').show();
    };

    /**
     * USE: $.alert_error('TEST!!');
     */
    $.alert_error = function(msg, callback) {
        var toast = new iqwerty.toast.Toast();
        toast.callback = callback;
        toast.setContent('<div class="alert-body red"><i>' + error_icon + '</i><p>' + msg + '</p>' + close_button + '</div>').show();
    };
})(jQuery);