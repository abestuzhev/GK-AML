$(function(){
    $('.slider').slick({
        dots: true,
        infinite: true,
    });

    $('.reviews-list').slick({
        dots: true,
        arrows:false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 4
    });
});