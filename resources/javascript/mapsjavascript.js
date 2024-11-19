let map;
let directionsService;
let directionsRenderer;

// Categorized food stalls
const categorizedFoodStalls = {
  budget: [
    { lat: 14.629391, lng: 121.043842, name: "A&A Cafe Food & Beverage", priceRange: "₱" },
    { lat: 14.629756, lng: 121.041807, name: "Ava's Carenderia", priceRange: "₱" }
  ],
  affordable: [
    { lat: 14.628957, lng: 121.042816, name: "Food Stall 3", priceRange: "₱₱" },
    { lat: 14.631457, lng: 121.043316, name: "Food Stall 4", priceRange: "₱₱" }
  ],
  expensive: [
    { lat: 14.632457, lng: 121.044816, name: "Food Stall 5", priceRange: "₱₱₱" }
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


/* lat and lng for food stalls

 A&A - 14.62939143390962, 121.04384270896917

 Masaderia - 14.629627824978297, 121.04096744047737

 Chowking - 14.630618, 121.045587

 Ava's Carenderia - 14.62975679975855, 121.04180774981167

 Famouse BBQ & Silog Station - 14.63237515624982, 121.04150738013324

 Eli's Kainan Lugawan - 14.62658832747117, 121.03708157937747


 */

 