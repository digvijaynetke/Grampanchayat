const { getDB, getMasterDB } = require('../config/database');

/**
 * Middleware to identify village from request and select the correct database
 * Checks X-Village-Domain header or Origin header
 * Sets req.db and req.gridFSBucket for the specific panchayat database
 */
const identifyVillage = async (req, res, next) => {
  try {
    // Get village domain from header, origin, or query parameter
    let villageDomain = req.headers['x-village-domain'] || 
                        req.query.domain;
    
    // If not in header/query, try to extract from Origin or Referer header
    if (!villageDomain) {
      const originHeader = req.headers.origin || req.headers.referer;
      
      if (originHeader) {
        const originHost = originHeader.replace(/https?:\/\//, '').split('/')[0];
        
        // Normalize localhost: normalize localhost:PORT or 127.0.0.1:PORT to just "localhost"
        if (originHost && (originHost.includes('localhost') || originHost.includes('127.0.0.1'))) {
          villageDomain = 'localhost';
        } else if (originHost) {
          // For other origins, use the hostname (without port)
          villageDomain = originHost.split(':')[0];
        }
      }
    }
    
    if (!villageDomain) {
      return res.status(400).json({
        success: false,
        message: 'Village domain not provided. Please send X-Village-Domain header or ensure Origin header is set.'
      });
    }
    
    // Get village info from master registry
    const masterDB = getMasterDB();
    const villagesCollection = masterDB.collection('villages');
    
    const village = await villagesCollection.findOne({ 
      domain: villageDomain,
      isActive: true
    });
    
    if (!village) {
      return res.status(404).json({
        success: false,
        message: 'Village not found. Please register the village first.'
      });
    }
    
    // Get database connection for this panchayat
    const dbConnection = await getDB(villageDomain);
    
    // Attach database and village info to request
    req.db = dbConnection.db;
    req.gridFSBucket = dbConnection.gridFSBucket;
    req.village = village;
    req.villageDomain = villageDomain;
    req.databaseName = dbConnection.databaseName;
    
    next();
  } catch (error) {
    console.error('Error identifying village:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error identifying village'
    });
  }
};

module.exports = {
  identifyVillage
};

