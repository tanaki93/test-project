$(document).ready(function() {

    var pl_title = '';
    var pl1 = '';
    var pl2 = '';

    $('.back-bt').bind("click", function(){
      $('.plan').each(function(){
        if(!$(this).attr('style') || $(this).attr('style') == 'display: block;'){
          if (!pl2 == '') {
            pl2 = '';
            $('.pl-title span.build').html(pl1);
            $('.pl-title span.stage').html(pl2);
          }
          back = $(this).attr('data-back');
          $(this).fadeOut("fast", function(){
            if(back == '#plan-main') {
              $('.back-bt').fadeOut("fast");
              pl1 = '';
              pl2 = '';
              $('.pl-title span.build').html('');
              $('.pl-title span.stage').hide().html('');
            }
            $(back).fadeIn("fast", function(){
              draw_plan($('map area', back));
            });
          });
        }
      });
      return false;
    });

    draw_plan($('#plan-main map area'));

    function draw_plan(area){
      var area_items = area;
      $('img[usemap]').rwdImageMaps();
      $('.plan img').maphilight({
              fill: true,
              // alwaysOn: true,
              fillColor: '131e70',
              fillOpacity: 0.7,
              stroke: false
      });

      area_items.each(function(){
          $(this).qtip({
              content: '<div class="qtip-container"><p class="title">'+ $(this).attr('data-title') +'</p></div>',
              position: {
                  target: 'mouse',
                  adjust: {
                      x: -100,  y: -100
                  }
              },
              style: {
                  width: 200,
                  height: 70
              }
          });
      });

      $(area_items).bind("click", function(){
        if($(this).hasClass('cfalse')){
          return false;
        }
        if($(this).hasClass('cplan')){
          $(this).colorbox({
            close: 'закрыть',
            width: 'auto',
            maxHeight: '80%',
            slideshow: false,
            fixed: true
          });
        }else{
          if (pl1 == '') {
            pl1 = $(this).attr('data-title');
          }else {
            pl2 = ' - ' + $(this).attr('data-title');
          }

          $('.back-bt').fadeIn("fast");
          $('.pl-title span.build').html(pl1);
          $('.pl-title span.stage').show().html(pl2);

          if( '#' + $(this).parent().parent().attr('id') == '#plan-main') {
            $('.pl-title span.stage').hide().html('');
          }

          o_plan = $(this).attr('data-plan');

          $(this).parent().parent().fadeOut("fast", function(){
            $(o_plan).fadeIn("fast", function(){
              draw_plan($('map area', this));
            });
          });
          return false;
        }
      });
    }

});
