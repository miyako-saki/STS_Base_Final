let map;
let directionsService;
let directionsRenderer;

// Categorized food stalls
const foodStalls = [
  { lat: 14.626566521839791, lng: 121.03703181082001, name: "Eli's Kainan Lugaw", priceRange: "<50", category: "Carinderia", menu: "Lugaw, Tokwa't Baboy, Tapsilog" },
  { lat: 14.629055631527793, lng: 121.03914525244323, name: "Atty. Lugaw", priceRange: "<50", category: "Carinderia" },
  { lat: 14.629939581645063, lng: 121.04207928536823, name: "Ava's Carenderia", priceRange: "50-100", category: "Carinderia" },
  { lat: 14.62966369592363, lng: 121.04109563743617, name: "Masaderia", priceRange: "50-100", category: "Cafe" },
  { lat: 14.629443353068165, lng: 121.04412702769142, name: "A&A Cafe Food & Beverage", priceRange: "50-100", category: "Carinderia, Cafe" },
  { lat: 14.629672119435103, lng: 121.0422264859392, name: "Seoulful Sweets", priceRange: "50-100", category: "Cafe" },
  { lat: 14.628582053598462, lng: 121.03456577557405, name: "McDonald's Tomas Morato", priceRange: "150-200", category: "Fast Food" },
  { lat: 14.63244551489845, lng: 121.04155220909627, name: "Famous BBQ & Silog Station", priceRange: "150-200", category: "Restaurant" },
  { lat: 14.631208609189754, lng: 121.0461229202884, name: "Jollibee Kamias EDSA", priceRange: "150-200", category: "Fast Food" },
  { lat: 14.630229238403446, lng: 121.0445238118579, name: "Enjoy Your Coffee - EYC", priceRange: "150-200", category: "Cafe" },
  { lat: 14.637443292760793, lng: 121.03673338922412, name: "Cafe Roo", priceRange: "150-200", category: "Cafe" },
  { lat: 14.634779020113863, lng: 121.03607933055585, name: "Cafe I'm Here", priceRange: "150-200", category: "Cafe" },
  { lat: 14.630688863759561, lng: 121.04496832519625, name: "Goca Tea and Cafe", priceRange: "150-200", category: "Cafe" },
  { lat: 14.633797289785624, lng: 121.0406776498325, name: "Kim's Ramyun", priceRange: "150-200", category: "Fast Food" },
  { lat: 14.628413552796145, lng: 121.0424267041553, name: "RM Coffee & Tea", priceRange: "150-200", category: "Cafe" },
  { lat: 14.629711009912588, lng: 121.04096713564286, name: "Angus Tapa Centrale", priceRange: ">200", category: "Restaurant" },
  { lat: 14.631368432795641, lng: 121.04206258483504, name: "Deo Gracias", priceRange: ">200", category: "Restaurant" },
  { lat: 14.630658290417632, lng: 121.04126131048235, name: "Zipang", priceRange: ">200", category: "Restaurant" },
  { lat: 14.632746212727087, lng: 121.04208776949496, name: "Victorino's Restaurant", priceRange: ">200", category: "Restaurant" }
];


function initMap() {
  const ciitLocation = { lat: 14.629457, lng: 121.041816 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: ciitLocation,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  populateDropdown(foodStalls);
}

function populateDropdown(stalls) {
  const dropdown = document.getElementById("food-stall-dropdown");
  dropdown.innerHTML = '<option value="" disabled selected>Select Your Food Option</option>';

  stalls.forEach((stall, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = stall.name;
    dropdown.appendChild(option);
  });
}

function applyFilters() {
  const selectedPriceFilters = Array.from(document.querySelectorAll(".price-filter:checked")).map(el => el.value);
  const selectedCategoryFilters = Array.from(document.querySelectorAll(".category-filter:checked")).map(el => el.value);

  const filteredStalls = foodStalls.filter(stall => {
    const matchesPrice = !selectedPriceFilters.length || selectedPriceFilters.includes(stall.priceRange);
    const matchesCategory = !selectedCategoryFilters.length || selectedCategoryFilters.some(filter => stall.category.includes(filter));
    return matchesPrice && matchesCategory;
  });

  populateDropdown(filteredStalls);
}

function selectFoodStall() {
  const dropdown = document.getElementById("food-stall-dropdown");
  const selectedIndex = dropdown.value;
  const restaurantNameElement = document.getElementById("selected-restaurant-name");
  const restaurantMenuElement = document.getElementById("sample-menu");

  if (selectedIndex !== "") {
    const selectedStall = foodStalls[selectedIndex];
    updateMap(selectedStall.lat, selectedStall.lng, selectedStall.name, selectedStall.menu);
    restaurantNameElement.textContent = `${selectedStall.name}`;
    restaurantMenuElement.textContent = `${selectedStall.menu}`;
  } else {
    restaurantNameElement.textContent = "No restaurant selected";
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


/* lat and lng for food stalls

 A&A - 14.62939143390962, 121.04384270896917

 Masaderia - 14.629627824978297, 121.04096744047737

 Chowking - 14.630618, 121.045587

 Ava's Carenderia - 14.62975679975855, 121.04180774981167

 Famouse BBQ & Silog Station - 14.63237515624982, 121.04150738013324

 Eli's Kainan Lugawan - 14.62658832747117, 121.03708157937747


 */

//wag mong alisin kasi pang responsive toh

//small menu for small screens
var navLinks = document.getElementById("navLinks");

function  showMenu(){
  navLinks.style.right = "0";
}

function  hideMenu(){
  navLinks.style.right = "-200px";
}

 