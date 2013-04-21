//= require jquery
//= require jquery_ujs
//= require spin.min
$("a.post-title").click(function() {
  $('.post-content *').remove();
  var spinner = new Spinner({top: '50px'}).spin();
  $('.post-content').append(spinner.el);
  var post_id = $(this).attr("id");
  $.get("/posts/" + post_id, function(result) {
    $('.post-content').html(result);
  });
});
$("ul.post-list > li:gt(4):not(#next)").css('display', 'none');
$("a.next").click(function() {
  var show_id = parseInt($("ul.post-list > li:visible").attr("class"), 0) ;
  if ($(this).text() == 'Next') {
    show_id += 1;
    $("ul.post-list > li:visible:not(#next)").hide();
    $("li." + show_id).fadeIn('slow');
    if (show_id == 4) {
      $(this).text('Prev');
    }
  }else if ($(this).text() == 'Prev') {
    show_id -= 1;
    $("ul.post-list > li:visible:not(#next)").hide();
    $("li." + show_id).fadeIn('slow');
    if (show_id === 0) {
      $(this).text('Next');
    }
  }
});
