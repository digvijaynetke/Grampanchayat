# 🚀 Quick Setup Guide

## ✅ Step 1: Environment Variables (DONE)

Your `.env` file is already created with:
- ✅ MongoDB connection string
- ✅ Master database name
- ✅ JWT secret
- ✅ Server port

## 🔍 Step 2: Test Connection

Test if you can connect to MongoDB:

```bash
cd backend
node scripts/testConnection.js
```

Expected output:
```
✅ Connection successful!
📊 Villages registered: 0
```

If you see an error, check:
1. **MongoDB Atlas IP Whitelist**: Add `0.0.0.0/0` (all IPs) or your server IP
2. **Network Access**: Ensure network access is enabled in Atlas
3. **Credentials**: Verify username/password in connection string

## 📦 Step 3: Initialize First Panchayat

Create your first panchayat database:

```bash
node scripts/initPanchayat.js nandgaonpanchayat.in db_nandgaon "Nandgaon Gram Panchayat"
```

This will:
- ✅ Add entry to master registry
- ✅ Create `db_nandgaon` database
- ✅ Create all collections (heroSection, aboutSection, officials, complaints, images, admins)
- ✅ Create indexes for performance

## 👤 Step 4: Register First Admin

Register an admin for the panchayat:

```bash
curl -X POST http://localhost:5000/api/admin/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: nandgaonpanchayat.in" \
  -d '{
    "email": "admin@nandgaon.in",
    "password": "admin123"
  }'
```

Or use Postman/Thunder Client with:
- **URL**: `POST http://localhost:5000/api/admin/auth/register`
- **Headers**: 
  - `Content-Type: application/json`
  - `X-Village-Domain: nandgaonpanchayat.in`
- **Body**:
  ```json
  {
    "email": "admin@nandgaon.in",
    "password": "admin123"
  }
  ```

## 🚀 Step 5: Start Server

Start the backend server:

```bash
npm start
# or for development
npm run dev
```

Server will start on `http://localhost:5000`

## ✅ Step 6: Test API

Test the public API:

```bash
curl -X GET http://localhost:5000/api/v1/data/home \
  -H "X-Village-Domain: nandgaonpanchayat.in"
```

## 📝 Adding More Panchayats

For each new panchayat:

```bash
node scripts/initPanchayat.js <domain> <databaseName> [displayName]
```

Examples:
```bash
# Panchayat 1
node scripts/initPanchayat.js nandgaonpanchayat.in db_nandgaon "Nandgaon Gram Panchayat"

# Panchayat 2
node scripts/initPanchayat.js village2.com db_village2 "Village 2 Gram Panchayat"

# Panchayat 3
node scripts/initPanchayat.js village3.com db_village3 "Village 3 Gram Panchayat"
```

## 🔐 MongoDB Atlas Setup Checklist

Before running, ensure in MongoDB Atlas:

1. ✅ **Network Access**: 
   - Go to Network Access
   - Add IP `0.0.0.0/0` (all IPs) or your server IP
   - Click "Add IP Address"

2. ✅ **Database User**:
   - Go to Database Access
   - User: `grampanchayat`
   - Password: `grampanchayat`
   - Role: `Atlas admin` or `Read and write to any database`

3. ✅ **Connection String**:
   - Format: `mongodb+srv://grampanchayat:grampanchayat@grampanchayat.ntj5qa4.mongodb.net/`
   - ✅ Already set in `.env`

## 🎯 Next Steps

1. Test connection: `node scripts/testConnection.js`
2. Initialize first panchayat
3. Register admin
4. Start server
5. Test API endpoints
6. Connect frontend

## 📚 Documentation

- **Architecture**: `docs/DATABASE_ARCHITECTURE.md`
- **Database Setup**: `DATABASE_SETUP_COMPLETE.md`
- **API Endpoints**: `docs/simplified-schema.md`

