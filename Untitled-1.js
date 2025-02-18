// server.js (using Express.js)
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000; // Choose your port

// Set up storage for uploaded files (using disk storage for this example)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Create an 'uploads' folder in your project
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Rename files to avoid conflicts
    }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.array('files'), (req, res) => {  // 'files' must match formData.append('files', ...)
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' }); // Handle no files
    }

    try {
        // Process the uploaded files (req.files is an array of file objects)
        const fileNames = req.files.map(file => file.filename); // Get the file names

        console.log('Files uploaded:', fileNames); // Log the file names

        // You would typically save file information to a database or perform other actions here.
        // For this example, we'll just send a success message.
        res.json({ message: 'Files uploaded successfully!' });

    } catch (error) {
        console.error('Error processing files:', error);
        res.status(500).json({ message: 'Error uploading files' }); // Send error response
    }

});


app.use(express.static('.')); // Serve static files from the current directory

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});