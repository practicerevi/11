<!--//
/**********************************************************************
* Start Jquery
**********/
$(function(){
	/** Language Change */
		$(document).on("change", "select[name=fancySelect]", function(){
			location.href='#lang=' + $(this).val();
			//return true;
			//set_language_change('en');
		});
		$(document).on("change", "select[name=fancySelect2], select[name=mem_language]", function(){
			location.href='#lang=' + $(this).val();
			//return true;
			//set_language_change('en');
		});
		$("select[name=fancySelect]").each(function(){
			var src = $(this).find("option:selected").data("icon");
			var txt = $(this).find("option:selected").data("html-text");
			$("#selectBox>img").attr("src", src);
			$("#selectBox>span").html(txt);
		});
	/** Copy text */
		$(document).on("click", ".copytext", function(e){
			/*
			var str1 = $(this).attr("copytext1");
			var str2 = $(this).attr("copytext2");
			var str = str1 + "\r\n" + str2;
			*/
			var $OBJ = $(this);
			var str = $OBJ.attr("copytext");
			if( str.copytext() ) { $OBJ.addClass("active"); }else{ $OBJ.addClass("inactive"); }
			setTimeout(function(){ $OBJ.removeClass("active inactive"); }, 700);
			return false;
		});
	/** BACKGROUND action */
		$(document).on("click", "#screen-bg", function(e) {
			popup_action_close();
			$(".layer-popup-container").addClass('close');
		});
	/** SHOPPING CATEGORY */
		$(document).on("click", ".category-select", function(e) {
			act_category_list();
		});
	/** PUSH ACTION */
		$(document).on("click", "a.push_menu", function(e) {
			act_active_action("."+$(this).attr("name"));
		});
		$(document).on("click", "button.push_close", function(e) {
			act_active_action("."+$(this).attr("name"), true);
		});
		$(document).on("click", "button.btn_push_delete", function(){
			set_loading(true);
			var pid=$(this).data("id");
			if( IS_CONSOLE ) console.log("push id", pid);
			$(".push_id_"+pid).remove();
			var push_list_len = $(".push_list_msg").length/2;
			$(".push_menu > .push_int").html(push_list_len);
			$(".push_menu > .push_int2").html("("+push_list_len+")");
			if( push_list_len == 0 ) {
				$(".push_menu > .push_int, .push_menu > .push_int2").addClass("hide");
				$(".push-body").html("<dl><div class=\"no-data\">"+G_NO_DATA+"</div></dl>");
			}
			$.post("/member/proc/push/delete", { push_id : pid }, function(data){
				if( data.code == 0 ) {
					if( data.message ) alert_ok(data.message);
				} else {
					if( data.message ) alert_error(data.message);
				}
				set_loading(false);
			});
			if( IS_CONSOLE ) console.log("push length", $(".push_list_msg").length);
		});
	/** hash */
		initHASH();
});

/**********************************************************************
* PAGE FUNCTION SCRIPT
**********/
	/** active action */
		function act_active_action(nm, close) {
			var close = close ? close : false;
			if( $(nm).hasClass("active") || close == true){
				$(nm).removeClass("active");
			} else {
				$(nm).addClass("active");
			}
		}
	/** set_loading */
		function set_loading(chk) {
			var chk = chk ? chk : false;
			if( chk ) {
				$("#screen-loading").addClass('active');
			} else {
				$("#screen-loading").removeClass('active');
			}
		}
	/** act_wegift_list */
		function act_wegift_list(n, s){
			var c_txt = n ? n : '';
			var s_txt = s ? s : '';
			c_txt = c_txt.replaceAll("+"," ");
			c_txt = decodeURIComponent(c_txt);
			var title_txt = c_txt;
			if( s_txt ) {
				s_txt = decodeURIComponent(s_txt);
				title_txt = '"'+s_txt+'" 검색결과';
			}
			$(".content-list-wrap>.list-head-warp>.list-head-title>h3>span").html(title_txt);
			try{ get_wegift_first(c_txt,s_txt); } catch(e) {}
			return false;
			//top.location.href='?category='+encodeURIComponent(c_txt);
		}
	/** shopping wegift category action */
		function act_category_list(chk){
			var chk = chk ? chk : '';
			if( chk == true || $(".category-select").hasClass("active") ) {
				if( IS_CONSOLE ) console.log("act_category_list", "CLOSE");
				$(".category-select").removeClass("active");
				$(".category-select > ul > li").removeClass("active");
				$(".category-menu-wrap").removeClass("active");
			} else {
				if( IS_CONSOLE ) console.log("act_category_list", "OPEN");
				$(".category-select").addClass("active");
				$(".category-select > ul > li").addClass("active");
				$(".category-menu-wrap").addClass("active");
			}
		}
	/** form error check */
		function get_form_text_check(text, chk){
			var chk = chk ? chk : '';
			var ret = '';
			if( chk == "password" ) {
				ret = text.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, '');
			}
			else if( chk == "pincode" ) {
				ret = text.replace(/[^a-zA-Z0-9]/gi, '');
			}
			else if( chk == "refercode" ) {
				ret = text.replace(/[^0-9\-]/gi, '');
			}
			else if( chk == "number" ) {
				ret = text.replace(/[^0-9]/gi, '');
			}
			return ret;
		}

