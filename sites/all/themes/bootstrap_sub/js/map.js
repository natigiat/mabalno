Drupal.behaviors.mapMain = {
	attach : function(context , settings){
		
        if (jQuery(".page-node-150")[0]){


	        // var map = L.map('map').setView([31.79239138817601, 35.14869689941406], 13);
	        
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

				   console.log( one ,  two);
		           data.push({iconclass: price, lat: one, lon: two});
		          
				});
	        
	        }
	        
	        getData();


				  
		    jQuery('.view-yad2').find(".view-content").find(".views-row").on('hover',  function(event) {
		 	    var nid = jQuery(this).find(".views-field-nid").text();
		 	    console.log(nid);
		 	
		    });             
		          

			var iconclasses = {
			  exclamation: 'font-size: 22px;',
			  A: 'font-size: 22px;'
			};
			var map = new L.Map('map', {
			  center: [data[0].lat,data[0].lon],
			  zoom: 13
			});
			L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png').addTo(map);

			
			data.forEach(function(row){
			  var pos = new L.LatLng(row.lat,row.lon);
			  var iconclass = iconclasses[row.iconclass]?row.iconclass:'';
			  var iconstyle = iconclass?iconclasses[iconclass]:'';
			  var icontext = iconclass?'':row.iconclass;

			   var icon = L.divIcon({
			     className: 'map-marker '+iconclass,
			     iconSize:null,
			     html:'<div class="icon" style="'+iconstyle+'">'+icontext+'</div><div class="arrow" />'
			   });

			  L.marker(pos).addTo(map); //reference marker
			  L.marker(pos,{icon: icon}).addTo(map);

			});




		}

	}
}



