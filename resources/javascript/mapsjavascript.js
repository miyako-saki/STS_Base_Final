let map;
let marker;
let directionsService;
let directionsRenderer;

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
    const foodStalls = [
        { lat: 14.630457, lng: 121.040816, name: "Food Stall 1 - Budget" },
        { lat: 14.629957, lng: 121.041316, name: "Food Stall 2 - Affordable" },
        { lat: 14.628957, lng: 121.042816, name: "Food Stall 3 - Moderate" },
        { lat: 14.631457, lng: 121.043316, name: "Food Stall 4 - Pricey" },
        { lat: 14.632457, lng: 121.044816, name: "Food Stall 5 - Premium" }
    ];

    const selectedIndex = document.getElementById("food-stall-dropdown").value - 1;
    if (selectedIndex >= 0) {
        const selectedStall = foodStalls[selectedIndex];
        updateMap(selectedStall.lat, selectedStall.lng, selectedStall.name);
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
