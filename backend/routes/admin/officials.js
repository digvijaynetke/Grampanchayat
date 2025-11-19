const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { authenticateAdmin } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');

// All routes require authentication
router.use(authenticateAdmin);

/**
 * GET /api/admin/officials
 * Get all officials for the village
 */
router.get('/', async (req, res) => {
  try {
    const db = req.db; // Database is already selected by identifyVillage middleware
    const officialsCollection = db.collection('officials');
    
    const officials = await officialsCollection
      .find({})
      .sort({ isSarpanch: -1, order: 1 })
      .toArray();
    
    res.json({
      success: true,
      officials: officials.map(official => ({
        id: official._id,
        imageId: official.imageId,
        imageUrl: official.imageId ? `/api/images/${official.imageId}` : null,
        name: official.name,
        role: official.role,
        village: official.village,
        description: official.description || {},
        contact: official.contact || null,
        isSarpanch: official.isSarpanch,
        order: official.order,
        isActive: official.isActive,
        createdAt: official.createdAt,
        updatedAt: official.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching officials:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching officials'
    });
  }
});

/**
 * GET /api/admin/officials/:id
 * Get single official by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const officialsCollection = db.collection('officials');
    
    const official = await officialsCollection.findOne({
      _id: new ObjectId(id)
    });
    
    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found'
      });
    }
    
    res.json({
      success: true,
      official: {
        id: official._id,
        imageId: official.imageId,
        imageUrl: official.imageId ? `/api/images/${official.imageId}` : null,
        name: official.name,
        role: official.role,
        village: official.village,
        description: official.description || {},
        contact: official.contact || null,
        isSarpanch: official.isSarpanch,
        order: official.order,
        isActive: official.isActive,
        createdAt: official.createdAt,
        updatedAt: official.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching official:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching official'
    });
  }
});

/**
 * POST /api/admin/officials
 * Create new official
 * Requires: manage_leadership permission
 */
router.post('/', requirePermission('manage_leadership'), async (req, res) => {
  try {
    const { imageId, name, role, village, description, contact, isSarpanch, order, isActive } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const officialsCollection = db.collection('officials');
    
    // Validation
    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name and role are required'
      });
    }
    
    // If creating Sarpanch, check if one already exists
    if (isSarpanch) {
      const existingSarpanch = await officialsCollection.findOne({
        isSarpanch: true,
        isActive: true
      });
      
      if (existingSarpanch) {
        return res.status(400).json({
          success: false,
          message: 'A Sarpanch already exists for this village. Please update the existing one or deactivate it first.'
        });
      }
    }
    
    const official = {
      imageId: imageId ? new ObjectId(imageId) : null,
      name: name,
      role: role,
      village: village || {},
      description: description || {},
      contact: contact || null,
      isSarpanch: isSarpanch || false,
      order: order || 0,
      isActive: isActive !== undefined ? isActive : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await officialsCollection.insertOne(official);
    
    res.status(201).json({
      success: true,
      message: 'Official created successfully',
      officialId: result.insertedId
    });
  } catch (error) {
    console.error('Error creating official:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating official'
    });
  }
});

/**
 * PUT /api/admin/officials/:id
 * Update official
 * Requires: manage_leadership permission
 */
router.put('/:id', requirePermission('manage_leadership'), async (req, res) => {
  try {
    const { id } = req.params;
    const { imageId, name, role, village, description, contact, isSarpanch, order, isActive } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const officialsCollection = db.collection('officials');
    
    // Verify ownership
    const existingOfficial = await officialsCollection.findOne({
      _id: new ObjectId(id)
    });
    
    if (!existingOfficial) {
      return res.status(404).json({
        success: false,
        message: 'Official not found'
      });
    }
    
    // If updating to Sarpanch, check if another Sarpanch exists
    if (isSarpanch && !existingOfficial.isSarpanch) {
      const otherSarpanch = await officialsCollection.findOne({
        isSarpanch: true,
        isActive: true,
        _id: { $ne: new ObjectId(id) }
      });
      
      if (otherSarpanch) {
        return res.status(400).json({
          success: false,
          message: 'Another Sarpanch already exists. Please deactivate it first.'
        });
      }
    }
    
    // Build update object
    const updateData = {
      updatedAt: new Date()
    };
    
    if (imageId !== undefined) updateData.imageId = imageId ? new ObjectId(imageId) : null;
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (village !== undefined) updateData.village = village;
    if (description !== undefined) updateData.description = description;
    if (contact !== undefined) updateData.contact = contact;
    if (isSarpanch !== undefined) updateData.isSarpanch = isSarpanch;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    await officialsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    res.json({
      success: true,
      message: 'Official updated successfully'
    });
  } catch (error) {
    console.error('Error updating official:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating official'
    });
  }
});

/**
 * DELETE /api/admin/officials/:id
 * Delete official
 * Requires: manage_leadership permission
 */
router.delete('/:id', requirePermission('manage_leadership'), async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const officialsCollection = db.collection('officials');
    
    // Verify ownership
    const official = await officialsCollection.findOne({
      _id: new ObjectId(id)
    });
    
    if (!official) {
      return res.status(404).json({
        success: false,
        message: 'Official not found'
      });
    }
    
    await officialsCollection.deleteOne({ _id: new ObjectId(id) });
    
    res.json({
      success: true,
      message: 'Official deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting official:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting official'
    });
  }
});

module.exports = router;

