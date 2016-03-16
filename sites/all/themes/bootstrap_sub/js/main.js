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



