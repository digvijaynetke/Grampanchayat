# Database Architecture - One Database Per Panchayat

## 🏗️ Architecture Overview

**One MongoDB Cluster → Multiple Databases (One Per Panchayat)**

```
┌─────────────────────────────────────────────────────────┐
│              Single Backend Server                       │
│  (One MongoDB Cluster for ALL 300 panchayats)           │
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
              │   MongoDB Cluster      │
              │                        │
              │  ┌─────────────────┐  │
              │  │ db_nandgaon     │  │ ← Database 1
              │  └─────────────────┘  │
              │  ┌─────────────────┐  │
              │  │ db_village2     │  │ ← Database 2
              │  └─────────────────┘  │
              │  ┌─────────────────┐  │
              │  │ db_village3     │  │ ← Database 3
              │  └─────────────────┘  │
              │         ...            │
              │  ┌─────────────────┐  │
              │  │ db_village300   │  │ ← Database 300
              │  └─────────────────┘  │
              └───────────────────────┘
```

### How It Works:

1. **Frontend sends domain** → `nandgaonpanchayat.in`
2. **Backend maps domain to database name** → `db_nandgaon` (or similar naming)
3. **Backend connects to that specific database** → All queries go to that database
4. **No villageId needed** → Each database is already isolated

---

## 📊 Database Naming Convention

**Option 1: Domain-based (sanitized)**
- `nandgaonpanchayat.in` → `db_nandgaonpanchayat`
- `village2.com` → `db_village2`

**Option 2: Sequential**
- `nandgaonpanchayat.in` → `db_001`
- `village2.com` → `db_002`

**Option 3: Custom mapping (recommended)**
- Use a master registry to map domain → database name
- More flexible, can change database names later

---

## 📋 Collections Per Database

Each panchayat database contains these collections:

### 1. **heroSection** Collection
```javascript
{
  _id: ObjectId("..."),
  // NO villageId needed - database is already isolated
  villageName: {
    en: "Nandgaon",
    mr: "नंदगाव",
    hi: "नंदगाव"
  },
  descriptions: [
    {
      subtitle: { en: "...", mr: "...", hi: "..." },
      description: { en: "...", mr: "...", hi: "..." }
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

### 2. **aboutSection** Collection
```javascript
{
  _id: ObjectId("..."),
  title: { en: "...", mr: "...", hi: "..." },
  description: { en: "...", mr: "...", hi: "..." },
  videoUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### 3. **officials** Collection
```javascript
{
  _id: ObjectId("..."),
  imageId: ObjectId("..."),
  name: { en: "...", mr: "...", hi: "..." },
  role: { en: "...", mr: "...", hi: "..." },
  village: { en: "...", mr: "...", hi: "..." },
  description: { en: "...", mr: "...", hi: "..." },
  contact: String,
  isSarpanch: Boolean,
  order: Number,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### 4. **complaints** Collection
```javascript
{
  _id: ObjectId("..."),
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String, // pending, in-progress, resolved, closed
  createdAt: Date,
  updatedAt: Date
}
```

### 5. **images** Collection (Metadata)
```javascript
{
  _id: ObjectId("..."),
  gridfsId: ObjectId("..."),
  component: String, // home-hero, leadership-sarpanch, leadership-team
  category: String,
  altText: String,
  order: Number,
  uploadedAt: Date,
  filename: String,
  contentType: String,
  size: Number
}
```

### 6. **admins** Collection
```javascript
{
  _id: ObjectId("..."),
  email: String, // UNIQUE within this database
  password: String, // bcrypt hashed
  role: String, // admin, editor, viewer
  permissions: Array,
  createdAt: Date,
  lastLogin: Date
}
```

### 7. **GridFS Bucket: `images`**
- Stores actual image files
- Per database

---

## 🔧 Master Registry (Optional but Recommended)

A separate database or collection to map domains to database names:

**Database: `master` or `config`**
**Collection: `villages`**

```javascript
{
  _id: ObjectId("..."),
  domain: "nandgaonpanchayat.in", // UNIQUE
  databaseName: "db_nandgaon",    // Database name to use
  displayName: {
    en: "Nandgaon Gram Panchayat",
    mr: "नंदगाव ग्रामपंचायत"
  },
  createdAt: Date,
  isActive: true
}
```

**Benefits:**
- Can change database names without code changes
- Can track which domains are registered
- Can add metadata per panchayat

---

## 🔐 Data Isolation

**Automatic!** Each panchayat has its own database, so:
- ✅ No need for `villageId` in queries
- ✅ No risk of data leakage
- ✅ Simpler queries (no filtering needed)
- ✅ Can backup/restore individual panchayats easily

---

## 📝 Setup Checklist

1. **MongoDB Cluster Connection**
   - [ ] Get cluster connection string
   - [ ] Add to `.env` file

2. **Master Registry Setup**
   - [ ] Create `master` database
   - [ ] Create `villages` collection
   - [ ] Add first panchayat entry

3. **Database Creation**
   - [ ] Create first panchayat database
   - [ ] Create all collections
   - [ ] Create indexes

4. **Code Updates**
   - [ ] Update database connection to be dynamic
   - [ ] Remove all `villageId` references
   - [ ] Update all queries

---

## 🚀 Next Steps

1. **You provide:** MongoDB cluster connection string
2. **I'll update:**
   - Database connection (dynamic per domain)
   - Remove villageId from all collections/queries
   - Update villageIdentifier middleware
   - Create master registry system
   - Update all routes