/**********************************************************************
* Alert SCRIPT
**********/
	function alert_ok(msg) {
		$.alert(msg);
		return false;
	}
	function alert_error(msg) {
		$.alert_error(msg);
		return false;
	}

/**********************************************************************
* Hash to SCRIPT
**********/
	function tabs_action(n, obj) {
		var obj = obj ? obj : '';
		$("div.send-wrap").removeClass('active');
		$("#"+n).fadeIn("slow", function(){ $(this).addClass('active').removeAttr("style"); });
		$("button.send-tab-item").removeClass('active');
		$("button.send-tab-item.list-"+n).addClass('active');
	}
	function popup_action(n, obj) {
		var obj = obj ? obj : '';
		$(".layer-popup-container").addClass('close');
		if( n == "close" ) {
			popup_action_close();
			$("#screen-loading").removeClass('active');
			$("#screen-bg").removeClass('active');
		} else {
			if( n == "terms-privacy" ) {
				popup_action_open(n);
			} else {
				LAYER_HTML[n] = LAYER_HTML[n] ? LAYER_HTML[n] : $("#"+n).html();
				$("#"+n).html(LAYER_HTML[n]).addClass('active').removeClass('close');
				try{ $("#"+n).find("input[type=text], input[type=email], input[type=password]").eq(0).focus(); } catch(e) {}
			}
			$("#screen-bg").addClass('active');
		}
	}
	function popup_action2(n, obj) {
		var obj = obj ? obj : '';
		$(".layer-popup-container").addClass('close');
		if( n == "close" ) {
			popup_action_close();
			$("#screen-loading").removeClass('active');
			$("#screen-bg").removeClass('active');
		} else {
			popup_action_open(n);
			$("#screen-bg").addClass('active');
		}
	}
	function popup_action_open(n){
		$("#"+n).addClass('active').removeClass('close');;
	}
	function popup_action_close(){
			$(".layer-popup-container").fadeOut("slow", function(){ $(this).removeClass('active').removeAttr("style"); });
			$(".menuopen, .menuopen p, .push-message, .push-message1, #gnb-total, #screen-bg").removeClass('active');
	}

/**********************************************************************
* Ajax SCRIPT
**********/
	function createData(obj) {
		// 1. 자바스크립트 객체 형태로 전달
		//var sendData = {name:$('#name').val(), email:$('#email').val()};
		// 2. jQuery serialize함수를 사용해서 전달
		var sendData = $(obj).serialize();
		if( IS_CONSOLE ) console.log(sendData);
		return sendData;
		// 3. 객체를 json 문자열로 만들어서 전달
		//var sendData = JSON.stringify({name:$('#name').val(), email:$('#email').val()});
		//console.log(sendData);
		//return {"data" : sendDta};
	}
	function actSubmit(obj, issync) {
		var issync = issync ? false : true;
		set_loading(true);
		if( IS_CONSOLE ) console.log("주소", $(obj).attr("action"));
		$.ajax({ url : $(obj).attr("action"), type: $(obj).attr("method"), data: createData(obj), dataType:"json"
			, async: issync
			, success : ajx_actSuccess
			, error: ajx_actSuccess
		});
		return false;
	}
	function ajx_actSuccess(data, status, xhr) {
		if( IS_CONSOLE ) console.log("RESULT : ", data);
		if( data.code == 0 ) {
			try{ set_form_action_process(data); } catch(e) {
				if( data.message ) alert_ok(data.message);
				if( data.gourl=='reload' ) { top.location.reload(); }
				else if( data.gourl ) { location.href = data.gourl; }
			}
			set_loading(false);
			return true;
		} else {
			try{ set_form_action_process(data); } catch(e) {
				if( data.message ) alert_ok(data.message);
				if( data.gourl=='reload' ) { top.location.reload(); }
				else if( data.gourl ) { location.href = data.gourl; }
			}
			set_loading(false);
			return false;
		}
	}
	function ajx_actError(jqXHR, textStatus, errorThrown) {
		if( IS_CONSOLE ) console.log("ERROR : ", jqXHR);
		alert_error(G_invalid_request+" [#error]");
		return false;
		//console.log(jqXHR.responseText);
	}

