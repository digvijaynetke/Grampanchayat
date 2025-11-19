# Database Setup & Architecture Guide

## 🏗️ Architecture Overview

**Single Backend → Multiple Panchayats → Data Isolation by Domain**

```
┌─────────────────────────────────────────────────────────┐
│              Single Backend Server                       │
│  (One MongoDB Database for ALL 300 panchayats)          │
└─────────────────────────────────────────────────────────┘
                          │
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ nandgaon.in  │  │ village2.com │  │ village3.com │
│  (Domain 1)  │  │  (Domain 2)  │  │  (Domain 3)  │
└──────────────┘  └──────────────┘  └──────────────┘
        │                 │                 │
        └─────────────────┼─────────────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │   MongoDB Database    │
              │  (All panchayats)    │
              └───────────────────────┘
```

### How It Works:

1. **Frontend sends domain** → Each panchayat frontend sends its domain in `X-Village-Domain` header
2. **Backend identifies village** → Backend looks up the domain in `villages` collection
3. **Data isolation** → All queries filter by `villageId` to show only that panchayat's data
4. **Same database, different data** → All 300 panchayats share one database, but each sees only their own data

---

## 📊 Database Collections Needed

### 1. **villages** Collection
**Purpose:** Maps domain names to village IDs

```javascript
{
  _id: ObjectId("..."),           // Unique village ID
  name: "nandgaon",              // Internal name
  domain: "nandgaonpanchayat.in", // Custom domain (UNIQUE)
  displayName: {
    en: "Nandgaon Gram Panchayat",
    mr: "नंदगाव ग्रामपंचायत",
    hi: "नंदगाव ग्राम पंचायत"
  },
  createdAt: Date,
  isActive: true
}
```

**Index Required:**
- `domain` (unique index) - Fast lookup by domain

---

### 2. **heroSection** Collection
**Purpose:** Hero section data for each panchayat

