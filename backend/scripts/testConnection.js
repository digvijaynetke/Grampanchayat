/**
 * Test MongoDB connection
 * Usage: node scripts/testConnection.js
 */

require('dotenv').config();
const { connectDB, getMasterDB } = require('../config/database');

const testConnection = async () => {
  try {
    console.log('🔌 Testing MongoDB connection...');
    console.log('URI:', process.env.MONGODB_URI ? 'Set ✓' : 'Not set ✗');
    console.log('Master DB:', process.env.MASTER_DB_NAME || 'master');
    console.log('');
    
    // Connect to MongoDB
    await connectDB();
    const masterDB = getMasterDB();
    
    // Test master database
    const villagesCollection = masterDB.collection('villages');
    const count = await villagesCollection.countDocuments();
    
    console.log('✅ Connection successful!');
    console.log(`📊 Villages registered: ${count}`);
    
    if (count === 0) {
      console.log('\n💡 No villages registered yet.');
      console.log('   Run: node scripts/initPanchayat.js <domain> <databaseName> [displayName]');
      console.log('   Example: node scripts/initPanchayat.js nandgaonpanchayat.in db_nandgaon "Nandgaon Gram Panchayat"');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check your MongoDB Atlas IP whitelist');
    console.error('2. Verify username and password in connection string');
    console.error('3. Ensure network access is enabled in Atlas');
    process.exit(1);
  }
};

testConnection();

