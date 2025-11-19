const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { identifyVillage } = require('../../middleware/villageIdentifier');

/**
 * POST /api/admin/login
 * Admin login
 */
router.post('/login', identifyVillage, async (req, res) => {
  try {
    const { email, password } = req.body;
    const { villageDomain } = req;
    
    // Debug logging
    console.log('Login attempt:', {
      email: email,
      domain: villageDomain,
      xVillageDomain: req.headers['x-village-domain'],
      origin: req.headers.origin,
      referer: req.headers.referer
    });
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    const db = req.db; // Database is already selected by identifyVillage middleware
    const adminsCollection = db.collection('admins');
    
    // Find admin
    const admin = await adminsCollection.findOne({
      email: email.toLowerCase()
    });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      {
        userId: admin._id,
        domain: villageDomain, // Include domain for security check
        email: admin.email,
        role: admin.role || 'admin',
        permissions: admin.permissions || []
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      message: 'Login successful',
      token: token,
      admin: {
        id: admin._id,
        email: admin.email,
        domain: villageDomain,
        role: admin.role || 'admin',
        permissions: admin.permissions || []
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

/**
 * POST /api/admin/register
 * Register new admin (for initial setup)
 */
router.post('/register', identifyVillage, async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters'
      });
    }
    
    const db = req.db; // Database is already selected by identifyVillage middleware
    const adminsCollection = db.collection('admins');
    
    // Check if admin already exists
    const existingAdmin = await adminsCollection.findOne({
      email: email.toLowerCase()
    });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin already exists for this village'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin with full permissions
    const adminPermissions = [
      'manage_hero',
      'manage_about',
      'manage_leadership',
      'view_complaints',
      'manage_complaints',
      'upload_images',
      'manage_images'
    ];
    
    const admin = {
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'admin', // Default role, can be 'admin', 'editor', 'viewer', etc.
      permissions: adminPermissions, // Set full permissions for admin role
      createdAt: new Date()
    };
    
    const result = await adminsCollection.insertOne(admin);
    
    res.status(201).json({
      success: true,
      message: 'Admin registered successfully',
      adminId: result.insertedId
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

module.exports = router;

