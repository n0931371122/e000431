'use strict';
$(function (){

    var windowW,windowH,mobileMode,headerH;
    if (!/Android/i.test(window.navigator.userAgent)) {
        $(".scrollbarY").mCustomScrollbar({
            axis: "y",
        });
    }
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
    //index
    new Swiper ('.index-banner .swiper-container',{
        loop: true, 
        speed:1200,
        // autoplay:{delay:5000},
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    }) 
    $('.index-banner .news-box').flipbox({
        vertical: true,
        autoplay: true,
        autoplayReverse: false,
    })
    new Swiper ('.index-case-section .swiper-container',{
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
    $(".index-service-section .item").hover(function(){
        $(this).addClass("expand");
    },function(){
        $(this).removeClass("expand");
    });
    //search
    $(".search-section .tablists .tabs ul li button").on("click", function () {
        var $tab = $(this).parent("li").attr("data-tab");
        $(this).parent("li").addClass("active").siblings().removeClass("active")
        $(".tabpanels .tabpanel").removeClass("active");
        $(".tabpanels .tabpanel").each(function () {
            if ($(this).attr("data-location") == $tab) {
                $(this).addClass("active");
            }
        });
    });
    $(".search-section .tabs .tabToggle").on("click",function(){
        $(this).next("ul").slideToggle();
    });
    //news
    $(".news-section .new").on("mouseenter",function(){
        $(this).stop().addClass("hover");
        $(this).addClass("float");
        if (windowW>1400) {
            $(this).siblings().children(".add").stop().slideUp();
            $(this).children(".add").stop().slideDown();
        }
    });
    $(".news-section .new").on("mouseleave", function () {
        var $this = $(this);
        $(this).stop().removeClass("hover");
        $(".new").children(".add").stop().slideUp();
        setTimeout(function(){
            $this.stop().removeClass("float");
        }, 150);
    });
    //promotions
    $(".promotions-section .factor-toggle").click(function(){
        toggle($(this));
    });
    $(".promotions-section .factor-sub-toggle .sub-toggle-icon").click(function(){
        toggle($(this).parents(".factor-sub-toggle"));
    });
    $(".promotions-section .factor-sub-toggle input").change(function(){
        var selected=$(this).prop("checked");
        if(selected){
            toggle($(this).parents(".factor-sub-toggle"),true);
        }
        else{
            toggle($(this).parents(".factor-sub-toggle"));
        }
        
        var flag=$(this).prop("checked");
        $(this).parents(".factor-sub-toggle").next().children().each(function(){
            $(this).find("input").prop("checked",flag);
        });
    });
    $(".promotions-section .factor-sub-content input").change(function(){
        var allSelected=true;
        $(this).parents(".factor-sub-content").children().each(function(){
            var selected=$(this).find("input").prop("checked");
            if(!selected){
                allSelected=false
            }
        });
        $(this).parents(".factor-sub-content").prev(".factor-sub-toggle").find("input").prop("checked",allSelected);
    });
    function toggle($toggle,direction){
        $toggle.toggleClass("active");
        if(direction){
            $toggle.next().stop().slideDown();
        }
        else{
            $toggle.next().stop().slideToggle();
        }
        
    }
    //service
    new Swiper ('.service-section .swiper-container',{
        slidesPerView: 1,
        loop:true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
    }) 
    //download
    
    $(".download-section ul li button").on("click",function(){
        $(this).next(".tableBox").slideToggle().parent("li").toggleClass("open").siblings().removeClass("open").children(".tableBox").slideUp();
    });
   

    /* ==========================================================================
		[common]
     ==========================================================================*/

    $(".submenu .toggle").on("click",function(){
        $(this).next("ul").stop().slideToggle();
    });


    aosInit();
    /* ==========================================================================
		[resize]
     ==========================================================================*/

    function resize(){
        headerH=$("header").height();
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
        //service
        $("#serviceEditor .submenu a").on("click",function(){
            var target=$(this).data("target");
            var content=$("[data-content]").filter(function(){
                return $(this).data("content")==target
            });
            if(windowW<768){
                $(this).parents("ul").slideUp();
            }   
            $("html,body").animate({
                scrollTop:content.offset().top-headerH
            },1000);
        });
        $(window).scroll(function(){
            var scrollTop=$(window).scrollTop();
            if(scrollTop>$(".banner").offset().top+$(".banner").height()-headerH){
                $(".submenu").addClass("fixed-mode");
            }
            else{
                $(".submenu").removeClass("fixed-mode");
            }
            var position=[];
            $("[data-content]").each(function(){
                position.unshift($(this).offset().top);
            });
            for(var i=0;i<position.length;i++){
                if(scrollTop>=position[i]-headerH-$(".submenu").height()){
                    $(".submenu ul li").removeClass("active").eq(position.length-i-1).addClass("active");
                    $(".submenu .toggle span").text($(".submenu ul li").eq(position.length-i-1).find("a").text());
                    break;
                }
            }
        });
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