/**********************************************************************
* COOKIE
**********/
	/** set_cookie */
		function set_cookie(name, value, expirehours, domain)
		{
			var domain = domain ? domain : '';
			var today = new Date();
			//var name = 'dnl_' + name;
			today.setTime(today.getTime() + (60*60*1000*expirehours));
			document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
			if (domain) {
				document.cookie += "domain=" + domain + ";";
			}
		}
	/** get_cookie */
		function get_cookie(name)
		{
			var find_sw = false;
			var start, end;
			var i = 0;
			//var name = 'dnl_' + name;
			for (i=0; i<= document.cookie.length; i++)
			{
				start = i;
				end = start + name.length;

				if(document.cookie.substring(start, end) == name)
				{
					find_sw = true
					break
				}
			}
			if (find_sw == true)
			{
				start = end + 1;
				end = document.cookie.indexOf(";", start);

				if(end < start)
					end = document.cookie.length;

				return unescape(document.cookie.substring(start, end));
			}
			return "";
		}
	/** delete_cookie */
		function delete_cookie(name)
		{
			var today = new Date();

			today.setTime(today.getTime() - 1);
			var value = get_cookie(name);
			//var name = 'dnl_' + name;
			if(value != "")
				document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
		}
	/** language set_cookie */
		function set_language_change(lang) {
			$.cookie("language", lang, {expires: 365, path: "/"});
		}

/**********************************************************************
* SHOW HTML
**********/
try{
if( $(".push-body").length ) {
	$.ajax({ url : "/member/proc/push/list", type: "post", data: {}, dataType:"json"
			, async: true
			, success : function(data, status, xhr) {
				if( IS_CONSOLE ) console.log("RESULT : ", data);
				if( data.code == 0 ) {
					if( data.total == 0 ) {
						$(".push_menu > .push_int, .push_menu > .push_int2").html(data.total).addClass("hide");
						$(".push-body").html("<dl><div class=\"no-data\">"+G_NO_DATA+"</div></dl>");
					} else {
						$(".push_menu > .push_int").html(data.total).removeClass("hide");
						$(".push_menu > .push_int2").html("("+data.total+")").removeClass("hide");
						for(var a=0;a<data.lists.length;a++){
							var html = show_push_html(data.lists[a]);
							$(".push-body").append(html);
						}
					}
					$(".push-body").mCustomScrollbar({axis:"y",theme:"minimal-dark",advanced:{autoExpandHorizontalScroll:true}});
					return true;
				} else {
					if( data.message ) alert_ok(data.message);
					if( data.gourl=='reload' ) { top.location.reload(); }
					else if( data.gourl ) { location.href = data.gourl; }
					return false;
				}
			}
			, error: function(jqXHR, textStatus, errorThrown) {
				if( IS_CONSOLE ) console.log("ERROR : ", jqXHR);
				$(".push_menu > .push_int, .push_menu > .push_int2").html("").addClass("hide");
				$(".push-body").html("<dl><div class=\"no-data\">"+G_NO_DATA+"</div></dl>");
				//alert_error(G_invalid_request+" [#error]");
				return false;
				//console.log(jqXHR.responseText);
			}
	});
}
} catch(e) {}

function show_push_html(data){
	var html = '';
		html += '<dl class="push_list_msg push_id_'+data.id+'">';
		html += '<dt>'+data.subject+'</dt>';
		html += '<dd>'+data.sender+'</dd>';
		html += '<dd class="del">';
		html += '<button type="button" class="btn_push_delete" data-id="'+data.id+'">×</button>';
		html += '</dd>';
		html += '</dl>';
	return html;
}
function show_wegift_html(data) {

	var krw = data.krw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	var html = '';
	html += '<article class="list-item item-type-01 btn_item_buy hide" data-goods_id="' + data.gid + '" style="display:none;">';
	html += '<span><a class="txt-white">'+BTN_BUY_TEXT+'</a></span>';
	html += '<dl>';
	html += '<dt><picture><img src="' + data.img + '" alt="item-img" /></picture></dt>';
	html += '<dd><h6>' + data.aff + '</h6></dd>';
	html += '<dd><p>' + data.nm + '</p></dd>';
	html += '<dd style="display:none"><strong>' + data.wem + '</strong><em>WEPS</em></dd>';
	html += '<dd><strong class="list_krw">' + krw + '</strong><em>KRW</em></dd>';
	html += '</dl>';
	html += '</article>';

	console.log(data);

	return html;
}
//-->
