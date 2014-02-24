var map;
var addresses = ["Times Square, Manhattan, NY 10036",
								"13000 S Dakota 244, Keystone, SD 57751",
								"1600 Pennsylvania Ave NW, Washington, DC 20500",
								"Golden Gate Bridge, San Francisco, CA 94129",
								"Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom",
								"Great Wall of China",
								"Hollywood Sign, Los Angeles, CA"];
//lat longs for each of the addresses above
var coordinates = [];
var myLatLng;
//after google geometry calculates the distance between the coordinate pairs listed above and the LFL office
var distances = [];
//variable that will allow us to iterate through the locations of each address
var addCoords;

//let's set Venice, CA to a variable, and set up our map preferences
function initialize() {
	var mapOptions = {
		zoom: 2,
    center: new google.maps.LatLng(30, -115),
    mapTypeId: google.maps.MapTypeId.TERRAIN,
		streetViewControl: false,
		zoomControl: true,
		panControl: false,
		disableDefaultUI: true,
	};
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

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
		    //function to sort these distances in numeric, ascending order
		    var compare = function(a,b) {
				  if (a.distance < b.distance)
				     return -1;
				  if (a.distance > b.distance)
				    return 1;
				  return 0;
				};
				//set up data visualization, used https://developers.google.com/maps/documentation/javascript/examples/polyline-simple 

				//using addCoords lets us iterate through placeCoords - this is for drawing the polylines between locations
				var placeCoords = [
			    myLatLng,
			    addCoords
			  ];

			  var journeyPath = new google.maps.Polyline({
			    path: placeCoords,
			    geodesic: true,
			    strokeColor: '#FF0000',
			    strokeOpacity: 1.0,
			    strokeWeight: 1.25
			  });
			  journeyPath.setMap(map);

				//wait to compare distances until we put anything to the DOM
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