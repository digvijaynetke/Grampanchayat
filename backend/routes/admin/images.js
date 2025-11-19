const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticateAdmin } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');
const {
  getImagesByComponent,
  uploadImageHandler,
  deleteImageHandler,
  updateImageMetadata
} = require('../../controllers/imageController');

// Configure multer for memory storage (for GridFS)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only images
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// All routes require authentication
router.use(authenticateAdmin);

// Get images by component (no permission check - viewing is allowed for authenticated admins)
router.get('/component/:component', getImagesByComponent);

// Upload image
// Requires: upload_images permission
router.post('/upload', requirePermission('upload_images'), upload.single('image'), uploadImageHandler);

// Update image metadata
// Requires: manage_images permission
router.put('/:imageId', requirePermission('manage_images'), updateImageMetadata);

// Delete image
// Requires: manage_images permission
router.delete('/:imageId', requirePermission('manage_images'), deleteImageHandler);

module.exports = router;

