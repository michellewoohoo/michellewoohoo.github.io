/**
 * ucinetid.js
 */
Drupal.behaviors.ucinetid = function(context) {
  var fuser = $('#user-login');
  var fuci = $('#ucinetid-login-wrapper');

  if (fuser.length && fuci.length) {
    var tabs = $('.tabs:first'); // primary tabs

    var l = $('#ucinetid-links a', context).click(function() { // login using ucinetid
      fuser.hide();
      tabs.hide();
      $("div.messages.error").hide();
      fuci.show();
      $("#edit-ucinetid").focus();
      return false;
    });

    $('#ucinetid-user-login-cancel a', context).click(function() {  // cancel ucinetid login
      tabs.show();
      fuser.show();
      $("div.messages.error").show();
      fuci.hide();
      $("#edit-name").focus();
      return false;
    });

    if (l && Drupal.settings.ucinetid_login) {
      if (!$("#edit-name").hasClass('error')) {
        l.click();
      }
    }

  }

  // behavior for 'random password' link
  var d = $('#user-register #user-pass-generate', context);
  if (d.length) {
    d.show();
    d.find('a').click(function() {
      // var c = '!#$&()*+,-./0123456789:;=?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_abcdefghijklmnopqrstuvwxyz{|}~';
      var c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';  // base64
      var p = '';

      for (var i = 0; i < 16; i++) {
        p += c.charAt(Math.floor(Math.random() * c.length));
      }
      $('#edit-pass-pass1').val(p); // .blur() to run strength checker
      $('#edit-pass-pass2').val(p);
      $('#user-pass-plaintext').html(p);

      return false;
    });
  }
};

