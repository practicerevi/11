$(document).ready(function(){





  $(function(){
    $(window).scroll(function(){
      var winTop = $(window).scrollTop();
      if(winTop >= 1){
        $("header").addClass("active");
      }else{
        $("header").removeClass("active");
      }
    });
  });



  $("#copybtn").click(function(){
    copyToClipboard("#referees-code");
  });

  function copyToClipboard(element) {
    alert("Referees code copied");
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
  }


  /*************************************************************
   GNB 관련 스크립트
   **************************************************************/

  $(".menuopen").click(function () {
    if($(".menuopen, #gnb-total, #screen-bg").hasClass("active")){
      popup_action_close();
    } else {
      $(".menuopen, #gnb-total, #screen-bg").addClass("active");
      $(".menuopen p").addClass("active");
    }
  });





  /*************************************************************
   PUSH 관련 스크립트
   **************************************************************/

  $(".existence").click(function () {
    if($(".push-message").hasClass("active")){
      $(".push-message").removeClass("active");
    } else {
      $(".push-message").addClass("active");
    }
  });

  $(".push-message button").click(function () {
    $(".push-message").removeClass("active");
  });


  $(".existence1").click(function () {
    if($(".push-message1").hasClass("active")){
      $(".push-message1").removeClass("active");
    } else {
      $(".push-message1").addClass("active");
    }
  });

  $(".push-message1 button").click(function () {
    $(".push-message1").removeClass("active");
  });





  /*************************************************************
   Donation 관련 스크립트
   **************************************************************/

  $(".wem-info .donation dd").click(function () {
    if($(".donation-message").hasClass("active")){
      $(".donation-message").removeClass("active");
    } else {
      $(".donation-message").addClass("active");
    }
  });

  $(".donation-message button").click(function () {
    $(".donation-message").removeClass("active");
  });





  /*************************************************************
   POPUP 관련 스크립트
   **************************************************************/

  $(".btn-login").click(function () {
    if($("#pin-code").hasClass("active")){
      $("#pin-code, #screen-bg").removeClass("active");
    } else {
      $("#pin-code, #screen-bg").addClass("active");
    }
  });

  $(".btn-pin-find").click(function () {
    if($("#pin-sms").hasClass("active")){
      $("#pin-sms").removeClass("active");
    } else {
      $("#pin-sms").addClass("active");
      $("#pin-code").removeClass("active");
    }
  });

  $(".btn-sms-cancel").click(function () {
    if($("#pin-code").hasClass("active")){
      $("#pin-code").removeClass("active");
    } else {
      $("#pin-code").addClass("active");
      $("#pin-sms").removeClass("active");
    }
  });

  $(".btn-sms-ok").click(function () {
    if($("#pin-number").hasClass("active")){
      $("#pin-number").removeClass("active");
    } else {
      $("#pin-number").addClass("active");
      $("#pin-sms").removeClass("active");
    }
  });

  $(".popup-area .close").click(function () {
    $("#pin-code, #pin-sms, #pin-number, #event-detail, #terms-privacy, #screen-bg").removeClass("active");
  });

  $(".btn-pin-number").click(function () {
    location.href="pin_01.html";
  });





  /*************************************************************
   Notice 관련 스크립트
   **************************************************************/


    // Frequently Asked Question
  var article = $('#notice>ul>.article');
  article.addClass('hide-1');
  article.find('.notice-content').hide();
  article.eq(0).removeClass('hide-1');
  article.eq(0).find('.notice-content').show();
  $('#notice>ul>.article>.notice-title>a').click(function(){
    var myArticle = $(this).parents('.article:first');

    if(myArticle.hasClass('hide-1')){
//		$('#faq .faq-q a').addClass('show');
      article.addClass('hide-1').removeClass('show');
      article.find('.notice-content').slideUp(200);
      myArticle.removeClass('hide-1').addClass('show');
      myArticle.find('.notice-content').slideDown(200);
    } else {
//			$('#faq .faq-q a').addClass('hide');
      myArticle.removeClass('show').addClass('hide-1');
      myArticle.find('.notice-content').slideUp(200);
    }
    return false;
  });



});




/*************************************************************
 Top Button
 **************************************************************/

$(function() {
  $(".top-btn").on("click", function(e) {
    e.preventDefault();
    $("html, body").animate({scrollTop:0}, '500');
    return false;
  });
});













$(document).ready(function() {
  $(".list-item").click(function () {
    $(".list-item").removeClass("active");
    if($(this).hasClass("active")){
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
    }
  });



  $(".bt-changed-1").click(function () {
    $(".table-style-01").removeClass("active1");
    $(".table-style-01").removeClass("active2");
    if($(".table-style-01").hasClass("active1")){
      $(".table-style-01").removeClass("active1");
    } else {
      $(".table-style-01").addClass("active1");
    }
  });
  $(".bt-changed-2").click(function () {
    $(".table-style-01").removeClass("active1");
    $(".table-style-01").removeClass("active2");
    if($(".table-style-01").hasClass("active2")){
      $(".table-style-01").removeClass("active2");
    } else {
      $(".table-style-01").addClass("active2");
    }
  });



  $(".send-coin-wrap > button").click(function () {
    $(".send-coin-wrap > button").removeClass("active");
    if($(this).hasClass("active")){
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
    }
  });

});


function openBuy() {
  $('#layer-popup-buy').toggle(0, 'swing', function () {
    if ($('#layer-popup-buy').is(':visible') === true) {
      $('.layer-popup-area').addClass('active');
    } else {
      $('.layer-popup-area').removeClass('active');
    }
  });
}

function openBuyClose() {
  $('#layer-popup-buy').toggle(0, 'swing', function () {
    if ($('#layer-popup-buy').is(':visible') === true) {
      $(this).removeClass('active');
    }
  });
}

function alertClose() {
  $('.alert-wrap').toggle(0, 'swing', function () {
    if ($('.alert-wrap').is(':visible') === true) {
      $(this).removeClass('active');
    }
  });
}


function openPopup(id) {
  let popupTarget = document.getElementById(id);
  $(popupTarget).toggle(0, 'swing', function () {
    if ($(popupTarget).is(':visible') === true) {
      $(this).addClass('active');
    } else {
      $(this).removeClass('active');
    }
  });
}
function openPopupClose(id) {
  let popupTarget = document.getElementById(id);
  $(popupTarget).toggle(0, 'swing', function () {
    if ($(popupTarget).is(':visible') === true) {
      $(popupTarget).removeClass('active');
    }
  });
}


/*

function open_popup(content_target) {
  var open_contents_target = $('.popup-body > div[class$=\'' + content_target + '\']');
  $('.popup-contents').removeClass('active');

  $('#layer-popup').toggle(0, 'swing', function () {
    if ($('#layer-popup').is(':visible') === true) {
      $('.layer-popup-area').addClass('active');
    } else {
      $('.layer-popup-area').removeClass('active');
    }
    if (!$(open_contents_target).hasClass('active')) $(open_contents_target).addClass('active');
  });
}

function open_change_contents(content_target) {
  var open_contents_target = $('.popup-body > div[class$=\'' + content_target + '\']');
  $('.popup-contents').removeClass('active');
  if (!$(open_contents_target).hasClass('active')) $(open_contents_target).addClass('active');
}
*/

function openTab1(evt, tab) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName('send-wrap');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }

  tablinks = document.getElementsByClassName('send-tab-item');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }

  document.getElementById(tab).style.display = 'block';
  evt.currentTarget.className += ' active';
}


