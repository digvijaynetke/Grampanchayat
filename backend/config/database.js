const { MongoClient, GridFSBucket } = require('mongodb');
require('dotenv').config();

// Master client connection (shared across all databases)
let masterClient = null;

// Cache for database connections per panchayat
const dbCache = new Map(); // domain -> { db, gridFSBucket }

// Master database connection (for registry)
let masterDB = null;

/**
 * Connect to MongoDB cluster (master connection)
 * This connects to the cluster, but doesn't select a specific database yet
 */
const connectDB = async () => {
  try {
    // Get connection URI (should not include database name)
    let uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
    
    // Remove trailing slash if present
    uri = uri.replace(/\/$/, '');
    
    // Connect to master database (for registry)
    masterClient = new MongoClient(uri);
    await masterClient.connect();
    
    // Connect to master/config database for village registry
    const masterDbName = process.env.MASTER_DB_NAME || 'master';
    masterDB = masterClient.db(masterDbName);
    
    console.log('✅ MongoDB cluster connected successfully');
    console.log(`✅ Master database "${masterDbName}" connected`);
    
    return { masterClient, masterDB };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

/**
 * Get master database (for village registry)
 */
const getMasterDB = () => {
  if (!masterDB) {
    throw new Error('Master database not initialized. Call connectDB() first.');
  }
  return masterDB;
};

/**
 * Get master client (for creating new database connections)
 */
const getMasterClient = () => {
  if (!masterClient) {
    throw new Error('MongoDB client not initialized. Call connectDB() first.');
  }
  return masterClient;
};

/**
 * Get database for a specific panchayat (by domain)
 * Uses caching to avoid reconnecting
 */
const getDB = async (domain) => {
  if (!domain) {
    throw new Error('Domain is required to get database');
  }
  
  // Check cache first
  if (dbCache.has(domain)) {
    return dbCache.get(domain);
  }
  
  // Get database name from master registry
  const masterDB = getMasterDB();
  const villagesCollection = masterDB.collection('villages');
  
  const village = await villagesCollection.findOne({ domain: domain });
  
  if (!village) {
    throw new Error(`Village not found for domain: ${domain}. Please register the village first.`);
  }
  
  const databaseName = village.databaseName || `db_${domain.replace(/[^a-zA-Z0-9]/g, '_')}`;
  
  // Get database from master client
  const client = getMasterClient();
  const db = client.db(databaseName);
  
  // Initialize GridFS bucket for this database
  const gridFSBucket = new GridFSBucket(db, {
    bucketName: 'images'
  });
  
  // Cache the connection
  const dbConnection = { db, gridFSBucket, databaseName };
  dbCache.set(domain, dbConnection);
  
  return dbConnection;
};

/**
 * Get GridFS bucket for a specific panchayat
 */
const getGridFS = async (domain) => {
  const connection = await getDB(domain);
  return connection.gridFSBucket;
};

/**
 * Clear cache (useful for testing or when database name changes)
 */
const clearCache = (domain) => {
  if (domain) {
    dbCache.delete(domain);
  } else {
    dbCache.clear();
  }
};

module.exports = {
  connectDB,
  getDB,
  getGridFS,
  getMasterDB,
  getMasterClient,
  clearCache
};

