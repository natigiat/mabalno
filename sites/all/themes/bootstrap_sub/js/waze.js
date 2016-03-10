(function($){
$(document).ready(function(){
$('a.waze').bind('click', function(){
var lat = $(this).attr('latitude');
var lng = $(this).attr('longitude');
window.location.href = 'waze://?ll=' + lat + ',' + lng;
return false;
});
});
})(jQuery)