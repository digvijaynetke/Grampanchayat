const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { authenticateAdmin } = require('../../middleware/auth');
const { requirePermission } = require('../../middleware/permissions');

// All routes require authentication
router.use(authenticateAdmin);

/**
 * GET /api/admin/complaints
 * Get all complaints for the village
 * Requires: view_complaints permission
 */
router.get('/', requirePermission('view_complaints'), async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const complaintsCollection = db.collection('complaints');
    
    const query = {};
    if (status) {
      query.status = status;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const complaints = await complaintsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .toArray();
    
    const total = await complaintsCollection.countDocuments(query);
    
    res.json({
      success: true,
      complaints: complaints.map(complaint => ({
        id: complaint._id,
        name: complaint.name,
        email: complaint.email,
        phone: complaint.phone,
        subject: complaint.subject,
        message: complaint.message,
        status: complaint.status || 'pending',
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaints'
    });
  }
});

/**
 * GET /api/admin/complaints/:id
 * Get single complaint by ID
 * Requires: view_complaints permission
 */
router.get('/:id', requirePermission('view_complaints'), async (req, res) => {
  try {
    const { id } = req.params;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const complaintsCollection = db.collection('complaints');
    
    const complaint = await complaintsCollection.findOne({
      _id: new ObjectId(id)
    });
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    
    res.json({
      success: true,
      complaint: {
        id: complaint._id,
        name: complaint.name,
        email: complaint.email,
        phone: complaint.phone,
        subject: complaint.subject,
        message: complaint.message,
        status: complaint.status || 'pending',
        createdAt: complaint.createdAt,
        updatedAt: complaint.updatedAt
      }
    });
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching complaint'
    });
  }
});

/**
 * PUT /api/admin/complaints/:id/status
 * Update complaint status
 * Requires: manage_complaints permission
 */
router.put('/:id/status', requirePermission('manage_complaints'), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    const complaintsCollection = db.collection('complaints');
    
    // Validate status
    const validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`
      });
    }
    
    // Verify ownership
    const complaint = await complaintsCollection.findOne({
      _id: new ObjectId(id)
    });
    
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }
    
    await complaintsCollection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status: status,
          updatedAt: new Date()
        } 
      }
    );
    
    res.json({
      success: true,
      message: 'Complaint status updated successfully'
    });
  } catch (error) {
    console.error('Error updating complaint status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating complaint status'
    });
  }
});

module.exports = router;

