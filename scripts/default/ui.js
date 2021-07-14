'use strict';
$(function (){

    var windowW,windowH,mobileMode;
    $(".jqimgFill").imgLiquid();
    imgFill();
    /* ==========================================================================
		[layout]
 	==========================================================================*/
    $("header").each(function () {
        $(".menu-toggle").click(function () {
            $("html").toggleClass("menuOpen");
        });
        $("header .mask").click(function () {
            $("html").removeClass("menuOpen");
        });
    });
    $(".goTop").on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });
    $(window).scroll(function () {  
        $(window).scrollTop()>0? $("header").addClass("scroll"):$("header").removeClass("scroll");
        $(window).scrollTop() > 100?$(".goTop").addClass("show"): $(".goTop").removeClass("show");
    });

    /* ==========================================================================
		[page]
     ==========================================================================*/

    $("#index").each(function(){
        new Swiper ('.index-banner .swiper-container',{
            loop: true, 
            speed:1200,
            // autoplay:{delay:5000},
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        }) 
		$('.news-box').flipbox({
			vertical: true,
			autoplay: true,
			autoplayReverse: false,
		})
        new Swiper ('.case-section .swiper-container',{
            loop: true, 
            speed:1200,
            slidesPerView: 1,
            spaceBetween:20,
            navigation: {
                nextEl: '.case-section .swiper-button-next',
                prevEl: '.case-section .swiper-button-prev',
            },
            pagination: {
                el: '.case-section .swiper-pagination',
                clickable: true
            },
            breakpoints: {
                768:{
                    slidesPerView: 2,
                },
                1200: {
                    spaceBetween:0,
                    slidesPerView: 2.8,
                    centeredSlides:true,
                    centeredSlidesBounds:true,
                },
            }
        }) 
        $(".service-section .item").hover(function(){
            $(this).addClass("expand");
        },function(){
            $(this).removeClass("expand");
        });
 
    });
    $("#search").each(function(){
        $(".tablists .tabs ul li button").on("click", function () {
            var $tab = $(this).parent("li").attr("data-tab");
            $(this).parent("li").addClass("active").siblings().removeClass("active")
            $(".tabpanels .tabpanel").removeClass("active");
            $(".tabpanels .tabpanel").each(function () {
                if ($(this).attr("data-location") == $tab) {
                    $(this).addClass("active");
                }
            });
        });
        $(".tabs .tabToggle").on("click",function(){
            $(this).next("ul").slideToggle();
        });
    });
    $("#news").each(function(){
        $(".new").on("mouseenter",function(){
            $(this).stop().addClass("hover");
            $(this).addClass("float");
            if (windowW>1400) {
                $(this).siblings().children(".add").stop().slideUp();
                $(this).children(".add").stop().slideDown();
            }
        });
        $(".new").on("mouseleave", function () {
            var $this = $(this);
            $(this).stop().removeClass("hover");
            $(".new").children(".add").stop().slideUp();
            setTimeout(function(){
                $this.stop().removeClass("float");
            }, 150);
        });
        $(".submenu .toggle").on("click",function(){
            $(this).next("ul").stop().slideToggle();
        });

    });
    aosInit();
    /* ==========================================================================
		[resize]
     ==========================================================================*/

    function resize(){
        windowW=$(window).innerWidth();
        windowH=$(window).height();
        windowW<1400?mobileMode=true:mobileMode=false;
        if(mobileMode){
            $(".menu-wrapper").append($("header>.complex").detach());
        }
        else{
            $(".menu-wrapper").after($(".menu-wrapper .complex").detach());
        }
        //search
        if(windowW<992){
            $("#search .tablists .tabs ul li button").on("click", function () {
                $(".tabs ul").slideUp();
            });
        }
    }
    $(window).resize(function(){
        resize();
    }).trigger('resize');


})
function aosInit(){
    AOS.init({
        duration: 500,
        offset: 10,
        mirror: true,
    });
}

