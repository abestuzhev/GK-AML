var windowWidth = (window.innerWidth ); // вся ширина окна
var documentWidth = (document.documentElement.clientWidth ); // ширина минус прокрутка


$(window).on("load", function() {
    // $('.slider').fadeIn(3000);
});

$(function () {
    $('.slider').slick({
        dots: true,
        infinite: true
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

    $(document).on('click', '.header-basket__link', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
        $('.popup-basket').toggleClass('is-show');

    });

    $(document).on('click', '.popup-basket__close', function (e) {
        e.preventDefault();
        $('.header-basket__link').removeClass('active');
        $('.popup-basket').removeClass('is-show');

    });


    $('#header-search').on('focus', function(){
        $('.popup-search').addClass('is-show');
    });
    $('#header-search').blur(function(){
        $('.popup-search').removeClass('is-show');
    });

    $(".catalog-menu-category__item").on({

        mouseenter: function () {
            var category = '#' + $(this).data('category');
            $(category).addClass('is-show');
            $(this).addClass('active');
            $(this).siblings().removeClass('active');
            $(category).siblings().removeClass('is-show');
        },
        mouseleave: function () {

        }
    });



    $(document).mousedown(function (e) { // событие клика по веб-документу
        // var div = $('.popup');
        // тут указываем ID элемента
        // var div2 = $('.popup-mini');


        function hideOutZone(elem){
            var div = $(elem);
            if (!div.is(e.target) && div.has(e.target).length === 0){

                $('.header-basket__link').removeClass('active');
                $('.popup-basket').removeClass('is-show');
            }
        }
        if (e.which === 1) {
            hideOutZone('.popup-basket');

        }
    });

    if($('select').hasClass('c-select')){
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
    
    
    $('.catalog-sorting-view__item').on('click', function(e){
        e.preventDefault();
        var $view = $(this).attr('data-view');
        console.log('$view: ' + $view);

        $(this).siblings().removeClass('active');
        $(this).addClass('active');

        $('.catalog-list').attr('data-display', $view);
        var $viewCatalog = $('.catalog-list').data('display');
        console.log('$viewCatalog: ' + $viewCatalog);
    });


    /*range-slider*/

    /* слайдер цен */
    function rangeSlider(slide, minValue, maxValue, maxDefault){
        $(slide).slider({
            min: 0,
            max: maxDefault,
            values: [0,maxDefault],
            range: true,
            stop: function(event, ui) {
                $(minValue).val($(slide).slider("values",0));
                $(maxValue).val($(slide).slider("values",1));

            },
            slide: function(event, ui){
                $( minValue).val($(slide).slider("values",0));
                $(maxValue).val($(slide).slider("values",1));
            }
        });

        $("input#minCost").change(function(){

            var value1=$(minValue).val();
            var value2=$(maxValue).val();

            if(parseInt(value1) > parseInt(value2)){
                value1 = value2;
                $(minValue).val(value1);
            }
            $(slide).slider("values",0,value1);
        });


        $(maxValue).change(function(){

            var value1=$(minValue).val();
            var value2=$(maxValue).val();

            if (value2 > maxDefault) { value2 = maxDefault; $(maxValue).val(maxDefault)}

            if(parseInt(value1) > parseInt(value2)){
                value2 = value1;
                $(maxValue).val(value2);
            }
            $(slide).slider("values",1,value2);
        });



        // фильтрация ввода в поля
        $('input').keypress(function(event){
            var key, keyChar;
            if(!event) var event = window.event;

            if (event.keyCode) key = event.keyCode;
            else if(event.which) key = event.which;

            if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
            keyChar=String.fromCharCode(key);

            if(!/\d/.test(keyChar))	return false;

        });
    }



    // rangeSlider('#slider-price', '#minCost-price', '#maxCost-price', 5000);

    if($('div').hasClass('range-slider__price')){
        rangeSlider('.range-slider__price', '.range-slider__minCost-price', '.range-slider__maxCost-price', 5000);

    }

    $(document).on('click', '.c-tabs-menu a', function(event) {
        event.preventDefault();
        $(this).parent().addClass("current");
        $(this).parent().siblings().removeClass("current");
        var tab = $(this).attr("href");
        $('.c-tabs-body').find(".tab-content").not(tab).css("display", "none");
        // $(this).parents('.tabs-menu').parent().siblings('.tab').find(".tab-content").not(tab).css("display", "none");
        $(tab).fadeIn();
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
        centerMode: true,
        focusOnSelect: true,
        vertical: true,
        verticalSwiping: true
    });
    
    $('.header-menu-mobile .header-catalog-icon').on('click', function(e){
        e.preventDefault();
        $('.menu-mobile').toggleClass('is-show');
        $(this).toggleClass('active');
    });

    function determineScrollPanel(){
        if(windowWidth > documentWidth){
            $('.filter-mobile-footer').css({
                'padding-right':'17px'
            });
        }
    }
    determineScrollPanel();

    $(document).on('click', '.js-filter-mobile-btn', function(e){
        e.preventDefault();
        $('.filter').addClass('is-show');
        $('body, html').addClass('blocked');
        determineScrollPanel();

    });

    $(window).resize(function(){
        determineScrollPanel();
    });

    $(document).on('click', '.filter-mobile-head__close', function(e){
        e.preventDefault();
        $('.filter').removeClass('is-show');
        $('body, html').removeClass('blocked');
    });
});