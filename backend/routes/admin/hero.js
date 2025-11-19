const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { authenticateAdmin } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');

// All routes require authentication
router.use(authenticateAdmin);

/**
 * GET /api/admin/hero
 * Get hero section data
 */
router.get('/', async (req, res) => {
  try {
    const db = req.db; // Database is already selected by identifyVillage middleware
    
    // Get hero image
    const imagesCollection = db.collection('images');
    const heroImage = await imagesCollection.findOne({
      component: 'home-hero'
    });
    
    // Get hero section data
    const heroSectionCollection = db.collection('heroSection');
    const heroSection = await heroSectionCollection.findOne({});
    
    res.json({
      success: true,
      hero: {
        imageId: heroImage?._id || null,
        imageUrl: heroImage ? `/api/images/${heroImage._id}` : null,
        villageName: heroSection?.villageName || {},
        descriptions: heroSection?.descriptions || []
      }
    });
  } catch (error) {
    console.error('Error fetching hero section:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hero section'
    });
  }
});

/**
 * PUT /api/admin/hero
 * Update hero section data
 * Requires: manage_hero permission
 */
router.put('/', requirePermission('manage_hero'), async (req, res) => {
  try {
    const { imageId, villageName, descriptions } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const heroSectionCollection = db.collection('heroSection');
    
    // Check if hero section exists
    const existing = await heroSectionCollection.findOne({});
    
    const heroData = {
      updatedAt: new Date()
    };
    
    if (villageName !== undefined) heroData.villageName = villageName;
    if (descriptions !== undefined) heroData.descriptions = descriptions;
    
    if (existing) {
      // Update existing
      await heroSectionCollection.updateOne(
        { _id: existing._id },
        { $set: heroData }
      );
    } else {
      // Create new
      heroData.createdAt = new Date();
      await heroSectionCollection.insertOne(heroData);
    }
    
    // Note: Hero image should be uploaded separately via /api/admin/images/upload
    // with component='home-hero'. The imageId here is just for reference tracking.
    
    res.json({
      success: true,
      message: 'Hero section updated successfully'
    });
  } catch (error) {
    console.error('Error updating hero section:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating hero section'
    });
  }
});

module.exports = router;

