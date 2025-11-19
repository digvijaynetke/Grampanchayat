const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const { connectDB } = require('./config/database');
const { identifyVillage } = require('./middleware/villageIdentifier');

// Import routes
const publicImagesRoute = require('./routes/public/images');
const publicHomeRoute = require('./routes/public/home');
const adminAuthRoute = require('./routes/admin/auth');
const adminImagesRoute = require('./routes/admin/images');
const adminHeroRoute = require('./routes/admin/hero');
const adminAboutRoute = require('./routes/admin/about');
const adminOfficialsRoute = require('./routes/admin/officials');
const adminComplaintsRoute = require('./routes/admin/complaints');
const adminQRCodesRoute = require('./routes/admin/qrcodes');
const publicQRCodesRoute = require('./routes/public/qrcodes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    message: 'Welcome to Gram Panchayat API',
    timestamp: new Date().toISOString()
  });
});

// Root route - Welcome page
app.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'Server is running',
    message: 'Welcome to Gram Panchayat API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      public: {
        home: '/api/v1/data/home (requires X-Village-Domain header)',
        qrcodes: '/api/v1/data/qrcodes (requires X-Village-Domain header)',
        images: '/api/images (requires X-Village-Domain header)',
        complaints: 'POST /api/complaints (requires X-Village-Domain header)'
      },
      admin: {
        register: 'POST /api/admin/auth/register (requires X-Village-Domain header)',
        login: 'POST /api/admin/auth/login (requires X-Village-Domain header)',
        hero: '/api/admin/hero (requires authentication)',
        about: '/api/admin/about (requires authentication)',
        officials: '/api/admin/officials (requires authentication)',
        images: '/api/admin/images (requires authentication)',
        complaints: '/api/admin/complaints (requires authentication)',
        qrcodes: '/api/admin/qrcodes (requires authentication)'
      }
    },
    documentation: 'All admin routes require X-Village-Domain header and JWT authentication token'
  });
});

// Public routes (require village identification)
app.use('/api/images', identifyVillage, publicImagesRoute);

// Public data routes (require village identification)
app.use('/api/v1/data/home', identifyVillage, publicHomeRoute);
app.use('/api/v1/data/qrcodes', identifyVillage, publicQRCodesRoute);

// Admin routes (all require village identification first)
app.use('/api/admin/auth', adminAuthRoute);
app.use('/api/admin/images', identifyVillage, adminImagesRoute);
app.use('/api/admin/hero', identifyVillage, adminHeroRoute);
app.use('/api/admin/about', identifyVillage, adminAboutRoute);
app.use('/api/admin/officials', identifyVillage, adminOfficialsRoute);
app.use('/api/admin/complaints', identifyVillage, adminComplaintsRoute);
app.use('/api/admin/qrcodes', identifyVillage, adminQRCodesRoute);

// Complaint submission route (public, but needs village identification)
app.post('/api/complaints', identifyVillage, async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const db = req.db; // Database is already selected by identifyVillage middleware
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, subject, and message are required'
      });
    }
    
    const complaintsCollection = db.collection('complaints');
    
    const complaint = {
      name,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await complaintsCollection.insertOne(complaint);
    
    res.json({ 
      success: true, 
      message: 'Complaint submitted successfully. We will get back to you soon.' 
    });
  } catch (error) {
    console.error('Error submitting complaint:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting complaint'
    });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Start Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
