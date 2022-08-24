  //------- Owl Carusel  js --------//  

    $('.active-gallery-carusel').owlCarousel({
        items:1,
        loop:true,
        nav:true,
		autoplay:true,
   		autoplayTimeout:3000,
    	autoplayHoverPause:true,
        navText: ["<span class='lnr lnr-arrow-left'></span>",
        "<span class='lnr lnr-arrow-right'></span>"],  
        smartSpeed:1000,           
    });

    $('.active-testimonial').owlCarousel({
        items: 2,
        loop: true,
        margin: 30,
        autoplayHoverPause: true,
        dots: true,
        autoplay: true,
        nav: true,
        navText: ["<span class='lnr lnr-arrow-up'></span>", "<span class='lnr lnr-arrow-down'></span>"],
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            }
        }
    });

    $('.active-brand-carusel').owlCarousel({
        items: 4,
        loop: true,
        margin: 30,
        autoplayHoverPause: true,
        smartSpeed:650,         
        autoplay:true, 
        responsive: {
            0: {
                items: 2
            },
            480: {
                items: 2,
            },
            768: {
                items: 4,
            }
        }
        
        
    });