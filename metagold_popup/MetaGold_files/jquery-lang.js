



$(document).ready(function(){

/*************************************************************
  언어선택 관련 스크립트
 **************************************************************/

	$('select.makeMeFancy').tzSelect({
		render : function(option){
			return $('<li>',{
				html:option.data('html-text')
			});
		},
		className : 'hasDetails'
	});

	// Calling the default version of the dropdown
	$('select.regularSelect').tzSelect();

});



