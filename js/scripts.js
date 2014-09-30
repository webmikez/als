new WOW().init();

window.onload = function(){
	$('#sites-slider').lemmonSlider({
		'infinite' : false
	});
}

$(function () {
	$('#menu').stickyNavbar({
		animDuration: 700,
        startAt: 208
	});
	
	
	$(".slider li").mouseover(function() {
	 // $(".slider li .text").fadeIn(500);
	});
	$(".slider li").mouseleave(function() {
	 // $(".slider li .text").fadeOut(500);
	});
	
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('#scroller').fadeIn();
		} else {
			$('#scroller').fadeOut();
		}
	});
	
	$('#totop').click(function () {
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});
	
});