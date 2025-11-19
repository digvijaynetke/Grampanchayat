/**
 * Script to initialize a new panchayat database
 * Usage: node scripts/initPanchayat.js <domain> <databaseName> <displayName>
 * Example: node scripts/initPanchayat.js nandgaonpanchayat.in db_nandgaon "Nandgaon Gram Panchayat"
 */

require('dotenv').config();
const { connectDB, getMasterDB, getMasterClient } = require('../config/database');
const { ObjectId } = require('mongodb');

const initPanchayat = async () => {
  try {
    const domain = process.argv[2];
    const databaseName = process.argv[3];
    const displayName = process.argv[4] || domain;
    
    if (!domain || !databaseName) {
      console.error('❌ Usage: node scripts/initPanchayat.js <domain> <databaseName> [displayName]');
      console.error('Example: node scripts/initPanchayat.js nandgaonpanchayat.in db_nandgaon "Nandgaon Gram Panchayat"');
      process.exit(1);
    }
    
    // Connect to MongoDB
    await connectDB();
    const masterDB = getMasterDB();
    const masterClient = getMasterClient();
    
    // Check if village already exists in master registry
    const villagesCollection = masterDB.collection('villages');
    const existing = await villagesCollection.findOne({ domain: domain });
    
    if (existing) {
      console.log('⚠️  Village already exists in registry:', existing);
      console.log('   Database:', existing.databaseName);
      return;
    }
    
    // Create village entry in master registry
    const village = {
      domain: domain,
      databaseName: databaseName,
      displayName: {
        en: displayName,
        mr: displayName,
        hi: displayName
      },
      createdAt: new Date(),
      isActive: true
    };
    
    const villageResult = await villagesCollection.insertOne(village);
    console.log('✅ Village registered in master database');
    console.log('   Village ID:', villageResult.insertedId);
    console.log('   Domain:', domain);
    console.log('   Database:', databaseName);
    
    // Create panchayat database
    const panchayatDB = masterClient.db(databaseName);
    
    // Create collections and indexes
    console.log('\n📦 Creating collections and indexes...');
    
    // 1. heroSection collection
    const heroSectionCollection = panchayatDB.collection('heroSection');
    await heroSectionCollection.createIndex({ createdAt: 1 });
    console.log('   ✅ heroSection collection created');
    
    // 2. aboutSection collection
    const aboutSectionCollection = panchayatDB.collection('aboutSection');
    await aboutSectionCollection.createIndex({ createdAt: 1 });
    console.log('   ✅ aboutSection collection created');
    
    // 3. officials collection
    const officialsCollection = panchayatDB.collection('officials');
    await officialsCollection.createIndex({ isSarpanch: 1, isActive: 1 });
    await officialsCollection.createIndex({ isActive: 1, order: 1 });
    await officialsCollection.createIndex({ createdAt: 1 });
    console.log('   ✅ officials collection created');
    
    // 4. complaints collection
    const complaintsCollection = panchayatDB.collection('complaints');
    await complaintsCollection.createIndex({ status: 1, createdAt: -1 });
    await complaintsCollection.createIndex({ createdAt: -1 });
    await complaintsCollection.createIndex({ email: 1 });
    console.log('   ✅ complaints collection created');
    
    // 5. images collection (metadata)
    const imagesCollection = panchayatDB.collection('images');
    await imagesCollection.createIndex({ component: 1, order: 1 });
    await imagesCollection.createIndex({ gridfsId: 1 });
    await imagesCollection.createIndex({ uploadedAt: -1 });
    console.log('   ✅ images collection created');
    
    // 6. admins collection
    const adminsCollection = panchayatDB.collection('admins');
    await adminsCollection.createIndex({ email: 1 }, { unique: true });
    await adminsCollection.createIndex({ createdAt: 1 });
    console.log('   ✅ admins collection created');
    
    // GridFS bucket will be created automatically when first image is uploaded
    
    console.log('\n✅ Panchayat database initialized successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Register an admin: POST /api/admin/auth/register');
    console.log('   Headers: X-Village-Domain: ' + domain);
    console.log('2. Start adding images and data for this panchayat');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing panchayat:', error);
    process.exit(1);
  }
};

initPanchayat();

