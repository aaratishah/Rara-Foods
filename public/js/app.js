(function ($) {
	"use strict";
	var APP = {},
		$body = $("body"),
		$window = $(window),
		$siteWrapper = $("#site-wrapper"),
		$document = $(document);
	APP.isMobile = function () {
		return window.matchMedia("(max-width: 1200px)").matches;
	};
	APP.headerSticky = {
		scroll_offset_before: 0,
		init: function () {
			this.sticky();
			this.scroll();
			this.resize();
			this.processSticky();
		},
		sticky: function () {
			$(".header-sticky .sticky-area").each(function () {
				var $this = $(this);
				if (!$this.is(":visible")) {
					return;
				}
				if (!$this.parent().hasClass("sticky-area-wrap")) {
					$this.wrap('<div class="sticky-area-wrap"></div>');
				}
				var $wrap = $this.parent();
			});
		},
		resize: function () {
			$window.resize(function () {
				APP.headerSticky.sticky();
				APP.headerSticky.processSticky();
			});
		},
		scroll: function () {
			$window.on("scroll", function () {
				APP.headerSticky.processSticky();
			});
		},
		processSticky: function () {
			var current_scroll_top = $window.scrollTop();
			$(".header-sticky .sticky-area").each(function () {
				var $this = $(this);
				if (!$this.is(":visible")) {
					return;
				}
				var $wrap = $this.parent(),
					sticky_top = 0,
					sticky_current_top = $wrap.offset().top,
					borderWidth = $body.css("border-width");
				if (borderWidth !== "") {
					sticky_top += parseInt(borderWidth);
				}
				if (sticky_current_top - sticky_top < current_scroll_top) {
					$this.css("position", "fixed");
					$this.css("top", sticky_top + "px");
					$wrap.addClass("sticky");
				} else {
					if ($wrap.hasClass("sticky")) {
						$this.css("position", "").css("top", "");
						$wrap.removeClass("sticky");
					}
				}
			});
			if (APP.headerSticky.scroll_offset_before > current_scroll_top) {
				$(".header-sticky-smart .sticky-area").each(function () {
					if ($(this).hasClass("header-hidden")) {
						$(this).removeClass("header-hidden");
					}
				});
			} else {
				$(".header-sticky-smart .sticky-area").each(function () {
					var $wrapper = $(this).parent();
					if ($wrapper.length) {
						if (
							APP.headerSticky.scroll_offset_before >
								$wrapper.offset().top + $(this).outerHeight() &&
							!$(this).hasClass("header-hidden")
						) {
							$(this).addClass("header-hidden");
						}
					}
				});
			}
			APP.headerSticky.scroll_offset_before = current_scroll_top;
		},
	};
	APP.headerMobile = {
		init: function () {
			$(".nav-link").on("click", function (e) {
				if (!APP.isMobile()) {
					return;
				}
				var $this = $(this);
				if (
					$this.attr("href") === "#" ||
					$(e.target).closest(".caret").length
				) {
					e.preventDefault();
					$this.next(".sub-menu").slideToggle(function () {
						$(this).toggleClass("show").css("display", "");
					});
				}
			});
		},
    };
    
	$document.ready(function () {
		APP.headerSticky.init();
        APP.headerMobile.init();
        
        $(document).on('click', '.navbar-toggler', function(e){
            if(!$(this).hasClass('cross')){
                $(this).addClass('cross');
                $('#main-wrapper').addClass('slide');
            }else{
                $(this).removeClass('cross');
                $('#main-wrapper').removeClass('slide');
            }
        })

	});
})(jQuery);

var swiper = new Swiper('.product-swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
    }
});

var swiper = new Swiper('.product-swiper-container.items-6', {
    slidesPerView: 2,
    spaceBetween: 30,
    breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        992: {
          slidesPerView: 6,
          spaceBetween: 30,
        }
    }
});