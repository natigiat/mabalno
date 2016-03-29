Drupal.behaviors.Main = {
	attach : function(context , settings){
		
        if (jQuery(".html")[0]){

        	jQuery(".navbar-toggle").bind('touchstart click', function(){
        		jQuery(".main-nav").toggleClass('mobil-nav-view');
        		return false;
        	});

		}

	}
}

 Drupal.behaviors.autoUpload = {
    attach: function (context, settings) {
      jQuery('form', context).delegate('input.form-file', 'change', function() {  
        var a = jQuery(this).next('.input-group-btn').find('.form-submit').mousedown();
      }); 

      jQuery('form', context).delegate('.filefield-source-plupload', 'change', function() {  
         jQuery(this).find('button').mousedown();
      }); 
    }
  };



  Drupal.behaviors.autoUpload = {
    attach: function (context, settings) {

      jQuery(".messages-icon").wrapInner( "<div class='messeges-number'></div>");
      jQuery(".messages-icon").addClass('badge');
      jQuery(".messages-icon").addClass('badge-notify');
      
      if (!jQuery('.glyphicon-comment').length) {
		jQuery(".messages-icon").before('<a href"#"="" class="btn btn-default btn-lg btn-link""> <span class="glyphicon glyphicon-comment"></span> </a>'); 
	  } 
      
    }
  };


  Drupal.behaviors.nodeType = {
    attach: function (context, settings) {

      if (jQuery(".node-type-yad2")[0]){
        
        // fix slideshow display
        jQuery(".field-slideshow-1").hide();
        jQuery("#field-slideshow-1-wrapper").click(function(event) {
        	jQuery(".field-slideshow-1").show();
        })

        jQuery(".field-collection-item-field-yad2-contacts").append('<div id="bt"><div id="bt_wrapper"> <div class="bt_wrap bt_phone"> <div class="box"> <i class="icon fa fa-phone"></i> <i class="icon2 fa fa-phone"></i> </div> </div> <div class="bt_wrap bt_messages"> <div class="box"> <i class="icon fa fa-envelope"></i> <i class="icon2 fa fa-envelope"></i> </div> </div> <div class="bt_wrap bt_social"> <div class="box"> <i class="icon fa fa-share-square"></i> <i class="icon2 fa fa-share-square"></i> </div> </div> </div></div>');
        jQuery(".field-collection-item-field-yad2-contacts").find(".content").hide();
        
        jQuery(".bt_phone").click(function(event) {
        	jQuery(".field-collection-item-field-yad2-contacts").find(".content").show();
        });


        jQuery('.panels-flexible-region-first').find('.pane-addtoany').css({
		    position: "absolute",
		    width: "100%",
		    height: "100%",
		    left: 0,
		    width:"100%",
		    top: 0,
		    zIndex: 1000000,  // to be on the safe side
		    background: "url(/img/loading.gif) no-repeat 50% 50%"
		}).appendTo(jQuery(".bt_social").css("position", "relative"));
        
      }
   
      
    }
  };



