//=require jquery.pjax
(function( window, undefined ) {
  $(".page-button:first").css('display', 'none');

  $(document).pjax("a[data=data-pjax]", "[data=data-pjax-container]", {timeout: 3000});
  $(document).on('pjax:send', function() {
    $(".page-inner *").remove();
    $('#spinningSquaresG').show();
  });
  $(document).on('pjax:complete', function() {
    $('#spinningSquaresG').hide();
  });

  $("li.page-button").click(function() {
    var show_id = parseInt($("ul.post-list > li:visible").attr("class"), 0);
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
      if (show_id === 4) {
        $(".page-button:last").fadeIn('slow');
      }else if (show_id === 0) {
        $(this).fadeOut('slow');
      }
    }
  });
})(jQuery);