document.addEventListener( 'DOMContentLoaded', function () {
	new Splide( '#image-slider', {
    'rewind': true,
		'cover'      : true,
		'heightRatio': "0.7",
    classes: {
      arrows: 'splide__arrows your-class-arrows',
      arrow : 'splide__arrow your-class-arrow',
      prev  : 'splide__arrow--prev your-class-prev',
      next  : 'splide__arrow--next your-class-next',
    }
	} ).mount();
} );
// // este es que pasen las imagenes
// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   showSlides(slideIndex += n);
// }

// // Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("mySlides");
//   let dots = document.getElementsByClassName("dot");
//   if (n > slides.length) {slideIndex = 1}
//   if (n < 1) {slideIndex = slides.length}
//   for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//   }
//   for (i = 0; i < dots.length; i++) {
//       dots[i].className = dots[i].className.replace(" active", "");
//   }
//   slides[slideIndex-1].style.display = "block";
//   dots[slideIndex-1].className += " active";
// }

// esto es que cuando pasas el mouse hace zoom la img
$(document).ready(function(){
  $('#img-product img').hover(function() {
      $("#img-product img").addClass('transition');
  
  }, function() {
      $("#img-product img").removeClass('transition');
  });
});