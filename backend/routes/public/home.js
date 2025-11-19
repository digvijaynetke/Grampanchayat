const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

/**
 * GET /api/v1/data/home
 * Returns simplified home page data: Hero, About, Leadership only
 * Note: identifyVillage middleware must be called before this route
 */
router.get('/', async (req, res) => {
  try {
    const db = req.db; // Database is already selected by identifyVillage middleware
    
    // Get hero image (get the newest one if multiple exist)
    const imagesCollection = db.collection('images');
    const heroImage = await imagesCollection.findOne(
      { component: 'home-hero' },
      { sort: { uploadedAt: -1 } } // Get newest image
    );
    
    // Get hero section data
    const heroSectionCollection = db.collection('heroSection');
    const heroSection = await heroSectionCollection.findOne({});
    
    // Get about section data
    const aboutSectionCollection = db.collection('aboutSection');
    const aboutSection = await aboutSectionCollection.findOne({});
    
    // Get Sarpanch (leadership)
    const officialsCollection = db.collection('officials');
    const sarpanch = await officialsCollection.findOne({
      isSarpanch: true,
      isActive: { $ne: false } // Allow null/undefined or true
    });
    
    // Get team members (3 members: उपसरपंच, ग्राम पंचायत अधिकारी, सदस्य)
    const teamMembers = await officialsCollection
      .find({
        isSarpanch: { $ne: true }, // Not sarpanch (false or null/undefined)
        isActive: { $ne: false } // Allow null/undefined or true
      })
      .sort({ order: 1 })
      .limit(3)
      .toArray();
    
    // Format response
    const response = {
      success: true,
      data: {
        // Hero Section
        hero: {
          image: heroImage ? `/api/images/${heroImage._id}` : null,
          villageName: heroSection?.villageName || {},
          descriptions: heroSection?.descriptions || []
        },
        
        // About Section
        about: {
          title: aboutSection?.title || {},
          description: aboutSection?.description || {},
          videoUrl: aboutSection?.videoUrl || null
        },
        
        // Leadership Section
        leadership: {
          sarpanch: sarpanch ? {
            id: sarpanch._id,
            name: sarpanch.name,
            role: sarpanch.role,
            village: sarpanch.village,
            description: sarpanch.description || {},
            image: sarpanch.imageId ? `/api/images/${sarpanch.imageId}` : null,
            contact: sarpanch.contact || null
          } : null,
          teamMembers: teamMembers.map(member => ({
            id: member._id,
            name: member.name,
            role: member.role,
            village: member.village,
            image: member.imageId ? `/api/images/${member.imageId}` : null,
            contact: member.contact || null
          }))
        }
      }
    };
    
    res.json(response);
  } catch (error) {
    console.error('Error fetching home data:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching home page data',
      error: error.message
    });
  }
});

module.exports = router;

