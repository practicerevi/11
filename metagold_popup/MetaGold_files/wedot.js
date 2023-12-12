$(function () {
	$('#wedot-front').click(function () {
		$('.popup_wrap').fadeIn(300);
		$('body').css("overflow","hidden");
	});
	$('#wedot-inner').click(function () {
		$('.popup_wrap').fadeOut(300);
		$('body').css("overflow","visible");
	});
	$('#wedot-search').click(function () {
		$('.popup_searching').fadeIn(100);
		$('body').css("overflow","visible");
	});
	$('.btn_search_close').click(function () {
		$('.popup_searching').fadeOut(100);
		$('body').css("overflow","hidden");
	});
});

var sApiUrl = "https://mall.mtgc.io";


(function($){

  $.fn.fullHeight = function(){
    var self = this;
    var windowHeight = $(window).height() - 190;

    var frameHeightFunction = function(){
      return self.each(function() {
        self.css({
          'height': windowHeight
        });
      });
    }
    $(window).on('resize', function(){
      windowHeight = $(window).height() - 190;
      frameHeightFunction();
    });
    frameHeightFunction();
    return self;
  }
})(jQuery);

var _TotalSearchHistoryCookieName = "TotalSearchHistory";
var _TotalSearchHistoryCookieSplit = "[,]";

$(document).ready(function() {
	$('.scroll_wrap').fullHeight();

	var sCookieValue = GetCookie(_TotalSearchHistoryCookieName);

	if (sCookieValue != "")
	{
		var sArrCv = sCookieValue.split(_TotalSearchHistoryCookieSplit);

		for (var i = 0; i < sArrCv.length; i++)
		{
			TotalSearchAddHistory(decodeURIComponent(sArrCv[i]));
		}
	}

	$(".popup_searching .popular").empty();
	var ajax = new Ajax();
	//ajax.ajax(sApiUrl + "/shop/totalsearch_popular.php", null, TotalSearchPopular, "post");
});

function TotalSearch()
{
	_StoreContent = "";
	$(".popup_searching .search_wrap").empty();

	if ($("#tbx_TotalSearchKey").val().split(" ").join("") == "")
	{
		return;
	}

	var cForm = document.createElement("form");
	var cHidden = document.createElement("input");

	cHidden.setAttribute("type", "hidden");
	cHidden.setAttribute("name", "key");
	cHidden.setAttribute("value", encodeURIComponent($("#tbx_TotalSearchKey").val()));

	cForm.appendChild(cHidden);

	var ajax = new Ajax();
	ajax.ajax(sApiUrl + "/shop/totalsearch_store.php", $(cForm), TotalSearchStore, "post");
	ajax.ajax(sApiUrl + "/shop/totalsearch_popularset.php", $(cForm), null, "post");

	TotalSearchAddHistory($("#tbx_TotalSearchKey").val());
}

function TotalSearchPopular(data, textStatus) {
	if (textStatus == "success") {
		var oJson = JSON.parse(data);

		var sItem = "";

		for (var i = 0; i < oJson.length; i++)
		{
			sItem += TotalSearchAddItem("javascript:TotalSearchExec('" + oJson[i].txt + "');", oJson[i].txt);
		}

		if (sItem != "")
		{
			$(".popup_searching .popular").append(TotalSearchShopAddCont(_LangText1, sItem));
		}
	}
}

var _StoreContent = "";

function TotalSearchStore(data, textStatus) {
	if (textStatus == "success") {
		var oJson = JSON.parse(data);

		for (var i = 0; i < oJson.length; i++)
		{
			_StoreContent += TotalSearchStoreAddItem(oJson[i].code, oJson[i].name, "/m/shop6.php");
		}
	}

	var cForm = document.createElement("form");
	var cHidden = document.createElement("input");

	cHidden.setAttribute("type", "hidden");
	cHidden.setAttribute("name", "key");
	cHidden.setAttribute("value", encodeURIComponent($("#tbx_TotalSearchKey").val()));

	cForm.appendChild(cHidden);

	var ajax = new Ajax();
	ajax.ajax(sApiUrl + "/shop/totalsearch_shop.php", $(cForm), TotalSearchShop, "post");
}

