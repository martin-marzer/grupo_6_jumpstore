document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '.splide', {
        type   : 'loop',
        perPage: 3,
        perMove: 1,
        width: 1000,
        pagination: "false",
        classes: {
            arrow : 'splide__arrow arrow-splide',
            prev  : 'splide__arrow--prev arrow-splide-prev',
            next  : 'splide__arrow--next arrow-splide-next',
        },
	} ).mount();
} );