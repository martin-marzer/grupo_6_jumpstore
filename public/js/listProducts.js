$('.btn').click(function(){
  $(".sidenav-filter").addClass("open-filter");
  $('body').css('overflow', 'hidden');
});
$('.closebtn-filter').click(function(){
  $(".sidenav-filter").removeClass("open-filter");
  $('body').css('overflow', 'auto');
});