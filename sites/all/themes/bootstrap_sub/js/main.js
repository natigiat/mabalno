Drupal.behaviors.Main = {
	attach : function(context , settings){
		
        if (jQuery(".html")[0]){

        	jQuery(".navbar-toggle").on('click', function(event) {
        		event.preventDefault();
        		jQuery(".main-nav").toggleClass('mobil-nav-view');
        	});

		}

	}
}



