const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(bodyParser.json({ limit: '50mb' })); // Handle large payloads

// Predefined locations with latitude and longitude
const locations = [
  { id: 1, name: 'Open Farm Community', lat: 1.304896, lng: 103.812891 },
  { id: 2, name: 'Scaled by Ah Hua Kelong', lat: 1.313387, lng: 103.859730 },
  { id: 3, name: 'At Feast', lat: 1.304231, lng: 103.814708 },
  { id: 4, name: 'The Summerhouse', lat: 1.409229, lng: 103.868540 },
  { id: 5, name: 'SaladStop!', lat: 1.281551, lng: 103.850597 },
  { id: 6, name: 'Poison Ivy Bistro', lat: 1.437373, lng: 103.730705 },
  { id: 7, name: 'Artichoke', lat: 1.290920, lng: 103.841799 },
];

// Utility function to calculate the distance between two points (Haversine formula)
function getDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in kilometers
}

app.post('/upload', (req, res) => {
  const { image, latitude, longitude } = req.body;

  // Check proximity to predefined locations (within 0.5 km)
  const proximityThreshold = 0.5; // kilometers
  let closestLocation = null;

  for (const location of locations) {
    const distance = getDistance(latitude, longitude, location.lat, location.lng);
    if (distance <= proximityThreshold) {
      closestLocation = location;
      break;
    }
  }

  if (closestLocation) {
    // Save the image (append it to the location's images array)
    const imageName = `${closestLocation.id}_${Date.now()}.jpg`;
    const imagePath = path.join(__dirname, 'uploads', imageName);
    
    // Convert base64 string to binary and save the image
    const imageData = image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(imageData, 'base64');
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    fs.writeFileSync(imagePath, buffer);

    res.json({ success: true, message: 'Image uploaded and location matched', location: closestLocation });
  } else {
    res.json({ success: false, message: 'No nearby locations found' });
  }

  console.log("Hello AGHHHH");
});

const PORT = 5001; // Change the port to 5000 or any port that is free
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
