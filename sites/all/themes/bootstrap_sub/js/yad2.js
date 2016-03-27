Drupal.behaviors.mapMain = {
	attach : function(context , settings){
		
        if (jQuery(".front")[0] || jQuery(".page-node-1571")[0]){


	        //fix price text 
            jQuery(".views-field-field-yad2-price-1").each(function(index, el) {
            	var price = jQuery(this).text();
            	price = price.trim();
            	price = price.split(".")[0];
            	
          	    
                  jQuery(this).find(".field-content").replaceWith( "₪"+price );
            	
            	
            	
            });

	        //set map container
	        jQuery("#map-container").html('<div id="map" class="hidden-xs" style="position: absolute; height: 100%; width: 100%;"></div>');
	        
	        var data = [];
	        //get data from view details 
	        var getData = function( ) {
		        jQuery('.view-yad2').find(".view-content").find(".views-row").each(function(index, el) {
				     
		          
		           //price
		           var price = jQuery(this).find(".views-field-field-yad2-price-1").find(".field-content").text();
		           price = price.trim();
		           var nid = jQuery(this).find(".views-field-nid").text();
				   
		           // get locations
				   var cor = jQuery(this).find("div[class$='loca']").text();
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
	        // console.log(data);

	       

			// initialize map with data

			var iconclasses = {
			  exclamation: 'font-size: 22px;',
			  A: 'font-size: 22px;'
			};
			var map = new L.Map('map', {
			  center: [data[0].lat,data[0].lon],
			  zoom: 13,
			  minZoom: 9
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
          
            
            //center to location and show background on location
            jQuery('.view-yad2').find(".view-content").find(".views-row").on('hover',  function(event) {
		 	    var nid = jQuery(this).find(".views-field-nid").text();
		 	    jQuery('.leaflet-marker-pane').find('.icon[nid="'+nid+'"]').toggleClass('iconhover');
		 	    jQuery('.leaflet-marker-pane').find('.icon[nid="'+nid+'"]').next('.arrow').toggleClass('iconhoverArrow');


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


				   map.panTo(new L.LatLng(one, two));
		 	
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
          

            //show page view ifram on map
            //
            jQuery('.views-field-title').on('click', function(event) {
            	event.preventDefault();
            	var nid = jQuery(this).find('a').attr('href');
            	console.log(nid);
            	jQuery('#map').css('display', 'none');
            	if(jQuery('#iframeId').length){ 
                   jQuery('#iframeId').attr('src', nid);
            	}else{
            	   jQuery('.control-label').append(' <iframe frameborder="0" id="iframeId" name="iframeId" src="'+nid+'" ></iframe>');
            	}
           	
            });

			jQuery('.leaflet-tile , .icon').on('click', function(event) {
				jQuery('.box-view').remove();
			});

			jQuery('.view-yad2').on('hover', function(event) {
				jQuery('.box-view').remove();
			});

			
            

			
            //this event after clicking on icon in map, this will center the map and show info
			jQuery('.icon').each(function(index, el) {
				jQuery(this).on("click", function(){
			        
			        // var nid and icon
                    var icon = jQuery(this);
			        var nid = jQuery(this).attr("nid");
			        nid = nid.trim();

		 	        
		 	        jQuery('.view-yad2').find(".view-content").find(".views-row").each(function(index, el) {
                       
		 	        	var viewNid = jQuery(this).find(".views-field-nid").text();
		 	        	viewNid = viewNid.trim();
                       

		 	        	if(nid == viewNid) {
		 	        		nImage = jQuery(this).find(".views-field-field-yad2-main-image").find("img").attr('src');
		 	        		nSlider = jQuery(this).find(".views-field-field-yad-gallery");
		 	        		nTitle = jQuery(this).find(".views-field-title").find('a').text();;
		 	        		nPrice = jQuery(this).find(".views-field-field-yad2-price-1").find('.field-content').text();
		 	        		nName = jQuery(this).find(".views-field-field-yad2-name").find('.field-content').text();
		 	        		nTelPre = jQuery(this).find(".views-field-field-yad2-tel-pre").find('.field-content').text();
		 	        		nTel = jQuery(this).find(".views-field-field-yad2-tel").find('.field-content').text();


		 	        		// center map
		                    var cor = jQuery(this).find(".views-field-field-yad2-loca").text();
						    var cor = cor.split(",");

						    var one=cor[0];
						    var two=cor[1];
						    one = one.replace("Geolocation", "");
						    one = one.replace("is", "");

						    one = one.replace(/\s+/g, '');
						    two = two.replace(/\s+/g, '');
		                    map.panTo(new L.LatLng(one, two));


		 	        		if (nSlider.find('div').length > 3){
		 	        			nSliderHtml = jQuery(this).find(".views-field-field-yad-gallery").html();
		 	        			icon.after('<div class="box-view"><div class="box-price">'+nPrice+'</div><div class="box-details"><div class="box-title">'+nTitle+'</div><div class="box-name col-sm-6 pull-right">'+nName+'</div><div class="box-number col-sm-6 pull-right">'+nTelPre+'-'+nTel+'</div></div></div>');
		 	        			jQuery(this).find(".views-field-field-yad-gallery").prependTo('.box-view');
		 	        			jQuery(this).find(".views-field-privatemsg-link").clone().appendTo('.box-view');
		 	        		}else{
		 	        			icon.after('<div class="box-view"><img class="img-responsive" src="'+nImage+'" width="100%" height="240px" alt=""><div class="box-details"><div class="box-price">'+nPrice+'</div><div class="box-title">'+nTitle+'</div><div class="box-name col-sm-6 pull-right">'+nName+'</div><div class="box-number col-sm-6 pull-right">'+nTelPre+'-'+nTel+'</div></div></div>');
		 	        			jQuery(this).find(".views-field-privatemsg-link").clone().appendTo('.box-view');
		 	        		}
		 	        		
		 	        		
		 	        	}
                       
		 	        });
			    });

                jQuery(this).on("blur", function(){
                	jQuery('.box-view').remove();
                });

			});

			
			


		}

	}
}



