const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { authenticateAdmin } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');

// All routes require authentication
router.use(authenticateAdmin);

/**
 * GET /api/admin/qrcodes
 * Get all QR codes for the village
 */
router.get('/', async (req, res) => {
  try {
    const db = req.db;
    const qrCodesCollection = db.collection('qrcodes');
    
    const qrCodes = await qrCodesCollection
      .find({})
      .sort({ order: 1, createdAt: -1 })
      .toArray();
    
    res.json({
      success: true,
      qrCodes: qrCodes.map(qr => ({
        id: qr._id,
        imageId: qr.imageId,
        imageUrl: qr.imageId ? `/api/images/${qr.imageId}` : null,
        price: qr.price,
        purpose: qr.purpose || {},
        description: qr.description || {},
        isActive: qr.isActive !== false,
        order: qr.order || 0,
        createdAt: qr.createdAt,
        updatedAt: qr.updatedAt
      }))
    });
  } catch (error) {
    console.error('Error fetching QR codes:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching QR codes'
    });
  }
});

/**
 * GET /api/admin/qrcodes/:id
 * Get a single QR code
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid QR code ID'
      });
    }
    
    const db = req.db;
    const qrCodesCollection = db.collection('qrcodes');
    
    const qrCode = await qrCodesCollection.findOne({ _id: new ObjectId(id) });
    
    if (!qrCode) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found'
      });
    }
    
    res.json({
      success: true,
      qrCode: {
        id: qrCode._id,
        imageId: qrCode.imageId,
        imageUrl: qrCode.imageId ? `/api/images/${qrCode.imageId}` : null,
        price: qrCode.price,
        purpose: qrCode.purpose || {},
        description: qrCode.description || {},
        isActive: qrCode.isActive !== false,
        order: qrCode.order || 0,
        createdAt: qrCode.createdAt,
        updatedAt: qrCode.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching QR code'
    });
  }
});

/**
 * POST /api/admin/qrcodes
 * Create a new QR code
 */
router.post('/', requirePermission('upload_images'), async (req, res) => {
  try {
    const { imageId, price, purpose, description, isActive, order } = req.body;
    
    if (!imageId) {
      return res.status(400).json({
        success: false,
        message: 'Image ID is required'
      });
    }
    
    if (!ObjectId.isValid(imageId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image ID'
      });
    }
    
    const db = req.db;
    const qrCodesCollection = db.collection('qrcodes');
    
    const qrCode = {
      imageId: new ObjectId(imageId),
      price: price || null,
      purpose: purpose || { en: '', mr: '', hi: '' },
      description: description || { en: '', mr: '', hi: '' },
      isActive: isActive !== false,
      order: order || 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await qrCodesCollection.insertOne(qrCode);
    
    res.json({
      success: true,
      message: 'QR code created successfully',
      qrCode: {
        id: result.insertedId,
        ...qrCode,
        imageId: qrCode.imageId.toString()
      }
    });
  } catch (error) {
    console.error('Error creating QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating QR code'
    });
  }
});

/**
 * PUT /api/admin/qrcodes/:id
 * Update a QR code
 */
router.put('/:id', requirePermission('upload_images'), async (req, res) => {
  try {
    const { id } = req.params;
    const { imageId, price, purpose, description, isActive, order } = req.body;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid QR code ID'
      });
    }
    
    const db = req.db;
    const qrCodesCollection = db.collection('qrcodes');
    
    const updateData = {
      updatedAt: new Date()
    };
    
    if (imageId !== undefined) {
      if (!ObjectId.isValid(imageId)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid image ID'
        });
      }
      updateData.imageId = new ObjectId(imageId);
    }
    
    if (price !== undefined) updateData.price = price;
    if (purpose !== undefined) updateData.purpose = purpose;
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = order;
    
    const result = await qrCodesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found'
      });
    }
    
    res.json({
      success: true,
      message: 'QR code updated successfully'
    });
  } catch (error) {
    console.error('Error updating QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating QR code'
    });
  }
});

/**
 * DELETE /api/admin/qrcodes/:id
 * Delete a QR code
 */
router.delete('/:id', requirePermission('manage_images'), async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid QR code ID'
      });
    }
    
    const db = req.db;
    const qrCodesCollection = db.collection('qrcodes');
    
    const result = await qrCodesCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'QR code not found'
      });
    }
    
    res.json({
      success: true,
      message: 'QR code deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting QR code:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting QR code'
    });
  }
});

module.exports = router;

