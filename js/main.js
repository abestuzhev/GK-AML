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
        slidesToScroll: 4
    });

    $('.slider-category').slick({
        dots: false,
        arrows: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1
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

    $('.c-select').SumoSelect();

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
    })


});