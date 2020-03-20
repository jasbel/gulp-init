(function scrollReveal() {
    window.sr = ScrollReveal();
    sr.reveal("header", {
        duration: 2000,
        origin: "bottom",
        reset: true
    });
})();

$(document).ready(function () {
    $(".slicksliders").slick({
        // prevArrow: false,
        // nextArrow: false,
        // dots: true,
        // infinite: true,
        // speed: 1000,
        // fade: true,
        // infinite: true,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 3000
    })
});