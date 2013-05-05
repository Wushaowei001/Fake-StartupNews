//= require jquery.pjax
//= require spin.min
(function( window, undefined ) {
  var spinner = new Spinner({top: '50px'}).spin();
  $("ul.post-list > li:not(.0):not(.page-button:last)").css('display', 'none');
  $.pjax({
    selector: 'a.post-title, a#home, a#about',
    container: '.post-content',
    cache: true,
    storage: true,
    titleSuffix: '',
    filter: function(){},
    callback: function(){}
  });
  $('.post-content').bind('pjax.start', function(){
    $(this).append(spinner.el);
  });
  $('.post-content').bind('pjax.end', function(){
    $("div.spinner").remove();
  });

  $("li.page-button").click(function() {
    var show_id = parseInt($("ul.post-list > li:visible").attr("class"), 0) ;
    if ($(this).children().text() === 'Next') {
      show_id += 1;
      if (show_id >= 5) { show_id = 5; }
      $("ul.post-list > li:visible:not(.page-button)").hide();
      $("li." + show_id).fadeIn('slow');
      if (show_id === 1) {
        $(".page-button:first").fadeIn('slow');
      }else if (show_id === 5) {
        $(this).fadeOut('slow');
      }
    }else if ($(this).children().text() === 'Prev') {
      show_id -= 1;
      if (show_id <= 0) { show_id = 0; }
      $("ul.post-list > li:visible:not(.page-button)").hide();
      $("li." + show_id).fadeIn('slow');
      if (show_id === 3) {
        $(".page-button:last").fadeIn('slow');
      }else if (show_id === 0) {
        $(this).fadeOut('slow');
      }
    }
  });
})(jQuery);