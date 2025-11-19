const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');

// All routes require authentication
router.use(authenticateAdmin);

/**
 * GET /api/admin/about
 * Get about section data
 */
router.get('/', async (req, res) => {
  try {
    const db = req.db; // Database is already selected by identifyVillage middleware
    const aboutSectionCollection = db.collection('aboutSection');
    
    const aboutSection = await aboutSectionCollection.findOne({});
    
    res.json({
      success: true,
      about: aboutSection || {
        title: {},
        description: {},
        videoUrl: null
      }
    });
  } catch (error) {
    console.error('Error fetching about section:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching about section'
    });
  }
});

/**
 * PUT /api/admin/about
 * Update about section data
 * Requires: manage_about permission
 */
router.put('/', requirePermission('manage_about'), async (req, res) => {
  try {
    const { title, description, videoUrl } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const aboutSectionCollection = db.collection('aboutSection');
    
    // Check if about section exists
    const existing = await aboutSectionCollection.findOne({});
    
    const aboutData = {
      updatedAt: new Date()
    };
    
    if (title !== undefined) aboutData.title = title;
    if (description !== undefined) aboutData.description = description;
    if (videoUrl !== undefined) aboutData.videoUrl = videoUrl;
    
    if (existing) {
      // Update existing
      await aboutSectionCollection.updateOne(
        { _id: existing._id },
        { $set: aboutData }
      );
    } else {
      // Create new
      aboutData.createdAt = new Date();
      await aboutSectionCollection.insertOne(aboutData);
    }
    
    res.json({
      success: true,
      message: 'About section updated successfully'
    });
  } catch (error) {
    console.error('Error updating about section:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating about section'
    });
  }
});

module.exports = router;

