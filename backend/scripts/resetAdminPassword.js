/**
 * Script to reset admin password
 * Usage: node scripts/resetAdminPassword.js <domain> <email> <newPassword>
 * Example: node scripts/resetAdminPassword.js localhost admin@test.com newpassword123
 */

require('dotenv').config();
const { connectDB, getDB } = require('../config/database');
const bcrypt = require('bcryptjs');

const resetPassword = async () => {
  try {
    const domain = process.argv[2];
    const email = process.argv[3];
    const newPassword = process.argv[4];
    
    if (!domain || !email || !newPassword) {
      console.error('❌ Usage: node scripts/resetAdminPassword.js <domain> <email> <newPassword>');
      console.error('Example: node scripts/resetAdminPassword.js localhost admin@test.com newpassword123');
      process.exit(1);
    }
    
    if (newPassword.length < 6) {
      console.error('❌ Password must be at least 6 characters');
      process.exit(1);
    }
    
    // Connect to MongoDB
    await connectDB();
    
    // Get panchayat database
    const dbConnection = await getDB(domain);
    const db = dbConnection.db;
    
    // Find admin
    const adminsCollection = db.collection('admins');
    const admin = await adminsCollection.findOne({
      email: email.toLowerCase()
    });
    
    if (!admin) {
      console.error(`❌ Admin not found with email: ${email}`);
      console.error(`\n💡 Available admins for domain "${domain}":`);
      const allAdmins = await adminsCollection.find({}).toArray();
      if (allAdmins.length === 0) {
        console.error('   No admins found. Register one first.');
      } else {
        allAdmins.forEach(a => console.error(`   - ${a.email}`));
      }
      process.exit(1);
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await adminsCollection.updateOne(
      { _id: admin._id },
      { 
        $set: { 
          password: hashedPassword,
          updatedAt: new Date()
        } 
      }
    );
    
    console.log('\n✅ Password reset successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Domain: ${domain}`);
    console.log(`   New Password: ${newPassword}`);
    console.log('\n📝 You can now login with these credentials at:');
    console.log(`   http://localhost:5173/#admin-login`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error resetting password:', error.message);
    if (error.message.includes('Village not found')) {
      console.error('\n💡 Make sure the panchayat is initialized first.');
    }
    process.exit(1);
  }
};

resetPassword();

