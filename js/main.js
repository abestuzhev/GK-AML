$(function () {
    $('.slider').slick({
        dots: true,
        infinite: true,
    });

    $('.reviews-list').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
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


});