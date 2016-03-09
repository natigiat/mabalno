Drupal.behaviors.mapMain = {
	attach : function(context , settings){
		
        if (jQuery(".front")[0]){


	        // var map = L.map('map').setView([31.79239138817601, 35.14869689941406], 13);
	        
	        jQuery("#map-container").html('<div id="map" class="hidden-xs" style="position: absolute; height: 100%; width: 100%;"></div>');
	        
	        var data = [];
	        //get data from view details
	        
	        var getData = function(  ) {
		        jQuery('.view-yad2').find(".view-content").find(".views-row").each(function(index, el) {
				     
		           //price
		           var price = jQuery(this).find(".views-field-field-yad2-price-1").find(".field-content").text();
		           var nid = jQuery(this).find(".views-field-nid").text();
				   
				   jQuery('.views-field-field-yad2-loca')
		           // get locations
				   var cor = jQuery(this).find(".views-field-field-yad2-loca").text();
				   var cor = cor.split(",");

				   var one=cor[0];
				   var two=cor[1];
				   one = one.replace("Geolocation", "");
				   one = one.replace("is", "");

				   one = one.replace(/\s+/g, '');
				   two = two.replace(/\s+/g, '');

				   // console.log( one ,  two);
				   jQuery(this).find('.waze').attr('latitude' , one);
				   jQuery(this).find('.waze').attr('longitude', two);

		           data.push({iconclass: price, nid:nid , lat: one, lon: two});
		          
				});
	        
	        }
	        
	        getData();
	        console.log(data);

	       

			// initialize map with data

			var iconclasses = {
			  exclamation: 'font-size: 22px;',
			  A: 'font-size: 22px;'
			};
			var map = new L.Map('map', {
			  center: [data[0].lat,data[0].lon],
			  zoom: 13,
			  minZoom: 7
			});

			L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png').addTo(map);

            


			
			data.forEach(function(row){
			  var pos = new L.LatLng(row.lat,row.lon);
			  var iconclass = iconclasses[row.iconclass]?row.iconclass:'';
			  var iconstyle = iconclass?iconclasses[iconclass]:'';
			  var icontext = iconclass?'':row.iconclass;
			  var nid = nid?'':row.nid;

			   var icon = L.divIcon({
			     className: 'map-marker '+iconclass,
			     iconSize:null,
			     html:'<div class="icon" nid="'+nid+'" style="'+iconstyle+'">'+icontext+'</div><div class="arrow" />'
			   });

			  L.marker(pos).addTo(map); //reference marker
			  L.marker(pos,{icon: icon}).addTo(map);

			});
          

            jQuery('.view-yad2').find(".view-content").find(".views-row").on('hover',  function(event) {
		 	    var nid = jQuery(this).find(".views-field-nid").text();
		 	    jQuery('.leaflet-marker-pane').find('.icon[nid="'+nid+'"]').toggleClass('iconhover');
		 	    jQuery('.leaflet-marker-pane').find('.icon[nid="'+nid+'"]').next('.arrow').toggleClass('iconhoverArrow');
		 	
		    });      


			jQuery(window).resize(function() {
		        // This will fire each time the window is resized:
		        if(jQuery(window).width() <= 750) {
		            // if smaller or equal
		            console.log("bg");
		            jQuery('#yad2').find('.view-yad2').addClass('full-width');
		        }else{
		        	jQuery('#yad2').find('.view-yad2').removeClass('full-width');
		        }
		    }).resize(); // This will simulate a resize to trigger the initial run.


            //fix layout
            jQuery('.views-exposed-widget').find('.form-type-bef-link').addClass('custom-button');
            jQuery('.ctools-auto-submit-processed').attr('placeholder', 'חפש מוצר');
            jQuery('.ctools-auto-submit-processed').on('focus', function(event) {
            	jQuery(this).attr('placeholder', '');	
            });

            jQuery('.ctools-auto-submit-processed').on('blur', function(event) {
            	jQuery(this).attr('placeholder', 'חפש מוצר');	
            });



		}

	}
}