function TotalSearchShop(data, textStatus) {
	if (textStatus == "success") {
		var oJson = JSON.parse(data);

		var sShop_5 = "";
		var sShop_7 = "";
		var sShop_8 = "";
		var sShop_9 = "";

		for (var i = 0; i < oJson.length; i++)
		{
			switch (oJson[i].PlanTypeId)
			{
				case "5": sShop_5 += TotalSearchShopAddItem(oJson[i].ItemId, oJson[i].ItemName, "/m/shop.php"); break;
				case "7": sShop_7 += TotalSearchShopAddItem(oJson[i].ItemId, oJson[i].ItemName, "/m/shop3.php"); break;
				case "8": sShop_8 += TotalSearchShopAddItem(oJson[i].ItemId, oJson[i].ItemName, "/m/shop4.php"); break;
				case "9": sShop_9 += TotalSearchShopAddItem(oJson[i].ItemId, oJson[i].ItemName, "/m/shop5.php"); break;
			}
		}

		if (sShop_5 != "")
		{
			$(".popup_searching .search_wrap").append(TotalSearchShopAddCont(_LangText2, sShop_5));
		}

		if (_StoreContent != "")
		{
			$(".popup_searching .search_wrap").append(TotalSearchShopAddCont(_LangText3, _StoreContent));
		}

		if (sShop_9 != "")
		{
			$(".popup_searching .search_wrap").append(TotalSearchShopAddCont(_LangText4, sShop_9));
		}

		if (sShop_8 != "")
		{
			$(".popup_searching .search_wrap").append(TotalSearchShopAddCont(_LangText5, sShop_8));
		}

		if (sShop_7 != "")
		{
			$(".popup_searching .search_wrap").append(TotalSearchShopAddCont(_LangText6, sShop_7));
		}
	}

	if ($(".popup_searching .search_wrap").html() == "")
	{
		$(".popup_searching .search_wrap").append("<p class=\"no_result\">" + _LangText7 + "</p>");

		setTimeout(function () {
			$(".popup_searching .search_wrap .no_result").remove();
		}, 2000);
	}
}

function TotalSearchAddItem(sHref, sText) {
	return "<li><a href=\"" + sHref + "\"><em>·</em>" + sText + "</a></li>";
}

function TotalSearchStoreAddItem(sItemId, sItemName, sUrl) {
	return TotalSearchAddItem(sApiUrl + sUrl  + "?mq=franchise_view&id=" + sItemId, sItemName);
}

function TotalSearchShopAddItem(sItemId, sItemName, sUrl) {
	return TotalSearchAddItem(sApiUrl + sUrl  + "?smode=category_detail&id=" + sItemId + "&part_code=16", sItemName);
}

function TotalSearchShopAddCont(sTitle, sContent) {
	return "<div class=\"section list\"><h4 class=\"title\">" + sTitle + "</h4><ul class=\"list\">" + sContent + "</ul></div>";
}

function TotalSearchAddHistory(sStr) {

	if ($(".popup_searching .history ul a[data-checkstr='" + sStr + "']").length > 0)
	{
		return;
	}

	var sTarget = "<li><a href=\"javascript:void(0);\" onclick=\"TotalSearchExecHistory(this)\" data-checkstr=\"" + sStr + "\">" + sStr + "</a><input type=\"button\" class=\"del_tag\" value=\"닫기\" onclick=\"TotalSearchRemoveHistory(this)\"></li>";
	$(".popup_searching .history ul").append(sTarget);

	if ($(".popup_searching .history ul a").length > 5)
	{
		$(".popup_searching .history ul a").eq(0).parent().remove();
	}

	SetTotalSearchCookie();
}

function TotalSearchExec(sVal) {
	$("#tbx_TotalSearchKey").val(sVal);
	TotalSearch();
}

function TotalSearchExecHistory(cCon) {
	var sVal = $(cCon).html();
	TotalSearchExec(sVal);
}

function TotalSearchRemoveHistory(cCon) {
	$(cCon).parent().remove();
	SetTotalSearchCookie();
}

function SetTotalSearchCookie()
{
	var sCookieValue = "";

	for (var i = 0; i < $(".popup_searching .history ul a").length; i++)
	{
		sCookieValue += _TotalSearchHistoryCookieSplit + encodeURIComponent($(".popup_searching .history ul a").eq(i).html());
	}

	if (sCookieValue != "")
	{
		sCookieValue = sCookieValue.substr(_TotalSearchHistoryCookieSplit.length, sCookieValue.length - _TotalSearchHistoryCookieSplit.length);
	}

	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + 1 );
	document.cookie = _TotalSearchHistoryCookieName + "=" + sCookieValue + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

function GetCookie(sName) {
    return GetCookieProc(document.cookie, sName);
}

function Ajax() {

	this.post = function (url, frm, callback, type) {
		$.post(url, frm.serialize()+this.url_query, callback, type);
	};
	this.get = function (url, frm, callback, type) {
		$.get(url, frm.serialize()+this.url_query, callback, type);
	};
	this.ajax = function (url, frm, callback, methodType, url_query, type) {
		if(!type) type = "html";

		if(!url_query) url_query = "";
		this.url_query=url_query;

		if(methodType == "post")
			this.post(url, $(frm), callback, type);
		else
			this.get(url, $(frm), callback, type);
	};
}

