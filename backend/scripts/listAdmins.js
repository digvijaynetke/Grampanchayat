/**
 * Script to list all admins for a panchayat
 * Usage: node scripts/listAdmins.js <domain>
 * Example: node scripts/listAdmins.js localhost
 */

require('dotenv').config();
const { connectDB, getDB, getMasterDB } = require('../config/database');

const listAdmins = async () => {
  try {
    const domain = process.argv[2] || 'localhost';
    
    // Connect to MongoDB
    await connectDB();
    
    // Get panchayat database
    const dbConnection = await getDB(domain);
    const db = dbConnection.db;
    
    // Get admins
    const adminsCollection = db.collection('admins');
    const admins = await adminsCollection.find({}).toArray();
    
    if (admins.length === 0) {
      console.log(`\n❌ No admins found for domain: ${domain}`);
      console.log('\n📝 To register an admin, run:');
      console.log(`   curl -X POST http://localhost:5000/api/admin/auth/register \\`);
      console.log(`     -H "Content-Type: application/json" \\`);
      console.log(`     -H "X-Village-Domain: ${domain}" \\`);
      console.log(`     -d '{"email": "admin@example.com", "password": "admin123"}'`);
      process.exit(0);
    }
    
    console.log(`\n✅ Found ${admins.length} admin(s) for domain: ${domain}\n`);
    
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Email: ${admin.email}`);
      console.log(`   Role: ${admin.role || 'admin'}`);
      console.log(`   Permissions: ${admin.permissions?.length || 0} permission(s)`);
      console.log(`   Created: ${admin.createdAt || 'Unknown'}`);
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error listing admins:', error.message);
    if (error.message.includes('Village not found')) {
      console.error('\n💡 Make sure the panchayat is initialized first:');
      console.error(`   node scripts/initPanchayat.js ${process.argv[2] || 'localhost'} db_${process.argv[2]?.replace(/[^a-zA-Z0-9]/g, '_') || 'localhost'} "Display Name"`);
    }
    process.exit(1);
  }
};

listAdmins();

