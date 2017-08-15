var path = "http://flip3.engr.oregonstate.edu:9477/";

function submitGasstation() {

	var userId = parseInt(document.getElementById("uid").innerHTML);

	var bp = document.getElementById("BP").checked;
	bp = bp ? 1 : 0;  // bp = 1 if true & 0 if false

	var chevron = document.getElementById("chevron").checked;
	chevron = chevron ? 1 : 0;

	var circlek = document.getElementById("circlek").checked;
	circlek = circlek ? 1 : 0;

	var citgo = document.getElementById("citgo").checked;
	citgo = citgo ? 1 : 0;

	var costco = document.getElementById("costco").checked;
	costco = costco ? 1 : 0;

	var cumberland = document.getElementById("cumberland").checked;
	cumberland = cumberland ? 1 : 0;

	var exxon = document.getElementById("exxon").checked;
	exxon = exxon ? 1 : 0;

	var frontier = document.getElementById("frontier").checked;
	frontier = frontier ? 1 : 0;

	var kum = document.getElementById("kum").checked;
	kum = kum ? 1 : 0;

	var mobil = document.getElementById("mobil").checked;
	mobil = mobil ? 1 : 0;

	var race = document.getElementById("race").checked;
	race = race ? 1 : 0;

	var shell = document.getElementById("shell").checked;
	shell = shell ? 1 : 0;

	var sams = document.getElementById("sams").checked;
	sams = sams ? 1 : 0;

	var speedway = document.getElementById("speedway").checked;
	speedway = speedway ? 1 : 0;

	var sunoco = document.getElementById("sunoco").checked;
	sunoco = sunoco ? 1 : 0;

	var wawa = document.getElementById("wawa").checked;
	wawa = wawa ? 1 : 0;

	var seven = document.getElementById("seven").checked;
	seven = seven ? 1 : 0;

	var methanol = document.getElementById("methanol").checked;
	methanol = methanol? 1 : 0;

	var gasoline = document.getElementById("gasoline").checked;
	gasoline = gasoline ? 1 : 0;

	var diesel = document.getElementById("diesel").checked;
	diesel = diesel ? 1 : 0;

	var hydrogen = document.getElementById("hydrogen").checked;
	hydrogen = hydrogen ? 1 : 0;

	var charge = document.getElementById("charge").checked;
	charge = charge ? 1 : 0;

	var biodiesel = document.getElementById("biodiesel").checked;
	biodiesel = biodiesel ? 1 : 0;

	var formData = { 
		userId: userId,
		BP: bp,
		Chevron: chevron,
		Circlek: circlek,
		Citgo: citgo,
		Costco: costco,
		Cumberland: cumberland,
		Exxon: exxon,
		Frontier: frontier,
		Kum: kum,
		Mobil: mobil,
		Race: race,
		Shell: shell,
		Sams: sams,
		Speedway: speedway,
		Sunoco: sunoco,
		Wawa: wawa,
		Seven: seven,
		Methanol: methanol,
		Gasoline: gasoline,
		Diesel: diesel,
		Hydrogen: hydrogen,
		Charge: charge,
		Biodiesel: biodiesel
	}

	console.log(formData);  // successfully logs upon submission

	var req = new XMLHttpRequest();
	req.open('POST', path + 'add_gasstation', true);
	req.setRequestHeader("Content-Type", "application/json");

	formData = JSON.stringify(formData);
	req.send(formData);

	req.addEventListener('load', function() {
		if(req.status == 200) {
			alert("Your gasstation preferences were uploaded successfully!");
			window.location = path + "landing"; 
		} else {
			alert("There was an error uploading your preferences. Please try again later.");
		}
	});
}

function skipGasstation() {
	var retVal = confirm("Are you sure?");
	if (retVal == true) {
		window.location = path + "landing";
	} else {
		return;
	}
}

document.getElementById("submit").addEventListener("click", submitGasstation);
document.getElementById("skip").addEventListener("click", skipGasstation);