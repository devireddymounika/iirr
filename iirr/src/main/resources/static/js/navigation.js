$(document).ready(function() {
	"use strict";

	//------- Superfist nav menu  js --------
	$('.nav-menu').superfish({
		animation: {
			opacity: 'show'
		},
		speed: 400
	});

	//------- Mobile Nav js --------
	if ($('#nav-menu-container').length) {
		var $mobile_nav = $('#nav-menu-container').clone().prop({
			id: 'mobile-nav'
		});
		$mobile_nav.find('> ul').attr({
			'class': '',
			'id': ''
		});
		$('body .main-menu').append($mobile_nav);
		$('body .main-menu').prepend('<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i><span class="menu-title"></span> </button>');
		$('body .main-menu').append('<div id="mobile-body-overly"></div>');
		$('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

		$(document).on('click', '.menu-has-children i', function(e) {
			$(this).next().toggleClass('menu-item-active');
			$(this).nextAll('ul').eq(0).slideToggle();
			$(this).toggleClass("lnr-chevron-up lnr-chevron-down");
		});

		$(document).on('click', '#mobile-nav-toggle', function(e) {
			$('body').toggleClass('mobile-nav-active');
			$('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
			$('#mobile-body-overly').toggle();
		});

		$(document).on('click', function(e) {
			var container = $("#mobile-nav, #mobile-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {
				if ($('body').hasClass('mobile-nav-active')) {
					$('body').removeClass('mobile-nav-active');
					$('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
					$('#mobile-body-overly').fadeOut();
				}
			}
		});
	} else if ($("#mobile-nav, #mobile-nav-toggle").length) {
		$("#mobile-nav, #mobile-nav-toggle").hide();
	}

	//------- Sticky Navigation js --------
	window.onscroll = function() {
		stickFunction()
	};

	var navbar = document.getElementById("main-menu");
	var sticky = navbar.offsetTop;

	function stickFunction() {
		if (window.pageYOffset >= sticky) {
			navbar.classList.add("sticky")
		} else {
			navbar.classList.remove("sticky");
		}
	}
});