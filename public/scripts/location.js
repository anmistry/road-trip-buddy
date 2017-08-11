var map;
var corvallis = {lat: 44.57, lng: -123.28};
//var path = "http://flip3.engr.oregonstate.edu:9501/"
var path = "http://flip3.engr.oregonstate.edu:9477/"

/**
 * The CenterControl adds a control to the map that recenters the map on
 * Chicago.
 * This constructor takes the control DIV as an argument.
 * @constructor
 */
function CenterControl(controlDiv, map) {
  //add button element
  var dropBtn = document.createElement('button');
  dropBtn.setAttribute("onclick", "dropdownFunction()");
  dropBtn.setAttribute("class", "dropbtn");
  dropBtn.innerHTML = 'Options';
  controlDiv.appendChild(dropBtn);

  //add div element to hold options
  var optionContainer = document.createElement('div');
  optionContainer.setAttribute("class", "dropdown-content");
  optionContainer.setAttribute("id", "myDropdown");
  controlDiv.appendChild(optionContainer);

  //add first option
  var a = document.createElement('a');
  a.setAttribute("href", path + "billing_info");
  var b = document.createTextNode("Enter Billing Info");
  a.appendChild(b);
  optionContainer.appendChild(a);

  //add second option
  a = document.createElement('a');
  a.setAttribute("href", path + "model_and_make");
  b = document.createTextNode("Enter Model and Make");
  a.appendChild(b);
  optionContainer.appendChild(a);

  //add third option
  a = document.createElement('a');
  a.setAttribute("href", "#");
  b = document.createTextNode("Enter Gas Station Preferences");
  a.appendChild(b);
  optionContainer.appendChild(a);

  //add fourth option
  a = document.createElement('a');
  a.setAttribute("href", path + "preferences");
  b = document.createTextNode("Enter My Preferences");
  a.appendChild(b);
  optionContainer.appendChild(a);

  infoWindow = new google.maps.InfoWindow;

  
  // Setup the click event listeners: simply set the map to Chicago.
  //controlUI.addEventListener('change', function() {
  //});

}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: corvallis
  });
  
  // Create the DIV to hold the control and call the CenterControl()
  // constructor passing in this DIV.
  var centerControlDiv = document.createElement('div');
  centerControlDiv.setAttribute("class", "dropdown");
  var centerControl = new CenterControl(centerControlDiv, map);

  centerControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(centerControlDiv);
}

function dropdownFunction(){
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
