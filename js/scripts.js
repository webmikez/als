new WOW().init();

window.onload = function(){
	$('#sites-slider').lemmonSlider({
		'infinite' : true
	});
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

$(function(){
    var $window = $(window);
    var timeStamp = new Date().getTime();
    var $header = $('#nav-holder');
    var $header_li = $header.find("ul#nav li a[href^='#']");
    var mainbottom = $header.offset().top;
    var stop = 0;
    var header_height = ($header.css('position') == 'fixed') ? Math.round($header.outerHeight(true)) : 0;
    $header_li.on('click',function(e){
        e.preventDefault();
        var hash = this.hash;
        var $this = $(this);
        var top = hash == '#about' ? 499 : Math.round($(hash).offset().top)-73;

        $('html, body').finish().animate({
            scrollTop: top
        },450,function(){
            $('li.active', $header).removeClass('active');
            $this.parent().addClass('active');
            //window.location.hash = hash;
        });
    });

    $window.on('load',function(){
        var hash = window.location.hash;

        if(hash == 'undefined') {
            var top = hash == '#about' ? 499 : Math.round($(hash).offset().top) - 73;

            $('html, body').finish().animate({
                scrollTop: top
            }, 450, function () {
                $('li.active', $header).removeClass('active');
                $header.find("ul#nav li a[href='" + hash + "']").parent().addClass('active');
                //window.location.hash = hash;
            });
        }
    });

    $window.on('scroll',function(){
        $this = $(this);
        stop = Math.round($(window).scrollTop());

        if (!$('.timer').hasClass('completed') && stop > $('#numbers').offset().top - 670) {
            $('.timer').countTo({
                onComplete: function (value) {
                    $(this).addClass('completed');
                }
            });
        }

        if (stop > mainbottom) {
            $('body').addClass('push-top');
            $header.removeClass('affix-top').addClass('affix');
            $header.stop().animate({backgroundColor: '#011339'}, 300);
        } else {
            $header.removeClass('affix').addClass('affix-top');
            $('body').removeClass('push-top');
            $header.stop().animate({backgroundColor: '#e5eee9'}, 300);
        }

        for(var i = 0; i < $header_li.length; i++) {
            if(Math.round($this.scrollTop()) < (Math.round($($($header_li[i]).attr('href')).offset().top)-74)) {
                $($header_li[i]).parent().removeClass('active');
            }
            else {
                $($header_li[i]).parent().addClass('active');
                if(typeof $header_li[i+1] != 'undefined') {
                    if(Math.round($this.scrollTop()) >= (Math.round($($($header_li[i+1]).attr('href')).offset().top)-74)) {
                        $($header_li[i]).parent().removeClass('active');
                    }
                }
            }
        }
    });
    var mousewheel_sections = [];
    for(var i = 0; i < $header_li.length; i++) {
        var header_li_href = $($header_li[i]).attr('href');
        mousewheel_sections[header_li_href.substr(1)] = i;
        $(header_li_href).on('mousewheel',function(e){
            $this = $(this);
            if(Math.round($window.height()) >= Math.round($this.outerHeight(true)) || (Math.round($(window).scrollTop())-Math.round($this.offset().top)) < header_height) {
                var timeNow = new Date().getTime();
                var mousewheel_attr = '';
                if(typeof e.deltaY != 'undefined' && (timeNow - timeStamp >= 100)) {
                    timeStamp = timeNow;
                    if(parseInt(e.deltaY) < 0) {
                        if(typeof $header_li[mousewheel_sections[$this.attr('id')]-1] != 'undefined' && Math.round($window.height()) >= Math.round($this.outerHeight(true))) {
                            mousewheel_attr = $($header_li[mousewheel_sections[$this.attr('id')]-1]).attr('href');
                        }
                    }
                    else {
                        if(parseInt(e.deltaY) > 0) {
                            if(typeof $header_li[mousewheel_sections[$this.attr('id')]+1] != 'undefined' && Math.round($window.height()) >= Math.round($this.outerHeight(true))) {
                                mousewheel_attr = $($header_li[mousewheel_sections[$this.attr('id')]+1]).attr('href');
                            }
                        }
                    }
                    if(mousewheel_attr) {
                        e.preventDefault();
                        $('html, body').finish().animate({
                            scrollTop: Math.round($(mousewheel_attr).offset().top)-74
                        },450);
                    }
                }
                else {
                    timeStamp = timeNow;
                    return;
                }
            }
        });
    }
});