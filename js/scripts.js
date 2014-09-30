new WOW().init();

window.onload = function(){
	$('#sites-slider').lemmonSlider({
		'infinite' : false
	});
}

$(function () {
	$('#menu').stickyNavbar({
		animDuration: 700
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

    $('form#commentform').on('submit', function() {
        $.ajax({
            'url': 'email.php',
            'type': 'POST',
            'data': $(this).serialize(),
            'dataType': 'json',
            'success': function(obj) {
                if("status" in obj && obj.status == "success"){
                    alert('Успешно отправлено');
                } else {
                    for (var p in obj) {
                        $('form#commentform input[name="' + p + '"]]').parent().addClass('has-error');
                    }
                }
            }
        });
        return false;
    });
	
});