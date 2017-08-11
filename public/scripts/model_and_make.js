//var path = "http://flip3.engr.oregonstate.edu:9501/";
var path = "http://flip3.engr.oregonstate.edu:9477/";

function enterMakeModel() {
	var userId = parseInt(document.getElementById("uid").innerHTML);
	var make = document.getElementById("make").value;
	var model = document.getElementById("model").value;

	var formData = {
		userId: userId,
		make: make,
		model: model
	}

	var req = new XMLHttpRequest();
	req.open('POST', path + 'add_make_model', true); 
	req.setRequestHeader("Content-Type", "application/json");

	formData = JSON.stringify(formData);
	req.send(formData);

	req.addEventListener('load', function() {
		if(req.status == 200) {
			alert("Your make/model were uploaded successfully!");
			window.location = path + "landing"; // Should be the landing(map) page
		} else {
			alert("There was an error uploading your make/model. Please try again later.");
		}
	});
}

function cancelEntry() {
	window.location = path + "landing";
}

document.getElementById("save").addEventListener("click", enterMakeModel);
document.getElementById("cancel").addEventListener("click", cancelEntry);