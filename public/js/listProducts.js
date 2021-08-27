$('.btn').click(function(){
  $(".sidenav-filter").addClass("open-filter");
  $('body').css('overflow', 'hidden');
});
$('.closebtn-filter').click(function(){
  $(".sidenav-filter").removeClass("open-filter");
  $('body').css('overflow', 'auto');
});


document.getElementById('sort-order').onchange = function() {
  if (this.options[this.selectedIndex].value != "") {
    window.location.href= '/products/' + this.options[this.selectedIndex].value;
  } else {
    window.location.href= '/products' ;
  }
};