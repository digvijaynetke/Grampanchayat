const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

/**
 * Middleware to authenticate admin users
 * Note: This middleware requires identifyVillage to be called first (sets req.db)
 */
const authenticateAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Access denied.'
      });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Get admin from database (req.db is set by identifyVillage middleware)
    if (!req.db) {
      return res.status(500).json({
        success: false,
        message: 'Database not initialized. Village identification required.'
      });
    }
    
    const adminsCollection = req.db.collection('admins');
    
    // Convert userId to ObjectId (it might be string or ObjectId)
    let userId;
    try {
      userId = decoded.userId instanceof ObjectId ? decoded.userId : new ObjectId(decoded.userId);
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Invalid user ID format.'
      });
    }
    
    const admin = await adminsCollection.findOne({ 
      _id: userId
    });
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Admin not found.'
      });
    }
    
    // Verify domain matches (security check)
    if (decoded.domain && req.villageDomain && decoded.domain !== req.villageDomain) {
      return res.status(403).json({
        success: false,
        message: 'Token domain mismatch. Access denied.'
      });
    }
    
    // Attach admin info to request (include role and permissions from token)
    req.admin = {
      ...admin,
      role: decoded.role || admin.role || 'admin',
      permissions: decoded.permissions || admin.permissions || []
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
    
    console.error('Auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Authentication error'
    });
  }
};

module.exports = {
  authenticateAdmin
};

