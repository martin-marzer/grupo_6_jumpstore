//esto es para mostrar en los dispositivos moviles el sidenav de los filtros

$('.btn').click(function(){
  $(".sidenav-filter").addClass("open-filter");
  $('body').css('overflow', 'hidden');
});
$('.closebtn-filter').click(function(){
  $(".sidenav-filter").removeClass("open-filter");
  $('body').css('overflow', 'auto');
});

//esto es para el selected cuando se selecciona te lleva a ese link, 
// lo sacas (eso esta en el ejs seleccionado según su link) y te lleva al products (default) 
document.getElementById('sort-order').onchange = function() {
  if (this.options[this.selectedIndex].value != "") {
    window.location.href= '/products/' + this.options[this.selectedIndex].value;
  } else {
    window.location.href= '/products' ;
  }
};

