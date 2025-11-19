const express = require('express');
const router = express.Router();
const { serveImage } = require('../../controllers/imageController');

// Serve image by ID
router.get('/:imageId', serveImage);

module.exports = router;

