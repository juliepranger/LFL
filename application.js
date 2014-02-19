var leftFieldLocation = "510 Victoria Avenue, Venice, California"
var map;
var addresses;
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
		var coordinates = [];
		var adlength = addresses.length;
		var colength = coordinates.length;
		//loop through each address and pull out the lat and lng
		for(var x = 0; x < adlength; x++) {
			$.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address='+addresses[x]+'&sensor=false', null, function (data) {
	        var p = data.results[0].geometry.location;
	        var latlng = new google.maps.LatLng(p.lat, p.lng);
	        console.log(latlng);
	        coordinates.push(latlng);
	        new google.maps.Marker({
	          position: latlng,
	          map: map
	      });
	    });
		};
		// for(var y = 0; y < colength; y++) {
		// 	distances.push(google.maps.geometry.spherical.computeDistanceBetween(myLatLng, coordinates[y].Q.latlng));
		// 	console.log(distances);
		// };

		//every location, set to a variable name so we can compute the distance between
		var LatLngOne = new google.maps.LatLng(33.988233, -118.459086); //LFL office
		var LatLngTwo = new google.maps.LatLng(40.431908, 116.570375); //Great Wall of China
		var LatLngThree = new google.maps.LatLng(40.758760, -73.984754); //Times Square
		var LatLngFour = new google.maps.LatLng(43.875419, -103.453144); //Mt. Rushmore
		var LatLngFive = new google.maps.LatLng(38.897838, -77.036512); //White House
		var LatLngSix = new google.maps.LatLng(37.819878, -122.478503); //Golden Gate Bridge
		var LatLngSeven = new google.maps.LatLng(51.178882, -1.826215); //Stonehenge
		var LatLngEight = new google.maps.LatLng(34.134101, -118.321684); //Hollywood Sign

		answer = google.maps.geometry.spherical.computeDistanceBetween(LatLngOne, LatLngTwo);
		console.log(answer); //answer in meters
});

	//list addresses in order from closest to furthest away