function GetCookieProc(sCookieStr, sName) {
    var name = sName + "=";
    var ca = sCookieStr.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var _bFlagMouseDown = false;
var _PrevPositionX = null;
var _PrevPositionY = null;
var _bFlagWeDotMove = false;

$(document).ready(function() {
	$('.popup_wedot').bind('touchstart mousedown',function (e) {WedotWrapperMoveDown(e);});
	$('.popup_wedot').bind('touchend mouseup',function (e) {WedotWrapperMoveUp(e);});
	$('.popup_wedot').mouseout(function (e) {WedotWrapperMoveOut();});
	$('.popup_wedot').bind('touchmove mousemove', function (e) {WedotWrapperMoveMove(e);});
});

function WedotWrapperCheckClick(e)
{
	console.log("_bFlagWeDotMove : " + _bFlagWeDotMove);

	if (_bFlagWeDotMove)
	{
		return;
	}

	var cImgs = $(".popup_wedot .wedot-wrapper img");

	for (var i = 0; i < cImgs.length; i++)
	{
		var btnLeft = cImgs.eq(i).offset().left;
		var btnTop = cImgs.eq(i).offset().top;
		var bFlagLeft = false;
		var bFlagTop = false;
		btnTop = btnTop - $(document).scrollTop();

		if (GetClientX(e) >= btnLeft &&  GetClientX(e) <= (btnLeft + 70))
		{
			bFlagLeft = true;
		}

		if (GetClientY(e) >= btnTop &&  GetClientY(e) <= (btnTop + 70))
		{
			bFlagTop = true;
		}

		if (bFlagLeft && bFlagTop)
		{
			cImgs.eq(i).click();
			break;
		}
	}
}

function GetClientX(e)
{
	return e.originalEvent.touches ?  e.originalEvent.touches[0].clientX : e.clientX;
}

function GetClientY(e)
{
	return e.originalEvent.touches ?  e.originalEvent.touches[0].clientY : e.clientY;
}

function WedotWrapperMoveDown(e)
{
	_bFlagMouseDown = true;
	_bFlagWeDotMove = false;

	_PrevPositionX = GetClientX(e);
	_PrevPositionY = GetClientY(e);
}

function WedotWrapperMoveUp(e)
{
	WedotWrapperCheckClick(e);

	WedotWrapperMoveOut();
}

function WedotWrapperMoveOut()
{
	_bFlagMouseDown = false;
	_bFlagWeDotMove = false;
	_PrevPositionX = null;
	_PrevPositionY = null;
}

function WedotWrapperMoveMove(e)
{
	if (_bFlagMouseDown)
	{
		if (_PrevPositionX == null || _PrevPositionY == null)
		{
			_PrevPositionX = GetClientX(e);
			_PrevPositionY = GetClientY(e);
		}

		var iMoveLeft = false;
		var iPosCalc = (_PrevPositionX - GetClientX(e));
		var idegMin = 380;
		var idegMax = 360;
		var ideg = 320;
		//iPosCalc = iPosCalc / 30;

		var attr = $(".wedot-wrapper").attr("data-deg");
		if (typeof attr !== typeof undefined && attr !== false) {
			ideg = parseInt(attr);
		}

		var iPrevDeg = ideg;

		ideg = ideg - iPosCalc;

		if (iPosCalc > 0)
		{
			iMoveLeft = true;
		}

		if (iMoveLeft)
		{
			if (ideg < 300)
			{
				ideg = 300;
			}
		}
		else
		{
			if (ideg > idegMin)
			{
				ideg = idegMin;
			}
		}

		$(".wedot-wrapper").attr("data-deg", ideg.toString());

		if (ideg > 360)
		{
			ideg = ideg - 360;
		}

		var iPrevCalc = (ideg - iPrevDeg);

		if (iPrevCalc > 0 && iPrevCalc < 5)
		{
			return;
		}

		if (iPrevCalc < 0 && iPrevCalc > -5)
		{
			return;
		}

		$(".wedot-wrapper").css({
			"-webkit-transform": "rotate(" + ideg + "deg)",
			"-moz-transform": "rotate(" + ideg + "deg)",
			"transform": "rotate(" + ideg + "deg)" /* For modern browsers(CSS3)  */
		});

		_bFlagWeDotMove = true;

		//$("#div_test_info").append("<span>deg : " + ideg + " / _PrevPositionX : " + _PrevPositionX + " / e.clientX : " + GetClientX(e) + " / iMoveLeft : " + iMoveLeft + "</span><br>");
	}
}
