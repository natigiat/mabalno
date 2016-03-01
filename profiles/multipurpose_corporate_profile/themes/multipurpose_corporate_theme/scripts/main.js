// defin text logo

(function () {
    var app;
    jQuery(document).ready(function () {
        return app.init();
    });
    app = {
        text: '5 step code',
        index: 0,
        chars: 0,
        speed: 100,
        container: '.logotext .logocontent',
        init: function () {
            this.chars = this.text.length;
            return this.write();
        },
        write: function () {
            jQuery (this.container).append(this.text[this.index]);
            if (this.index < this.chars) {
                this.index++;
                return window.setTimeout(function () {
                    return app.write();
                }, this.speed);
            }
        }
    };
}.call(this));

(function ($) {
  // main slider
  Drupal.behaviors.mainOwlCarousel = {
    attach : function(context, settings) { 

      jQuery('#edit-tid-wrapper').find('.form-type-radio').each(function(){
         var codeSnip = (jQuery(this).text().toLowerCase().trim());
         $(this).css("background" , "tag-"+codeSnip);
         $(this).addClass("tag-"+codeSnip);
      });


      jQuery('.views-field-term-node-tid').find('a').each(function(){
         var codeSnip = (jQuery(this).text().toLowerCase().trim());
         $(this).addClass('tags');
         $(this).css("background" , "tag-"+codeSnip);
         $(this).addClass("tag-"+codeSnip);
      });
      

      jQuery('.pane-node-terms').find('a').each(function(){
         var codeSnip = (jQuery(this).text().toLowerCase().trim());
         $(this).addClass('tags');
         $(this).css("background" , "tag-"+codeSnip);
         $(this).addClass("tag-"+codeSnip);
      });
      


      //numbers for steps pages
      jQuery('.field-name-field-article').find('.field-name-field-step-title').each(function(index){
        $(this).append('<span class="step-count">- Step ' + parseInt(index+1) + '</span>');
      });


      var callbacks = {
        afterInit: mainSliderInit, 
        beforeMove: mainSliderBMove, 
        afterMove: mainSliderAMove, 
        addClassActive: true
      };
      for (var carousel in settings.owlcarousel) {
        if (carousel == 'owl-carousel-page') {
          $.extend(true, settings.owlcarousel[carousel].settings, callbacks);
        }
      }

      $sliderImg = $('.view-main-slider .views-field-field-background-image');

      $sliderImg.each(function() {
        if($(this).find('img').length == 0) {
          $(this).find('.field-content').css('background', '#1d374d');
        }
      });
    }
  };

  function mainSliderInit() {
    if(window.innerWidth >= 768) {
      $('.active .main-slider-text-wrapper').addClass('animated fadeInLeft');
      $('.active .main-slider-image img').addClass('animated zoomIn');
    } else {
      $('.active .main-slider-text-wrapper').addClass('animated fadeInUp');
    }
  }

  function mainSliderBMove() {
    if(window.innerWidth >= 768) {
      $('.active .main-slider-text-wrapper').removeClass('animated fadeInLeft');
      $('.active .main-slider-image img').removeClass('animated zoomIn');
    } else {
      $('.active .main-slider-text-wrapper').removeClass('animated fadeInUp');
    }
  }

  function mainSliderAMove() {
    if(window.innerWidth >= 768) {
      $('.active .main-slider-text-wrapper').addClass('animated fadeInLeft');
      $('.active .main-slider-image img').addClass('animated zoomIn');
    } else {
      $('.active .main-slider-text-wrapper').addClass('animated fadeInUp');
    }
  }

  // mobile menu
  Drupal.behaviors.mobileMenu = {
    attach : function(context, settings) {

      var mobile_settings = function(elem) {
        elem.removeClass('sf-horizontal');
        elem.removeClass('sf-shadow');
        elem.addClass('sf-vertical');
      };

      var desktop_settings = function(elem) {
        elem.addClass('sf-horizontal');
        elem.addClass('sf-shadow');
        elem.removeClass('sf-vertical');
      };

      $(document).click(function(event) {
        var main_menu = $('#block-superfish-1');
        if($(event.target).is('.btn-mobile-menu')) {
          if (!main_menu.is(':visible')) {
            main_menu.show();
          }
          else {
            main_menu.hide();
          }
        }
      });

      var $sfMenu;
      $sfMenu = $('#superfish-1');

      if(window.innerWidth <= 1024) {
        mobile_settings($sfMenu);
      }
      else {
        desktop_settings($sfMenu);
      }

      window.onresize = function () {
        if (window.innerWidth <= 1024) {
          mobile_settings($sfMenu);
        }
        else {
            desktop_settings($sfMenu);
            $('#block-superfish-1').css('display', '');
            $('#block-superfish-1').css('overflow', '');
            $('#block-superfish-1').removeClass('sf-menu-extended');
          }
      }

      $('#block-superfish-1 li').on('click', function(event) {
        if (window.innerWidth < 768) {
          var $submenu = $(this).closest('li').children('ul');
          if ($submenu.length) {
            $('#block-superfish-1').addClass('sf-menu-extended');
          }
        }
      });

    }
  };

  // match height(pricing tables)
  Drupal.behaviors.matchHeight = {
    attach : function(context, settings) {
      $('.pricing-table').matchHeight();
    }
  };

  $( document ).ready(function() {
    if (window.location.pathname == '/portfolio' || window.location.pathname == '/portfolio/column_three' || window.location.pathname == '/portfolio/column_four') {
      $('.view-portfolio-terms .view-header a').addClass('active');
    }
    else {
      $('.view-portfolio-terms .view-header a').removeClass('active');
    }
  });

})(jQuery);