;(function($) {

$.fn.raty.defaults.path      = "/assets";
$.fn.raty.defaults.half_show = true;

var ratable = function(){
  $(".star").each(function() {
    var $this = $(this);
    
    $this.raty({
      readOnly: $this.attr('data-readonly') === 'true',
      score:    function(){
        return $(this).attr('data-rating')
      },
      number:   function() {
        return $(this).attr('data-star-count')
      },
      click:    function(score, evt) {
        var $this = $(this);

        $.post('<%= Rails.application.class.routes.url_helpers.rate_path %>',
        {
          score:     score,
          dimension: $this.attr('data-dimension'),
          id:        $this.attr('data-id'),
          klass:     $this.attr('data-classname')
        },
        function(data) {
          if(data) {
            // success code goes here ...

            if ($this.attr('data-disable-after-rate') === 'true') {
              $this.raty('set', { readOnly: true, score: score });
            }
          }
        });
      }
    });
  });
};

$(ratable);

if (typeof Turbolinks !== 'undefined')
  $(document).on('page:change', ratable);

})(jQuery);


