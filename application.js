var leftFieldLocation = "510 Victoria Avenue, Venice, California"
var map;
var addresses;

//let's find Venice, CA, shall we? myLatLng = Venice, CA
function initialize() {
	var myLatLng = new google.maps.LatLng(33.9908, -118.4592);
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
	

$(document).ready(function() {
//how far away is a specific address from the map center?
	// function addressDistance() {
		var addresses = ["Times Square, Manhattan, NY 10036",
								"13000 S Dakota 244, Keystone, SD 57751",
								"1600 Pennsylvania Ave NW, Washington, DC 20500",
								"Golden Gate Bridge, San Francisco, CA 94129",
								"Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
								"Great Wall of China",
								"Hollywood Sign, Los Angeles, CA"];
		var length = addresses.length;
		//loop through each address and pull out the lat and lng
		for(var x = 0; x < length; x ++) {
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
	        var p = data.results[0].geometry.location;
	        var latlng = new google.maps.LatLng(p.lat, p.lng);
	        console.log(latlng);
	        new google.maps.Marker({
	          position: latlng,
	          map: map
	      });
	    });
		};
		console.log(p);
		console.log(latlng);
	// };
});

	//list addresses in order from closest to furthest away


