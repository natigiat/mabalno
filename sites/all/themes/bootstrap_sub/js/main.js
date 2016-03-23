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