```javascript
{
  _id: ObjectId("..."),
  villageId: ObjectId("..."),    // Links to villages._id
  villageName: {
    en: "Nandgaon",
    mr: "नंदगाव",
    hi: "नंदगाव"
  },
  descriptions: [
    {
      subtitle: { en: "...", mr: "...", hi: "..." },
      description: { en: "...", mr: "...", hi: "..." }
    },
    // ... 2 more description blocks
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Index Required:**
- `villageId` - Fast queries per panchayat

---

### 3. **aboutSection** Collection
**Purpose:** About section data for each panchayat

```javascript
{
  _id: ObjectId("..."),
  villageId: ObjectId("..."),    // Links to villages._id
  title: {
    en: "About Nandgaon",
    mr: "नंदगाव बद्दल",
    hi: "नंदगाव के बारे में"
  },
  description: {
    en: "...",
    mr: "...",
    hi: "..."
  },
  videoUrl: "https://...",       // Video URL/path
  createdAt: Date,
  updatedAt: Date
}
```

**Index Required:**
- `villageId` - Fast queries per panchayat

---

### 4. **officials** Collection
**Purpose:** Leadership data (Sarpanch + 3 team members)

```javascript
{
  _id: ObjectId("..."),
  villageId: ObjectId("..."),    // Links to villages._id
  imageId: ObjectId("..."),      // Links to images._id
  name: {
    en: "John Doe",
    mr: "जॉन डो",
    hi: "जॉन डो"
  },
  role: {
    en: "Sarpanch",
    mr: "सरपंच",
    hi: "सरपंच"
  },
  village: {
    en: "Nandgaon",
    mr: "नंदगाव",
    hi: "नंदगाव"
  },
  description: {                 // Mainly for Sarpanch
    en: "...",
    mr: "...",
    hi: "..."
  },
  contact: "+91 1234567890",     // Optional
  isSarpanch: true,              // true for Sarpanch, false for team
  order: 0,                      // For sorting team members
  isActive: true,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes Required:**
- `villageId` - Fast queries per panchayat
- `villageId + isSarpanch` - Fast Sarpanch lookup
- `villageId + isActive` - Fast active officials lookup

---

### 5. **complaints** Collection
**Purpose:** User complaints for each panchayat

```javascript
{
  _id: ObjectId("..."),
  villageId: ObjectId("..."),    // Links to villages._id
  name: "User Name",
  email: "user@example.com",
  phone: "+91 1234567890",       // Optional
  subject: "Water Issue",
  message: "Complaint details...",
  status: "pending",             // pending, in-progress, resolved, closed
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes Required:**
- `villageId` - Fast queries per panchayat
- `villageId + status` - Fast filtered queries
- `villageId + createdAt` - Fast sorting

---

### 6. **images** Collection (Metadata)
**Purpose:** Image metadata (actual files in GridFS)

```javascript
{
  _id: ObjectId("..."),
  gridfsId: ObjectId("..."),     // Reference to GridFS file
  villageId: ObjectId("..."),    // Links to villages._id
  component: "home-hero",        // home-hero, leadership-sarpanch, leadership-team
  category: "उपसरपंच",          // Optional (for team members)
  altText: "Hero image",
  order: 0,
  uploadedAt: Date,
  filename: "hero.jpg",
  contentType: "image/jpeg",
  size: 1024000                  // Bytes
}
```

**Indexes Required:**
- `villageId` - Fast queries per panchayat
- `villageId + component` - Fast component-specific queries
- `gridfsId` - Fast GridFS lookup

---

### 7. **admins** Collection
**Purpose:** Admin users for each panchayat

```javascript
{
  _id: ObjectId("..."),
  villageId: ObjectId("..."),    // Links to villages._id
  email: "admin@nandgaon.in",    // UNIQUE per village
  password: "hashed_password",    // bcrypt hashed
  role: "admin",                 // admin, editor, viewer
  permissions: [                 // Optional explicit permissions
    "manage_hero",
    "manage_about",
    "manage_leadership"
  ],
  createdAt: Date,
  lastLogin: Date
}
```

**Indexes Required:**
- `email` (unique) - Fast login lookup
- `villageId` - Fast queries per panchayat
- `villageId + email` - Fast village-specific admin lookup

---

### 8. **GridFS Bucket: `images`**
**Purpose:** Stores actual image files

- Files stored in GridFS bucket named `images`
- Each file has a unique `_id` (ObjectId)
- Referenced by `images.gridfsId`

---

## 🔐 Data Isolation Mechanism

### How Each Panchayat Sees Only Their Data:

1. **Request comes in** with domain: `nandgaonpanchayat.in`
2. **Middleware identifies village:**
   ```javascript
   const village = await villagesCollection.findOne({ domain: "nandgaonpanchayat.in" });
   req.villageId = village._id; // e.g., ObjectId("507f1f77bcf86cd799439011")
   ```

3. **All queries filter by villageId:**
   ```javascript
   // Hero section
   const hero = await heroSectionCollection.findOne({ 
     villageId: req.villageId 
   });
   
   // Officials
   const officials = await officialsCollection.find({ 
     villageId: req.villageId 
   });
   
   // Complaints
   const complaints = await complaintsCollection.find({ 
     villageId: req.villageId 
   });
   ```

4. **Result:** Each panchayat only sees their own data, even though all 300 panchayats share the same database.

---

## 📋 Setup Checklist

### Step 1: MongoDB Connection
- [ ] Get MongoDB Atlas cluster URL (or local MongoDB)
- [ ] Add connection string to `.env` file

### Step 2: Create Indexes
- [ ] Run index creation script (will create all indexes)

### Step 3: Initialize First Village
- [ ] Run `initVillage.js` script to create first panchayat
- [ ] Register first admin user

### Step 4: Test
- [ ] Test domain identification
- [ ] Test data isolation (create data for 2 villages, verify isolation)

---

## 🚀 Next Steps

1. **You provide:** MongoDB cluster connection string
2. **I'll create:** 
   - `.env` file template
   - Index creation script
   - Database initialization script
   - Setup instructions

---

## ❓ Questions Answered

**Q: Do we need separate databases for each panchayat?**  
A: **No!** One database for all 300 panchayats. Data isolation is done via `villageId` filtering.

**Q: How does the backend know which panchayat to show?**  
A: Frontend sends `X-Village-Domain` header (e.g., `nandgaonpanchayat.in`), backend looks it up in `villages` collection.

**Q: Can one admin access another panchayat's data?**  
A: **No!** Each admin is linked to a `villageId`, and all queries filter by that `villageId`.

**Q: What if two panchayats have the same domain?**  
A: The `domain` field has a unique index, so this is prevented at the database level.

