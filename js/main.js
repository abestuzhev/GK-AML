var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth ); // ширина минус прокрутка

function removeActivePoint (){
    // $('div, span').removeClass('active');
    // $('div, span').removeClass('is-show');
}


$(window).on("load", function () {
    // $('.slider').fadeIn(3000);
});

$(function () {

    //ресайз картинок
    function fix_size($img, $parent) {
        var images = $($img);
        images.each(setsize);

        function setsize() {
            var img = $(this),
                img_dom = img.get(0),
                container = img.parents($parent);
            if (img_dom.complete) {
                resize();
            } else img.one('load', resize);

            function resize() {
                if ((container.width() / container.height()) < (img_dom.width / img_dom.height)) {
                    img.width('100%');
                    img.height('auto');
                    return;
                }
                img.height('100%');
                img.width('auto');
            }
        }
    }
    $(window).on('resize', fix_size('.catalog-card__img img', '.catalog-card__img'));
    fix_size('.catalog-card__img img', '.catalog-card__img');
    
    $(window).on('resize', fix_size('.category-card__img img', '.category-card__img'));
    fix_size('.category-card__img img', '.category-card__img');




    $('.slider').slick({
        dots: true,
        infinite: true,
        adaptiveHeight: true
    });

    function initMobileSlider(){

    }

    $('.slider-mobile').slick({
        dots: true,
        infinite: true
    });


    if ($(window).width() < 1000) {
        initMobileSlider();
    }

    $(window).resize(function () {
        if ($(window).width() < 1000) {
            initMobileSlider();
        }
    });


    $('.reviews-list').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 580,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.slider-category').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1380,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1190,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 970,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '80px'

                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                    // centerMode: true,
                    // centerPadding: '80px'
                }
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function removeShow(){
        $('div', 'a', 'span').removeClass('active');
        $('div', 'a', 'span').removeClass('is-show');
    }

    $(document).on('click', '.header-basket__link', function (e) {
        e.preventDefault();
        removeActivePoint();
        removeShow();
        $(this).toggleClass('active');
        $('.popup-basket').toggleClass('is-show');

    });

    $(document).on('click', '.popup-basket__close', function (e) {
        e.preventDefault();
        $('.header-basket__link').removeClass('active');
        $('.popup-basket').removeClass('is-show');

    });


    $('#header-search').on('focus', function () {
        $('.popup-search').addClass('is-show');
    });
    $('#header-search').blur(function () {
        $('.popup-search').removeClass('is-show');
    });

    $(".catalog-menu-category__item").addClass('js-hover');

    function hoverSubmenu(){
        if($(window).width() > 1000){


            $(".catalog-menu-category__item").on({

                mouseenter: function () {
                    var category = '#' + $(this).data('category');
                    $(category).addClass('is-show');
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    $(category).siblings().removeClass('is-show');
                    $(this).siblings().find('.catalog-menu-product__item').removeClass('is-show');
                },
                mouseleave: function () {

                }
            });
        } else {
            $('.catalog-menu-category__item').unbind('mouseenter mouseleave');
            // $(".catalog-menu-category__item").removeClass('js-hover');
            $(".catalog-menu-category__item").on('click', function(e){
                e.preventDefault();
                var category = '#' + $(this).data('category');
                $(category).addClass('is-show');
                $(this).addClass('active');
                $(this).siblings().removeClass('active');
                $(this).siblings().find('.catalog-menu-product__item').removeClass('is-show');
            });
        }
    }

    hoverSubmenu();
    $(window).on('resize', hoverSubmenu);





    $(document).mousedown(function (e) { // событие клика по веб-документу
        // var div = $('.popup');
        // тут указываем ID элемента
        // var div2 = $('.popup-mini');


        function hideOutZone(elem, btn) {
            var div = $(elem);
            if (!div.is(e.target) && div.has(e.target).length === 0) {

                $(btn).removeClass('active');//уубираем активность у кнопки
                $(elem).removeClass('is-show'); //скрываем модалку
            }
        }

        if (e.which === 1) {
            hideOutZone('.popup-basket', '.header-basket__link');
            // hideOutZone('.header-auth-popup', '.header-auth__link');
            // hideOutZone('.menu-mobile', '.header-catalog-icon');
            // hideOutZone('.catalog-menu', '.header-catalog');
        }
    });

    if ($('select').hasClass('c-select')) {
        $('.c-select').SumoSelect();
    }


    /*функция счета больше/меньше*/
    function catalogItemCounter(field) {
        var fieldCount = function (el) {
            var
            // Мин. значение
                min = el.data('min') || false,
            // Макс. значение
                max = el.data('max') || false,
            // Кнопка уменьшения кол-ва
                dec = el.siblings('.dec'),
            // Кнопка увеличения кол-ва
                inc = el.siblings('.inc');

            function init(el) {
                if (!el.attr('disabled')) {
                    dec.on('click', decrement);
                    inc.on('click', increment);
                }
                // Уменьшим значение
                function decrement() {
                    var value = parseInt(el[0].value);
                    value--;

                    if (!min || value >= min) {
                        el[0].value = value;
                    }
                };
                // Увеличим значение
                function increment() {
                    var value = parseInt(el[0].value);

                    value++;

                    if (!max || value <= max) {
                        el[0].value = value++;
                    }
                };
            }

            el.each(function () {
                init($(this));
            });
        };
        $(field).each(function () {
            fieldCount($(this));
        });
    }

    catalogItemCounter('.fieldCount');


    $('.catalog-sorting-view__item').on('click', function (e) {
        e.preventDefault();
        var $view = $(this).attr('data-view');
        console.log('$view: ' + $view);

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        $('.catalog-list').attr('data-display', $view);
        var $viewCatalog = $('.catalog-list').data('display');
        console.log('$viewCatalog: ' + $viewCatalog);

        fix_size('.catalog-card__img img', '.catalog-card__img');
    });


    /*range-slider*/

    /* слайдер цен */
    function rangeSlider(slide, minValue, maxValue, maxDefault) {
        $(slide).slider({
            min: 0,
            max: maxDefault,
            values: [0, maxDefault],
            range: true,
            stop: function (event, ui) {
                $(minValue).val($(slide).slider("values", 0));
                $(maxValue).val($(slide).slider("values", 1));

            },
            slide: function (event, ui) {
                $(minValue).val($(slide).slider("values", 0));
                $(maxValue).val($(slide).slider("values", 1));
            }
        });

        $("input#minCost").change(function () {

            var value1 = $(minValue).val();
            var value2 = $(maxValue).val();

            if (parseInt(value1) > parseInt(value2)) {
                value1 = value2;
                $(minValue).val(value1);
            }
            $(slide).slider("values", 0, value1);
        });


        $(maxValue).change(function () {

            var value1 = $(minValue).val();
            var value2 = $(maxValue).val();

            if (value2 > maxDefault) {
                value2 = maxDefault;
                $(maxValue).val(maxDefault)
            }

            if (parseInt(value1) > parseInt(value2)) {
                value2 = value1;
                $(maxValue).val(value2);
            }
            $(slide).slider("values", 1, value2);
        });


        // фильтрация ввода в поля
        $('input').keypress(function (event) {
            var key, keyChar;
            if (!event) var event = window.event;

            if (event.keyCode) key = event.keyCode;
            else if (event.which) key = event.which;

            if (key == null || key == 0 || key == 8 || key == 13 || key == 9 || key == 46 || key == 37 || key == 39) return true;
            keyChar = String.fromCharCode(key);

            if (!/\d/.test(keyChar))    return false;

        });
    }


    // rangeSlider('#slider-price', '#minCost-price', '#maxCost-price', 5000);

    if ($('div').hasClass('range-slider__price')) {
        rangeSlider('.range-slider__price', '.range-slider__minCost-price', '.range-slider__maxCost-price', 5000);

    }

    $(document).on('click', '.c-tabs-menu a', function (event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $(this).parents('.c-tabs').find(".tab-content").not(tab).css("display", "none");
        // $(this).parents('.tabs-menu').parent().siblings('.tab').find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
    });

    function mobileTabs() {

        $('.profile .c-tabs-menu__item').each(function () {
            var tab = $(this).find('a').attr("href");
            $(this).append($(tab));
        });
    };

    function mobileTabsDestroy() {

        $('.profile .c-tabs-menu__item').each(function () {
            var tab = $(this).find('a').attr("href");
            $(this).parents('.c-tabs').find('.c-tabs-body').append($(tab));
            if ($(this).hasClass('current')) {
                var tabLink = $(this).find('a').attr("href");
                $(this).parents('.c-tabs').find(tabLink).css("display", "block");
            }

        });
    };

    if ($(window).width() < 790) {
        mobileTabs();
    }

    $(window).resize(function () {
        if ($(window).width() < 790) {
            mobileTabs();
        } else {
            mobileTabsDestroy();
        }
    });


    $('.product-slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.product-slider-nav'
    });


    $('.product-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider-for',
        dots: false,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true
    });


    $('.horizontal-slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.product-slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });


    $('.header-menu-mobile .header-catalog-icon').on('click', function (e) {
        e.preventDefault();
        removeActivePoint();
        $('.menu-mobile').toggleClass('is-show');
        $(this).toggleClass('active');
    });

    function determineScrollPanel() {
        if (windowWidth > documentWidth) {
            $('.filter-mobile-footer').css({
                'padding-right': '17px'
            });
        }
    }

    determineScrollPanel();

    $(document).on('click', '.js-filter-mobile-btn', function (e) {
        e.preventDefault();
        $('.filter').addClass('is-show');
        $('body, html').addClass('blocked');
        determineScrollPanel();

    });

    $(window).resize(function () {
        determineScrollPanel();
    });

    $(document).on('click', '.filter-mobile-head__close', function (e) {
        e.preventDefault();
        $('.filter').removeClass('is-show');
        $('body, html').removeClass('blocked');
    });

    $(document).on('click', '.header-search-mobile', function (e) {
        e.preventDefault();
        removeActivePoint();
        removeShow();
        $('.header-search').toggleClass('is-show');
        $(this).toggleClass('active');
    });


    function deleteHover() {

        if ($(window).width() < 1030) {
            $('.header-catalog').removeClass('js-desktop-hover');
            $('.header-catalog').addClass('js-mobile-hover');
        } else {
            $('.header-catalog').addClass('js-desktop-hover');
            $('.header-catalog').removeClass('js-mobile-hover');
        }
    }

    deleteHover();
    $(window).on('resize', deleteHover);


    $(document).on('click', '.js-mobile-hover .header-catalog__link', function (e) {
        e.preventDefault();
        removeActivePoint();
        $('.catalog-menu').toggleClass('is-show');
        $(this).parents('.js-mobile-hover').toggleClass('active');
    });



    function mobileCatalog() {

        $('.catalog-menu-category__item').each(function () {
            var tab = '#' + $(this).data("category");
            $(this).append($(tab));
        });
    };

    function mobileCatalogDestroy() {

        $('.catalog-menu-category__item').each(function () {
            var tab = '#' + $(this).data("category");
            $(this).parents('.catalog-menu').find('.catalog-menu-product').append($(tab));
            // if ($(this).hasClass('current')) {
            //     var tabLink = $(this).find('a').attr("href");
            //     $(this).parents('.c-tabs').find(tabLink).css("display", "block");
            // }

        });
    };

    if ($(window).width() < 1000) {
        mobileCatalog();
    }

    $(window).resize(function () {
        if ($(window).width() < 1000) {
            mobileCatalog();
        } else {
            mobileCatalogDestroy();
        }
    });


    //footer-bottom__scrollup

    //кнопка вверх
    function backToTop (btnElem, parentElem){
        var offset = 300,
            offset_opacity = 1200,
            scroll_top_duration = 700,
            $back_to_top = $(btnElem);
        // кнопка назад
        $(window).scroll(function(){
            ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
            if( $(this).scrollTop() > offset_opacity ) {
                $back_to_top.addClass('cd-fade-out');
            }
        });

        $back_to_top.on('click', function(event){
            event.preventDefault();
            $(parentElem).animate({
                    scrollTop: 0
                }, scroll_top_duration
            );
        });
    }

    backToTop('.footer-bottom__scrollup', 'body,html');

    /*------------------------------*/
    /*------------------------------*/
    /*------------------------------*/

    $('.mfp-content-bg').on('click', function(e){
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('blocked');
        $('.wrapper').removeClass('fixed-input');
        $('.header.sticky').css({
            // 'right':'0'
        });
        // console.log('hide popup');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if(parentModal.data('save')){
            onPopupClose(parentModal);
        }
    });

    $(".popup-bg").click(function (e) {
        e.preventDefault();
        $('.popup').parents().removeClass('is-visible');
        // $('.fixed-overlay').removeClass('is-visible');
        $('html').removeClass('body-popup');
    });


    var $html = $('html');
    var $header = $('.header-layout');
    /*функция показа модального окна*/
    function showPopup(icon, popup) {
        $(document).on('click', icon, function (e) {

            e.preventDefault();
            $(popup).addClass('is-visible');
            $('.mfp-bg').addClass('is-visible');


            $html.addClass('blocked');
            // $('body').addClass('blocked');

            var widthScroll = windowWidth - documentWidth;
            console.log('widthScroll: ' + widthScroll);
            if(windowWidth > documentWidth){
                $html.css({
                    'margin-right': widthScroll
                });
                $header.css({
                    'padding-right': widthScroll
                });
                // $('.mfp-wrap').css({
                //     'overflow-y':'scroll'
                // });
                // console.log('Есть полоса прокрутки');
            }else {
                // console.log('Нет полосы прокрутки');
            }
        });
    }

    $(document).on('click', '.js-popup-close', function (e) {
        e.preventDefault();
        $(this).parents('.mfp-wrap').removeClass('is-visible');
        $('.mfp-bg').removeClass('is-visible');
        $html.css({
            'margin-right':'0'
        }).removeClass('blocked');

        $header.css({
            'padding-right': '0'
        });

        var parentModal = $(this).parents('.mfp-wrap');
        if(parentModal.data('save')){
            onPopupClose(parentModal);
        }
    });

    showPopup("#profile", '.popup-auth');
    showPopup("#registration", '.popup-reg');

    $(document).on('click', '.header-auth__link', function (e) {
        e.preventDefault();
        removeShow();
        $('.header-auth-popup').toggleClass('is-show');
        $(this).toggleClass('active');
    });

    $(document).on('click', '.header-auth-popup__link', function (e) {
        e.preventDefault();
        $('.header-auth-popup').removeClass('is-show');
        $('.header-auth__link').removeClass('active');
    });

    $('.js-phone-mobile-mask').mask('0(000)000-00-00', {clearIfNotMatch: true});
    $('.js-phone-stationary-mask').mask('00-00-00', {clearIfNotMatch: true});

    
    
    /*кастомный скролл в корзине*/
    $(".popup-basket__body").mCustomScrollbar({
        // theme:"rounded-dots",
        scrollInertia:300
    });

    //footer script
});