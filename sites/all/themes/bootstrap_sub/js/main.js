Drupal.behaviors.Main = {
	attach : function(context , settings){
		
        if (jQuery(".html")[0]){

        	jQuery(".navbar-toggle").click(function(event) {
        		jQuery(".main-nav").toggleClass('mobil-nav-view');
        		alert(22);
        		return false;
        	});

		}

	}
}



