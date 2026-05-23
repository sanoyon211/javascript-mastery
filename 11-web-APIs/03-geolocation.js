// ============================================================
// 📘 03 - Geolocation API
// ============================================================
// Browser থেকে user এর location পাওয়া
// ⚠️ User permission লাগে! HTTPS দরকার (production এ)

// ============================================================
// 📌 getCurrentPosition
// ============================================================
function getLocation() {
  if (!navigator.geolocation) {
    console.log("Geolocation supported নয়");
    return;
  }

  const options = {
    enableHighAccuracy: true,  // GPS use করবে (battery বেশি)
    timeout: 10000,            // 10 seconds অপেক্ষা
    maximumAge: 60000          // 1 min পুরনো data OK
  };

  navigator.geolocation.getCurrentPosition(
    // Success:
    (position) => {
      const { latitude, longitude, accuracy, altitude, speed } = position.coords;
      console.log(`📍 Latitude: ${latitude}`);
      console.log(`📍 Longitude: ${longitude}`);
      console.log(`📍 Accuracy: ${accuracy} meters`);

      // Google Maps link:
      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      console.log("Maps:", mapsLink);
    },
    // Error:
    (error) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("Location access denied!");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location unavailable!");
          break;
        case error.TIMEOUT:
          console.log("Location request timed out!");
          break;
      }
    },
    options
  );
}

// Promise wrapper:
function getLocationAsync() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function showLocation() {
  try {
    const pos = await getLocationAsync();
    const { latitude, longitude } = pos.coords;
    console.log(`Location: ${latitude}, ${longitude}`);

    // Nearby restaurants API:
    // const restaurants = await fetchNearby(latitude, longitude, "restaurant");
  } catch (error) {
    console.log("Error:", error.message);
  }
}

// ============================================================
// 📌 watchPosition — Real-time tracking
// ============================================================
let watchId;

function startTracking() {
  watchId = navigator.geolocation.watchPosition(
    (position) => {
      console.log("New position:", position.coords.latitude, position.coords.longitude);
      // Delivery tracking, navigation app এ ব্যবহার হয়
    },
    (error) => console.error(error)
  );
}

function stopTracking() {
  navigator.geolocation.clearWatch(watchId);
}

// ============================================================
// 📌 Distance Calculation (Haversine Formula)
// ============================================================
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Dhaka to Chittagong:
const distance = calculateDistance(23.8103, 90.4125, 22.3569, 91.7832);
console.log(`Dhaka → Chittagong: ${distance.toFixed(1)} km`); // ~252 km

// ============================================================
// 🏋️ PRACTICE
// ============================================================
// 1. User location দেখাও (latitude, longitude)
// 2. Distance calculator: দুটো city এর মধ্যে distance
// 3. "আমার কাছে" feature: stores array থেকে nearest খুঁজো
