# 🚀 Backend Activation Guide for Jainagar Gram Panchayat

This guide will help you activate the backend for **Jainagar Gram Panchayat** after deploying the frontend and backend.

## 📋 Prerequisites

- ✅ Backend deployed on Render (or your hosting platform)
- ✅ Frontend deployed for Jainagar (e.g., `jainagar.grampanchayat.in` or your domain)
- ✅ MongoDB Atlas cluster set up
- ✅ Environment variables configured on Render

---

## 🔧 Step 1: Configure Environment Variables on Render

Go to your Render dashboard → Your Backend Service → Environment → Add these variables:

```env
# MongoDB Connection (without database name)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Master Database Name (for village registry)
MASTER_DB_NAME=master

# JWT Secret (use a strong random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Port (Render sets this automatically, but you can override)
PORT=5000

# Frontend URL (for CORS)
FRONTEND_URL=https://jainagar.grampanchayat.in
```

**Important:** 
- Remove any database name from `MONGODB_URI` (it should end with `?retryWrites=true&w=majority`)
- Use a strong, unique `JWT_SECRET`

---

## 🗄️ Step 2: Initialize Jainagar Panchayat Database

You need to run the initialization script. You have two options:

### Option A: Run Locally (Recommended for First Time)

1. **Clone/Download the backend code locally**
2. **Set up `.env` file** with the same variables as Render
3. **Run the initialization script:**

```bash
cd backend
node scripts/initPanchayat.js jainagar.grampanchayat.in db_jainagar "Jainagar Gram Panchayat"
```

**Replace `jainagar.grampanchayat.in` with your actual domain**

This will:
- ✅ Register Jainagar in the master `villages` collection
- ✅ Create `db_jainagar` database
- ✅ Create all required collections (heroSection, aboutSection, officials, complaints, images, admins)
- ✅ Create indexes for performance

### Option B: Run via Render Shell/SSH

If Render provides shell access:

```bash
# SSH into your Render service
# Navigate to backend directory
cd backend
node scripts/initPanchayat.js jainagar.grampanchayat.in db_jainagar "Jainagar Gram Panchayat"
```

---

## 👤 Step 3: Register Admin Account

After initializing the database, create an admin account for Jainagar.

### Method 1: Using cURL (from your local machine or Render shell)

```bash
curl -X POST https://your-backend-url.onrender.com/api/admin/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: jainagar.grampanchayat.in" \
  -d '{
    "email": "admin@jainagar.in",
    "password": "YourSecurePassword123"
  }'
```

**Replace:**
- `your-backend-url.onrender.com` → Your actual Render backend URL
- `jainagar.grampanchayat.in` → Your actual Jainagar domain
- `admin@jainagar.in` → Your admin email
- `YourSecurePassword123` → Strong password

### Method 2: Using Postman/Thunder Client

**Request:**
- **Method:** POST
- **URL:** `https://your-backend-url.onrender.com/api/admin/auth/register`
- **Headers:**
  ```
  Content-Type: application/json
  X-Village-Domain: jainagar.grampanchayat.in
  ```
- **Body (JSON):**
  ```json
  {
    "email": "admin@jainagar.in",
    "password": "YourSecurePassword123"
  }
  ```

### Method 3: Using Frontend Admin Registration (if available)

If your frontend has an admin registration page, use that with the domain set correctly.

---

## 🔍 Step 4: Verify Setup

### 4.1 Check if Village is Registered

```bash
# Connect to MongoDB Atlas
# Go to Collections → master database → villages collection
# Look for document with domain: "jainagar.grampanchayat.in"
```

Or use MongoDB Compass/Shell:

```javascript
use master
db.villages.findOne({ domain: "jainagar.grampanchayat.in" })
```

### 4.2 Check if Admin is Created

```bash
# From backend directory
node scripts/listAdmins.js jainagar.grampanchayat.in
```

Or via MongoDB:

```javascript
use db_jainagar
db.admins.find({})
```

### 4.3 Test API Endpoints

**Test Health Check:**
```bash
curl https://your-backend-url.onrender.com/api/health
```

**Test Home Data (should return empty initially):**
```bash
curl -H "X-Village-Domain: jainagar.grampanchayat.in" \
     https://your-backend-url.onrender.com/api/v1/data/home
```

**Test Admin Login:**
```bash
curl -X POST https://your-backend-url.onrender.com/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: jainagar.grampanchayat.in" \
  -d '{
    "email": "admin@jainagar.in",
    "password": "YourSecurePassword123"
  }'
```

