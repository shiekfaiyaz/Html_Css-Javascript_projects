$(document).ready(function() {
    
    // 1. Header scroll effect
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('header').addClass('header-active');
        } else {
            $('header').removeClass('header-active');
        }
    });

    // 2. Sidebar Toggle (Menu Open/Close)
    $('.menu-icon, .cross-icon').on('click', function() {
        $('#mobileSidebar').toggleClass('active');
    });

    $('.sidebar-menu ul li a').on('click', function() {
        $('#mobileSidebar').removeClass('active');
    });

    // 4. Smooth Scroll (Clean jQuery way)
    function smoothScroll(trigger, targetId) {
        $(trigger).on('click', function(e) {
            e.preventDefault(); 
            $('html, body').animate({
                scrollTop: $(targetId).offset().top
            }, 800); 
        });
    }

    smoothScroll('#jumpBtn', '#sec6');
    smoothScroll('.btn2', '#sec2');
    smoothScroll('.view-more', '#sec6');
    smoothScroll('.buy-now', '#sec3');

});