const express = require('express');
const router = express.Router();

/**
 * GET /api/v1/data/qrcodes
 * Get all active QR codes for the village (public endpoint)
 */
router.get('/', async (req, res) => {
  try {
    const db = req.db; // Database is already selected by identifyVillage middleware
    const qrCodesCollection = db.collection('qrcodes');
    
    const qrCodes = await qrCodesCollection
      .find({ isActive: { $ne: false } })
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
        order: qr.order || 0
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

module.exports = router;