---

## 🌐 Step 5: Configure Frontend to Connect to Backend

In your frontend deployment, set the API base URL:

**For Vite/React (`.env` or environment variables):**

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

**Important:** Make sure your frontend sends the `X-Village-Domain` header in API requests.

Check `src/config/api.js` or similar file:

```javascript
// Should automatically send X-Village-Domain header
// Based on window.location.hostname or configured domain
```

---

## ✅ Step 6: Test Complete Flow

1. **Frontend loads** → Should fetch data from backend
2. **Admin login** → Should work with registered credentials
3. **Upload images** → Should save to `db_jainagar` database
4. **Add hero content** → Should save to `heroSection` collection
5. **Add officials** → Should save to `officials` collection
6. **View complaints** → Should show complaints from `complaints` collection

---

## 🔐 Step 7: Security Checklist

- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB connection string doesn't include database name
- [ ] CORS is configured correctly (FRONTEND_URL)
- [ ] Admin password is strong
- [ ] Environment variables are set in Render (not in code)
- [ ] MongoDB Atlas IP whitelist includes Render IPs (or 0.0.0.0/0 for testing)

---

## 📝 Step 8: Domain Configuration

### If using custom domain (jainagar.grampanchayat.in):

1. **DNS Configuration:**
   - Point `jainagar.grampanchayat.in` to your frontend hosting
   - Backend identifies village from `Origin` header automatically

2. **Backend Configuration:**
   - The `identifyVillage` middleware extracts domain from:
     - `X-Village-Domain` header (preferred)
     - `Origin` header (fallback)
     - `Referer` header (fallback)

3. **Frontend Configuration:**
   - Make sure frontend sends `X-Village-Domain: jainagar.grampanchayat.in` in API requests
   - Or backend will auto-detect from `Origin` header

---

## 🐛 Troubleshooting

### Issue: "Village not found"
**Solution:** Run `initPanchayat.js` script with correct domain

### Issue: "Database connection failed"
**Solution:** 
- Check MongoDB URI in environment variables
- Ensure MongoDB Atlas allows connections from Render IPs
- Verify connection string doesn't include database name

### Issue: "Admin login fails"
**Solution:**
- Verify admin was registered with correct domain
- Check email/password are correct
- Ensure `X-Village-Domain` header is sent

### Issue: "CORS error"
**Solution:**
- Set `FRONTEND_URL` environment variable correctly
- Or set to `*` for development (not recommended for production)

### Issue: "Images not uploading"
**Solution:**
- Check GridFS bucket is created (happens automatically on first upload)
- Verify database has write permissions
- Check file size limits

---

## 📊 Database Structure After Setup

```
MongoDB Cluster
├── master (database)
│   └── villages (collection)
│       └── { domain: "jainagar.grampanchayat.in", databaseName: "db_jainagar", ... }
│
└── db_jainagar (database)
    ├── heroSection (collection)
    ├── aboutSection (collection)
    ├── officials (collection)
    ├── complaints (collection)
    ├── images (collection - metadata)
    ├── admins (collection)
    └── images (GridFS bucket - actual image files)
```

---

## 🎯 Quick Reference Commands

```bash
# Initialize panchayat
node scripts/initPanchayat.js <domain> <dbName> "<Display Name>"

# List admins
node scripts/listAdmins.js <domain>

# Register admin (via API)
curl -X POST https://backend-url/api/admin/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: <domain>" \
  -d '{"email": "admin@example.com", "password": "password123"}'

# Test login
curl -X POST https://backend-url/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: <domain>" \
  -d '{"email": "admin@example.com", "password": "password123"}'
```

---

## ✅ Success Indicators

You'll know everything is working when:

1. ✅ Health check returns success
2. ✅ Admin can login via frontend
3. ✅ Admin can upload images
4. ✅ Admin can edit hero section
5. ✅ Admin can add officials
6. ✅ Frontend displays data from backend
7. ✅ Complaints can be submitted and viewed

---

## 📞 Next Steps

After activation:
1. Login to admin dashboard
2. Upload hero image
3. Add hero section content
4. Add officials (sarpanch, team members)
5. Upload gallery images
6. Configure about section
7. Test complaint submission

---

**Need Help?** Check the main `README.md` or `SETUP_GUIDE.md` for more details.

