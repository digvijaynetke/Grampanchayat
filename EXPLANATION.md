# Database Structure Explanation

## Master Database (Registry)

**Purpose:** Maps domain names to database names

**Database:** `master`  
**Collection:** `villages`

This is like a phone book that tells the backend:
- "When someone visits `localhost`, use database `db_localhost`"
- "When someone visits `nandgaonpanchayat.in`, use database `db_nandgaon`"

**Example Entry:**
```javascript
{
  domain: "localhost",
  databaseName: "db_localhost",
  displayName: { ... },
  isActive: true
}
```

**This is NOT where your data is stored** - it's just a lookup table!

---

## Panchayat Databases (Your Data)

**Database:** `db_localhost` (for localhost domain)  
**Collections:**
- `heroSection` - Hero section text data
- `aboutSection` - About section text data
- `officials` - Leadership (Sarpanch + team)
- `complaints` - User complaints
- `images` - Image metadata
- `admins` - Admin users
- `images.files` & `images.chunks` - GridFS image files

**This is where your actual content is stored!**

---

## Why "Prafulla" Still Shows

If you cleared `db_localhost` but still see "Prafulla":

1. **Browser Cache** - React might be caching the old data
   - **Fix:** Hard refresh (Ctrl+F5) or clear cache

2. **React State** - The `useHomeData` hook might have cached data
   - **Fix:** Refresh the page completely

3. **Check Database Again** - Make sure you cleared the right database
   - The data is in `db_localhost`, not `master`

---

## To Clear Everything:

```bash
# Connect to MongoDB
# Delete all officials from db_localhost
db.use('db_localhost')
db.officials.deleteMany({})
```

Or use MongoDB Compass:
1. Select `db_localhost` database
2. Click on `officials` collection
3. Delete all documents

---

## Image URL Fix

✅ **Fixed:** Hero image URL construction
- Before: `http://localhost:5000/api/api/images/...` (wrong - double /api)
- After: `http://localhost:5000/api/images/...` (correct)

**To see the new hero image:**
1. Hard refresh browser (Ctrl+F5)
2. Or clear browser cache
3. The image should now load correctly

