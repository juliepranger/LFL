// Times Square, Manhattan, NY 10036
// 13000 S Dakota 244, Keystone, SD 57751
// 1600 Pennsylvania Ave NW, Washington, DC 20500
// Golden Gate Bridge, San Francisco, CA 94129
// Stonehenge, A344, Amesbury, Wiltshire SP4 7DE, United Kingdom
// Great Wall of China
// Hollywood Sign, Los Angeles, CA

// 510 Victoria Ave, Venice, CA

// AIzaSyDNyFkQqavEyav5plWW9IaSi26UCm-g8Cw

// var leftFieldLocation;
// var LatLng;
var map;

//let's find Venice, CA, shall we?
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
};

//only execute after API has fully loaded!
function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;



