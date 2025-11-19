const { getImageStream, deleteImage, getImageMetadata, uploadImage } = require('../utils/gridfs');
const { ObjectId } = require('mongodb');

/**
 * Serve image from GridFS
 * Note: Requires identifyVillage middleware to set req.db
 */
const serveImage = async (req, res) => {
  try {
    let { imageId } = req.params;
    
    // Clean imageId - remove any query parameters that might have been included
    if (imageId && imageId.includes('?')) {
      imageId = imageId.split('?')[0];
    }
    
    // Validate ObjectId format
    if (!imageId || !ObjectId.isValid(imageId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image ID format'
      });
    }
    
    // Check if database is set (should be set by identifyVillage middleware)
    if (!req.db || !req.gridFSBucket) {
      console.error('Database not set - identifyVillage middleware may not have run');
      return res.status(500).json({
        success: false,
        message: 'Database connection not available'
      });
    }
    
    const db = req.db; // Database is already selected by identifyVillage middleware
    const imagesCollection = db.collection('images');
    
    // Get image metadata
    const image = await imagesCollection.findOne({ _id: new ObjectId(imageId) });
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Get image stream from GridFS
    const downloadStream = getImageStream(image.gridfsId, req.gridFSBucket);
    
    // Set content type and cache headers
    res.set('Content-Type', image.contentType || 'image/jpeg');
    // Use shorter cache for development, longer for production
    const cacheMaxAge = process.env.NODE_ENV === 'production' ? 31536000 : 3600; // 1 year in prod, 1 hour in dev
    res.set('Cache-Control', `public, max-age=${cacheMaxAge}`);
    res.set('Accept-Ranges', 'bytes');
    
    // Pipe image to response
    downloadStream.pipe(res);
    
    downloadStream.on('error', (error) => {
      console.error('Error streaming image:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error serving image'
        });
      }
    });
  } catch (error) {
    console.error('Error in serveImage:', error);
    console.error('Request params:', req.params);
    console.error('Request query:', req.query);
    console.error('Request URL:', req.url);
    
    // If it's an ObjectId validation error, return 400
    if (error.message && error.message.includes('ObjectId')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image ID format',
        error: error.message
      });
    }
    
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: 'Error serving image',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};

/**
 * Get images by component
 * Note: Requires identifyVillage middleware to set req.db
 */
const getImagesByComponent = async (req, res) => {
  try {
    const { component } = req.params;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const imagesCollection = db.collection('images');
    
    const query = {
      component: component
    };
    
    const images = await imagesCollection
      .find(query)
      .sort({ order: 1, uploadedAt: -1 })
      .toArray();
    
    // Add image URL to each image
    const imagesWithUrl = images.map(image => ({
      id: image._id,
      component: image.component,
      category: image.category,
      altText: image.altText,
      order: image.order,
      url: `/api/images/${image._id}`,
      uploadedAt: image.uploadedAt
    }));
    
    res.json({
      success: true,
      images: imagesWithUrl
    });
  } catch (error) {
    console.error('Error getting images:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching images'
    });
  }
};

/**
 * Upload image (Admin only)
 * Note: Requires identifyVillage middleware to set req.db
 */
const uploadImageHandler = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    const { component, category, altText, order } = req.body;
    
    if (!component) {
      return res.status(400).json({
        success: false,
        message: 'Component is required'
      });
    }
    
    const metadata = {
      component: component,
      category: category || null,
      altText: altText || '',
      order: parseInt(order) || 0
    };
    
    const result = await uploadImage(req.file, metadata, req.db, req.gridFSBucket);
    
    res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      imageId: result.imageId,
      url: `/api/images/${result.imageId}`
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading image'
    });
  }
};

/**
 * Delete image (Admin only)
 * Note: Requires identifyVillage middleware to set req.db
 */
const deleteImageHandler = async (req, res) => {
  try {
    const { imageId } = req.params;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const imagesCollection = db.collection('images');
    
    // Get image to verify ownership
    const image = await imagesCollection.findOne({ 
      _id: new ObjectId(imageId)
    });
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Delete from GridFS
    await deleteImage(image.gridfsId, req.gridFSBucket);
    
    // Delete metadata
    await imagesCollection.deleteOne({ _id: new ObjectId(imageId) });
    
    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image'
    });
  }
};

/**
 * Update image metadata (Admin only)
 * Note: Requires identifyVillage middleware to set req.db
 */
const updateImageMetadata = async (req, res) => {
  try {
    const { imageId } = req.params;
    const { component, category, altText, order } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const imagesCollection = db.collection('images');
    
    // Verify ownership
    const image = await imagesCollection.findOne({ 
      _id: new ObjectId(imageId)
    });
    
    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Update metadata
    const updateData = {};
    if (component) updateData.component = component;
    if (category !== undefined) updateData.category = category;
    if (altText !== undefined) updateData.altText = altText;
    if (order !== undefined) updateData.order = parseInt(order);
    
    await imagesCollection.updateOne(
      { _id: new ObjectId(imageId) },
      { $set: updateData }
    );
    
    res.json({
      success: true,
      message: 'Image metadata updated successfully'
    });
  } catch (error) {
    console.error('Error updating image:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating image'
    });
  }
};

module.exports = {
  serveImage,
  getImagesByComponent,
  uploadImageHandler,
  deleteImageHandler,
  updateImageMetadata
};

