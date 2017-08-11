//var path = "http://flip3.engr.oregonstate.edu:9501/";
var path = "http://flip3.engr.oregonstate.edu:9477/";

function userPreferences() {
	var userId = parseInt(document.getElementById("uid").innerHTML);
	var hikes = document.getElementById("hikes").checked;  // Set to true or false
	if (hikes == true)
		hikes = 1;
	else hikes = 0;
	var tpark = document.getElementById("tpark").checked;
	if (tpark == true)
		tpark = 1;
	else tpark = 0;
	var museum = document.getElementById("museum").checked;
	if (museum == true)
		museum = 1;
	else museum = 0;
	var mall = document.getElementById("mall").checked;
	if (mall == true)
		mall = 1;
	else mall = 0;
	var npark = document.getElementById("npark").checked;
	if (npark == true)
		npark = 1;
	else npark = 0;
	var sports = document.getElementById("sports").checked;
	if (sports == true)
		sports = 1;
	else sports = 0;
	var wpark = document.getElementById("wpark").checked;
	if (wpark == true)
		wpark = 1;
	else wpark = 0;
	var landmark = document.getElementById("landmark").checked;
	if (landmark == true)
		landmark = 1;
	else landmark = 0;
	var musicEvent = document.getElementById("musicEvent").checked;
	if (musicEvent == true)
		musicEvent = 1;
	else musicEvent = 0;
	
	var formData = { 
		userID: userId,
		NatureHikes: hikes,
		ThemeParks: tpark,
		Museum: museum,
		ShoppingMalls: mall,
		NatureParks: npark,
		SportingEvents: sports,
		WaterPark: wpark,
		FamousLandmarks: landmark,
		MusicEvents: musicEvent
	}

	var req = new XMLHttpRequest();
	req.open('POST', path + 'add_preferences', true); 
	req.setRequestHeader("Content-Type", "application/json");

	formData = JSON.stringify(formData);
	req.send(formData);

	req.addEventListener('load', function() {
		if(req.status == 200) {
			alert("Your preferences were uploaded successfully!");
			window.location = path + "landing"; // Should be the landing(map) page
		} else {
			alert("There was an error uploading your preferences. Please try again later.");
		}
	});
}

function skipPreferences() {
	var retVal = confirm("If you skip this process, the app will not be able to give you personalized results. Are you sure you want to skip?");
	if (retVal == true) {
		window.location = path + "landing";
	} else {
		return;
	}
}

document.getElementById("submit").addEventListener("click", userPreferences);
document.getElementById("skip").addEventListener("click", skipPreferences);
