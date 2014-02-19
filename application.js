var map;
var addresses = ["Times Square, Manhattan, NY 10036",
								"13000 S Dakota 244, Keystone, SD 57751",
								"1600 Pennsylvania Ave NW, Washington, DC 20500",
								"Golden Gate Bridge, San Francisco, CA 94129",
								"Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
								"Great Wall of China",
								"Hollywood Sign, Los Angeles, CA"];
var coordinates = [];
var myLatLng;
var distances = [];

//let's find Venice, CA, shall we? myLatLng = Venice, CA
function initialize() {
	var myLatLng = new google.maps.LatLng(33.988233, -118.459086);
	var mapOptions = {
		center: myLatLng,
		zoom: 16,
		streetViewControl: false,
		zoomControl: true,
		panControl: false,
		disableDefaultUI: true,
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	//only execute after API has fully loaded!
	function loadScript() {
	  var script = document.createElement('script');
	  script.type = 'text/javascript';
	  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
	      'callback=initialize';
	  document.body.appendChild(script);
	};
	window.onload = loadScript;
}; //end of initialize
	
//how far away is a specific address from the map center?
$(document).ready(function(myLatLng) {
	var myLatLng = new google.maps.LatLng(33.988233, -118.459086);
	// use google geometry library to turn the address into lat and long
	var getStuff = function(thisAddress){
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+thisAddress+'&sensor=false', null, function (data) {
		    var p = data.results[0].geometry.location;
		    //every location, set to a variable name so we can compute the distance between
		    var addCoords = new google.maps.LatLng(p.lat, p.lng); 

		    //every location's distance from LFL office computed, converted into kilometers
				distances.push({ place: thisAddress, distance: (google.maps.geometry.spherical.computeDistanceBetween(myLatLng, addCoords)/1000)});
		    //sort these distances in numeric, ascending order
		    var compare = function(a,b) {
					  if (a.distance < b.distance)
					     return -1;
					  if (a.distance > b.distance)
					    return 1;
					  return 0;
					};
				//wait to compare until we put anything to the DOM
		    if(distances.length == 7) {
					distances.sort(compare);
					//now we can use jQuery to put the place name/distance from LFL office to the right div
					for (var i = 0; i < distances.length; i++) {
		    		$("#places").append((i+1) + '.  ' + distances[i].place + '</br>' + distances[i].distance.toFixed(2) + ' kilometers' + '</br>');
		    	};
				};
		  });
		};
	
	var adlength = addresses.length;
	//loop through each address and pull out the lat and lng
	for(var x = 0; x < adlength; x++) {
		getStuff(addresses[x]);

	}
});


