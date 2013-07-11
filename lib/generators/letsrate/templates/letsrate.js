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

        $.ajax({
          type:     'POST',
          url:      '<%= Rails.application.class.routes.url_helpers.rate_path %>',
          data:     {
            score:     score,
            dimension: $this.attr('data-dimension'),
            id:        $this.attr('data-id'),
            klass:     $this.attr('data-classname')
          },
          complete: function(xhr, status) {
            var data = $.parseJSON(xhr.responseText);

            if (xhr.status === 200) {
              // success code goes here ...

              if ($this.attr('data-disable-after-rate') === 'true') {
                $this.raty('set', { readOnly: true, score: score });
              }

              $this.trigger('ratingsucceeded', [data, xhr]);
            } else {
              // failure code goes here ...
              $this.trigger('ratingfailed', [data, xhr]);
            }
          }
        });
      }
    });
  });
};

$.letsrate        = {};
$.letsrate.update = ratable;

$(ratable);

if (typeof Turbolinks !== 'undefined')
  $(document).on('page:change', ratable);

})(jQuery);
