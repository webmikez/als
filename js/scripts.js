new WOW().init();

window.onload = function(){
	$('#sites-slider').lemmonSlider({
		'infinite' : true
	});
    $('.timer').countTo();
}

$(function () {
	$(".slider li").mouseover(function() {
	 // $(".slider li .text").fadeIn(500);
	});
	$(".slider li").mouseleave(function() {
	 // $(".slider li .text").fadeOut(500);
	});
	
});

jQuery(document).ready(function() {
    var offset = 200;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.scroll-to-top').fadeIn(duration);
        } else {
            jQuery('.scroll-to-top').fadeOut(duration);
        }
    });

    jQuery('.scroll-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })

    var mainbottom = $('.menu-holder').offset().top;
	$(window).scroll(function () {
		if ($(this).scrollTop() > 0) {
			$('#scroller').fadeIn();
		} else {
			$('#scroller').fadeOut();
		}

        var stop = Math.round($(window).scrollTop());
        if (stop > mainbottom) {
            $('.menu-holder').removeClass('affix-top').addClass('affix');
        } else {
            $('.menu-holder').removeClass('affix').addClass('affix-top');
        }
	});
	
	$('#totop').click(function () {
		$('html, body').animate({scrollTop: 0}, 500);
		return false;
	});

    function scrollToHash(hash) {
        var target = hash,
            $target = $(target),
            offset_delta = 74;

        if(hash == '') return;

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - offset_delta
        }, 700, 'swing', function () {
            window.location.hash = target;
        });
    }

    $('#nav-holder a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        scrollToHash(this.hash);
    });

    $('form#commentform').on('submit', function() {
        $.ajax({
            'url': 'email.php',
            'type': 'POST',
            'data': $(this).serialize(),
            'dataType': 'json',
            'success': function(obj) {
                $('p.has-error').removeClass('has-error');

                if("status" in obj && obj.status == "success"){
                    alert('Успешно отправлено');
                } else {
                    if("error" in obj) {
                        alert(obj.error);
                    }

                    for (var p in obj) {
                        var el = $('#commentform #' + p);
                        el.parent().addClass('has-error');
                        el.next('span').html(obj[p]);
                    }
                }
            }
        });
        return false;
    });
});