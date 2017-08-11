//var path = "http://flip3.engr.oregonstate.edu:9501/";
var path = "http://flip3.engr.oregonstate.edu:9477/";

function addBillingInfo(){
	var userId = parseInt(document.getElementById("uid").innerHTML);
	var first_name = document.getElementById("first_name").value;
	var last_name = document.getElementById("last_name").value;
	var phone_no = document.getElementById("phone_no").value;
	var card_name = document.getElementById("card_name").value;
	var card_no = document.getElementById("card_no").value;
	var csc_no = document.getElementById("csc_no").value;
	var exp_mon = document.getElementById("exp_mon").value;
	var exp_yr = document.getElementById("exp_yr").value;
	var card_type = document.getElementById("card_type").value;

	if (!first_name || !last_name || !phone_no || !card_name || !card_no || !csc_no || !exp_mon || !exp_yr || !card_type)
	{
		alert("All fields on this page are mandatory. Please fill out all information and try again.");
	}
	else{
		var formData = {
			userId: userId,
			first_name: first_name,
			last_name: last_name,
			phone_no: phone_no,
			card_name: card_name,
			card_no: card_no,
			csc_no: csc_no,
			exp_mon: exp_mon,
			exp_yr: exp_yr,
			card_type: card_type
		}

		var req = new XMLHttpRequest();
		req.open('POST', path + 'add_billing', true);
		req.setRequestHeader("Content-Type", "application/json");

		formData = JSON.stringify(formData);
		req.send(formData);

		req.addEventListener('load', function() {
			if (req.status == 200){
				alert("Credit Card Info successfully entered!");
				window.location = path + "landing";
			}
			else {
				alert("There was an error entering your credit card info. Please try again later.");
			}
		});
	}
}