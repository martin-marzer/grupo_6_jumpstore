
document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '.splide', {
        type   : 'loop',
        perPage: 3,
        perMove: 1,
        width: 1000,
        pagination: "false"
	} ).mount();
} );