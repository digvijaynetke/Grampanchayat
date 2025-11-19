# ✅ Database Architecture Updated - One Database Per Panchayat

## 🎯 What Changed

**Old Architecture:** One database → All panchayats (filtered by `villageId`)  
**New Architecture:** One cluster → One database per panchayat (automatic isolation)

## 📊 Architecture Overview

```
MongoDB Cluster
├── master (database)
│   └── villages (collection) - Registry mapping domain → database name
├── db_nandgaon (database)
│   ├── heroSection
│   ├── aboutSection
│   ├── officials
│   ├── complaints
│   ├── images
│   ├── admins
│   └── images (GridFS bucket)
├── db_village2 (database)
│   └── ... (same collections)
└── ... (300 databases)
```

## 🔧 What Was Updated

### 1. Database Connection (`config/database.js`)
- ✅ Dynamic database selection based on domain
- ✅ Master database for village registry
- ✅ Connection caching per domain

### 2. Village Identifier (`middleware/villageIdentifier.js`)
- ✅ Looks up domain in master registry
- ✅ Selects correct database for panchayat
- ✅ Sets `req.db` and `req.gridFSBucket`

### 3. All Routes Updated
- ✅ Removed all `villageId` references
- ✅ Use `req.db` instead of `getDB()`
- ✅ All queries simplified (no filtering needed)

### 4. Collections Updated
- ✅ Removed `villageId` field from all collections
- ✅ Each database is already isolated

## 📝 Setup Instructions

### Step 1: MongoDB Connection

Create `.env` file in `backend/` directory:

```env
# MongoDB Connection String (without database name)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Master Database Name (for village registry)
MASTER_DB_NAME=master

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port
PORT=5000
```

### Step 2: Initialize First Panchayat

Run the initialization script:

```bash
cd backend
node scripts/initPanchayat.js nandgaonpanchayat.in db_nandgaon "Nandgaon Gram Panchayat"
```

This will:
- ✅ Add entry to master registry
- ✅ Create panchayat database
- ✅ Create all collections
- ✅ Create indexes

### Step 3: Register Admin

```bash
POST /api/admin/auth/register
Headers:
  X-Village-Domain: nandgaonpanchayat.in
Body:
{
  "email": "admin@nandgaon.in",
  "password": "password123"
}
```

### Step 4: Start Using

All API calls now require `X-Village-Domain` header:
- Frontend automatically sends this
- Backend automatically selects correct database
- No `villageId` needed anywhere!

## 🚀 Adding More Panchayats

For each new panchayat:

```bash
node scripts/initPanchayat.js <domain> <databaseName> [displayName]
```

Example:
```bash
node scripts/initPanchayat.js village2.com db_village2 "Village 2 Gram Panchayat"
```

## 📋 Master Registry Schema

**Database:** `master`  
**Collection:** `villages`

```javascript
{
  _id: ObjectId,
  domain: "nandgaonpanchayat.in", // UNIQUE
  databaseName: "db_nandgaon",
  displayName: {
    en: "Nandgaon Gram Panchayat",
    mr: "नंदगाव ग्रामपंचायत",
    hi: "नंदगाव ग्राम पंचायत"
  },
  createdAt: Date,
  isActive: true
}
```

## 🔐 Security

- ✅ Each panchayat database is isolated
- ✅ Domain-based routing prevents cross-panchayat access
- ✅ JWT tokens include domain for verification
- ✅ Admin can only access their own panchayat's database

## ✅ All Done!

The backend is now ready for:
- ✅ 300+ panchayats
- ✅ One database per panchayat
- ✅ Automatic data isolation
- ✅ Easy scaling

**Next:** Provide your MongoDB cluster connection string and we'll test it!

