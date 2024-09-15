const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001; // Choose any port

app.use(bodyParser.json({ limit: '50mb' })); // Handle large payloads

// Ensure the images directory exists
const imagesDir = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Utility function to get the next available file name in the format {index}{alphabet}.jpg
const getNextFileName = (index) => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let i = 0;

    // Check for the first available filename, starting with 'a'
    while (i < alphabet.length) {
        const fileName = `${index}${alphabet[i]}.jpg`;
        const filePath = path.join(imagesDir, fileName);
        if (!fs.existsSync(filePath)) {
            return fileName; // Return the first available filename
        }
        i++;
    }

    throw new Error('Too many files for this index.'); // If all letters are exhausted
};

// POST /upload route to save the image
app.post('/upload', (req, res) => {
    const { image, locationId } = req.body;

    if (!image || !locationId) {
        return res.status(400).json({ success: false, message: 'Missing image or locationId' });
    }

    try {
        // Get the next available file name
        const fileName = getNextFileName(locationId);
        const filePath = path.join(imagesDir, fileName);

        // Remove base64 prefix from the image string
        const imageData = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(imageData, 'base64');

        // Save the image
        fs.writeFileSync(filePath, buffer);

        res.json({ success: true, message: `Image saved as ${fileName}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /images-list route to list the images
app.get('/images-list', (req, res) => {
    try {
        // Read the images directory and get the list of files
        const files = fs.readdirSync(imagesDir);

        // Create full paths for the files
        const filePaths = files.map(file => path.join('/images', file)); // Adjust the path as per your frontend serving logic

        res.json({ success: true, images: filePaths });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Serve the images statically
app.use('/images', express.static(imagesDir));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
