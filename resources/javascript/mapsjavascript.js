let map;
let directionsService;
let directionsRenderer;


// Categorized food stalls
const categorizedFoodStalls = {
  budget: [
    { lat: 14.62658832747117, lng: 121.03708157937747, name: "Eli's Kainan Lugaw", priceRange: "₱" },
    { lat: 14.62947448192729, lng: 121.04386416664083, name: "A&A Cafe Food & Beverage", priceRange: "₱" },
    { lat: 14.629552626557162, lng: 121.0409937876642, name: "Masaderia", priceRange: "₱" },
    { lat: 14.62975679975855, lng: 121.04180774981167, name: "Ava's Carenderia", priceRange: "₱" },
    { lat: 14.62904360637158, lng: 121.03865726478979, name: "Atty. Lugaw", priceRange: "₱" }
    
  ],
  affordable: [
    { lat: 14.630618, lng: 121.045587, name: "Chowking", priceRange: "₱₱" },
    { lat: 14.628561277368682, lng: 121.03405615129736, name: "Mcdonald's Tomas Morato", priceRange: "₱₱" },
    { lat: 14.63237515624982, lng: 121.04150738013324, name: "Famouse BBQ & Silog Station", priceRange: "₱₱" },
    { lat: 14.629625404087946, lng: 121.04207628191672, name: "Seoulful Sweets", priceRange: "₱₱" },
    { lat: 14.631167071388862, lng: 121.04612828013339, name: "Jollibee Kamias EDSA", priceRange: "₱₱" },
    { lat: 14.630208462344818, lng: 121.04378888198417, name: "Enjoy Your Coffee - EYC", priceRange: "₱₱" },
    { lat: 14.637260439551637, lng: 121.03647333840752, name: "Cafe Roo", priceRange: "₱₱" },
    { lat: 14.63471567795594, lng: 121.03568891082023, name: "Cafe I'm Here", priceRange: "₱₱" },
    { lat: 14.630797380925037, lng: 121.04496361082005, name: "Goca Tea and Cafe", priceRange: "₱₱" },
    { lat: 14.633672277560846, lng: 121.04024777897007, name: "Kim's Ramyun", priceRange: "₱₱" },
    { lat: 14.628359858532221, lng: 121.0415847587011, name: "RM Coffee & Tea", priceRange: "₱₱" }
  ],
  expensive: [
    { lat: 14.629643531116596, lng: 121.04094530237712, name: "Angus Tapa Centrale", priceRange: "₱₱₱" },
    { lat: 14.631285381961117, lng: 121.04125255649042, name: "Deo Gracias", priceRange: "₱₱₱" },
    { lat: 14.6306323345192, lng: 121.04117011416216, name: "Zipang", priceRange: "₱₱₱" },
    { lat: 14.632746198595271, lng: 121.04125628013328, name: "Victorino's Restaurant", priceRange: "₱₱₱" },
  ]
};

function initMap() {
  const ciitLocation = { lat: 14.629457, lng: 121.041816 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ciitLocation,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);
}

function setActiveCategory(button) {
  // Highlight selected button
  document.querySelectorAll(".category-buttons button").forEach((btn) => btn.classList.remove("active"));
  button.classList.add("active");

  // Update dropdown with selected category
  const category = button.dataset.category;
  selectCategory(category);
}

function selectCategory(category) {
  const dropdown = document.getElementById("food-stall-dropdown");
  dropdown.innerHTML = '<option value="" disabled selected>Select Your Food Option</option>';

  categorizedFoodStalls[category].forEach((stall, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = stall.name;
    dropdown.appendChild(option);
  });
}

function selectFoodStall() {
  const dropdown = document.getElementById("food-stall-dropdown");
  const category = document.querySelector(".category-buttons .active").dataset.category;
  const selectedStall = categorizedFoodStalls[category][dropdown.value];

  if (selectedStall) {
    updateMap(selectedStall.lat, selectedStall.lng, selectedStall.name);
    updateDetails(selectedStall.name, selectedStall.priceRange);
  }
}

function updateMap(lat, lng, title) {
  const ciitLocation = { lat: 14.629457, lng: 121.041816 };
  const destination = { lat, lng };

  directionsService.route(
    {
      origin: ciitLocation,
      destination: destination,
      travelMode: google.maps.TravelMode.WALKING,
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        console.error("Directions request failed: " + status);
      }
    }
  );
}

function updateDetails(name, priceRange) {
  document.querySelector(".resto ul li:nth-child(1) p").textContent = name;
  document.querySelector(".resto ul li:nth-child(2) p").textContent = priceRange;
}


/* Budget Food Stalls

Eli's Kainan Lugawan - 14.62658832747117, 121.03708157937747

A&A - 14.62947448192729, 121.04386416664083

Ava's Carenderia - 14.62975679975855, 121.04180774981167

Masaderia - 14.629552626557162, 121.0409937876642

Atty. Lugaw - 14.62904360637158, 121.03865726478979


*/


/* Affordable Food Stalls

Chowking - 14.630618, 121.045587

Mcdonald's Tomas Morato - 14.628561277368682, 121.03405615129736

Famouse BBQ & Silog Station - 14.63237515624982, 121.04150738013324

Kim's Ramyun - 14.633672277560846, 121.04024777897007

Seoulful Sweets - 14.629625404087946, 121.04207628191672

Jollibee - 14.631167071388862, 121.04612828013339

EYC - 14.630208462344818, 121.04378888198417

Cafe Roo - 14.637260439551637, 121.03647333840752

Cafe I'm Here - 14.63471567795594, 121.03568891082023

Goca Tea and Cafe - 14.630797380925037, 121.04496361082005

RM Coffee & Tea - 14.628359858532221, 121.0415847587011

*/

/* Expensive Food Stalls

Angus Tapa Centrale  - 14.629643531116596, 121.04094530237712

Deo Gracias - 14.631285381961117, 121.04125255649042

Zipang - 14.6306323345192, 121.04117011416216

Victorino's Restaurant - 14.632746198595271, 121.04125628013328

*/

 