$(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
    });

    $('.reviews-list').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1
    });
});