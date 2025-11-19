/**
 * Script to delete and recreate admin
 * Usage: node scripts/recreateAdmin.js <domain> <email> <password>
 * Example: node scripts/recreateAdmin.js localhost admin@test.com admin123
 */

require('dotenv').config();
const { connectDB, getDB } = require('../config/database');
const bcrypt = require('bcryptjs');

const recreateAdmin = async () => {
  try {
    const domain = process.argv[2];
    const email = process.argv[3];
    const password = process.argv[4];
    
    if (!domain || !email || !password) {
      console.error('❌ Usage: node scripts/recreateAdmin.js <domain> <email> <password>');
      console.error('Example: node scripts/recreateAdmin.js localhost admin@test.com admin123');
      process.exit(1);
    }
    
    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      process.exit(1);
    }
    
    // Connect to MongoDB
    await connectDB();
    
    // Get panchayat database
    const dbConnection = await getDB(domain);
    const db = dbConnection.db;
    
    // Delete existing admin
    const adminsCollection = db.collection('admins');
    const deleteResult = await adminsCollection.deleteMany({
      email: email.toLowerCase()
    });
    
    console.log(`\n🗑️  Deleted ${deleteResult.deletedCount} existing admin(s) with email: ${email}`);
    
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
      role: 'admin',
      permissions: adminPermissions,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const result = await adminsCollection.insertOne(admin);
    
    console.log('\n✅ Admin created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Domain: ${domain}`);
    console.log(`   Password: ${password}`);
    console.log(`   Admin ID: ${result.insertedId}`);
    console.log(`   Role: admin`);
    console.log(`   Permissions: ${adminPermissions.length} permissions`);
    console.log('\n📝 You can now login with these credentials at:');
    console.log(`   http://localhost:5173/#admin-login`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error recreating admin:', error.message);
    if (error.message.includes('Village not found')) {
      console.error('\n💡 Make sure the panchayat is initialized first.');
      console.error(`   Run: node scripts/initPanchayat.js ${process.argv[2]} db_${process.argv[2]} "Panchayat Name"`);
    }
    process.exit(1);
  }
};

recreateAdmin();

