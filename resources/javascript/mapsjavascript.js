let map;
let marker;
let directionsService;
let directionsRenderer;

// Define food stalls with additional details for name and priceRange
const foodStalls = [
    { lat: 14.62939143390962, lng: 121.04384270896917, name: "A&A Cafe Food & Beverage", priceRange: "09123456789" },
    { lat: 14.629957, lng: 121.041316, name: "Food Stall 2 - Affordable", priceRange: "09234567890" },
    { lat: 14.628957, lng: 121.042816, name: "Food Stall 3 - Moderate", priceRange: "09345678901" },
    { lat: 14.631457, lng: 121.043316, name: "Food Stall 4 - Pricey", priceRange: "09456789012" },
    { lat: 14.632457, lng: 121.044816, name: "Food Stall 5 - Premium", priceRange: "09567890123" }
];

function initMap() {
    const ciitLocation = { lat: 14.629457, lng: 121.041816 };

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: ciitLocation,
    });

    marker = new google.maps.Marker({
        position: ciitLocation,
        map: map,
        title: "CIIT - College of Arts and Technology",
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
}

function selectFoodStall() {
    const selectedIndex = document.getElementById("food-stall-dropdown").value - 1;
    if (selectedIndex >= 0) {
        const selectedStall = foodStalls[selectedIndex];
        updateMap(selectedStall.lat, selectedStall.lng, selectedStall.name);
        updateDetails(selectedStall.name, selectedStall.priceRange);
    }
}

function updateMap(lat, lng, title) {
    const ciitLocation = { lat: 14.629457, lng: 121.041816 };
    const destination = { lat: lat, lng: lng };

    directionsService.route(
        {
            origin: ciitLocation,
            destination: destination,
            travelMode: google.maps.TravelMode.WALKING,
        },
        (response, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response);
                directionsRenderer.setPanel(document.getElementById("directions-panel"));
            } else {
                console.error("Directions request failed due to " + status);
            }
        }
    );
}

function updateDetails(name, priceRange) {
    document.querySelector(".resto h2 + p").textContent = name;
    document.querySelector(".resto h2 + p + h2 + p").textContent = priceRange;
}

//small menu for small screens
var navLinks = document.getElementById("navLinks");

function showMenu() {
    navLinks.style.right = "0";
}

function hideMenu() {
    navLinks.style.right = "-200px";
}

/* lat and lng for food stalls

 A&A - 14.62939143390962, 121.04384270896917

 Masaderia - 14.629627824978297, 121.04096744047737

 Chowking - 14.63061868106031, 121.04558716664079

 Ava's Carenderia - 14.62975679975855, 121.04180774981167

 Famouse BBQ & Silog Station - 14.63237515624982, 121.04150738013324

 Eli's Kainan Lugawan - 14.62658832747117, 121.03708157937747


 */

 