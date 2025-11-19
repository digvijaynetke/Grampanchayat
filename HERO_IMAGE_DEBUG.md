# Hero Image Debugging Guide

## ✅ Database Status

**Image exists in database:**
- Image ID: `6913ba7fc6bbf639c961a6fd`
- GridFS ID: `6913ba7ec6bbf639c961a6fb`
- Filename: `newHero.jpeg`
- Size: 248,517 bytes (243 KB)
- Format: JPEG
- Component: `home-hero`
- Uploaded: 2025-11-11T22:36:47.182Z

**Image is accessible:**
- URL: `http://localhost:5000/api/images/6913ba7fc6bbf639c961a6fd`
- Status: ✅ 200 OK
- Content-Type: ✅ image/jpeg
- Can be downloaded: ✅ Yes

## 🔍 Debugging Steps

### 1. Check Browser Console (F12)

Open browser console and look for:
- `Hero Image URL:` log message showing the constructed URL
- Any CORS errors
- Any 404 or network errors
- `Hero image loaded successfully` or `Hero image failed to load` messages

### 2. Check Network Tab (F12 → Network)

1. Open Network tab
2. Filter by "Img" or "All"
3. Refresh page (Ctrl+F5)
4. Look for the image request:
   - URL should be: `http://localhost:5000/api/images/6913ba7fc6bbf639c961a6fd?v=...`
   - Status should be: `200 OK`
   - Type should be: `jpeg` or `image`

### 3. Test Image URL Directly

Open this URL directly in browser:
```
http://localhost:5000/api/images/6913ba7fc6bbf639c961a6fd
```
(Don't forget to set `X-Village-Domain: localhost` header, or use a browser extension)

Or test with curl:
```bash
curl "http://localhost:5000/api/images/6913ba7fc6bbf639c961a6fd" \
  -H "X-Village-Domain: localhost" \
  -o test-image.jpg
```

### 4. Clear All Caches

**Browser Cache:**
- Chrome: Ctrl+Shift+Delete → Clear cached images and files
- Or: F12 → Network tab → Check "Disable cache" → Refresh

**React State:**
- The `useHomeData` hook might be caching
- Try closing and reopening the browser tab
- Or restart the frontend dev server

### 5. Check Environment Variables

Verify frontend `.env` file has:
```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_VILLAGE_DOMAIN=localhost
```

### 6. Verify Image URL Construction

The code should construct:
- Input: `/api/images/6913ba7fc6bbf639c961a6fd`
- Base URL: `http://localhost:5000/api`
- Output: `http://localhost:5000/api/images/6913ba7fc6bbf639c961a6fd?v=6913ba7fc6bbf639c961a6fd`

## 🐛 Common Issues

### Issue 1: Browser Cache
**Symptom:** Old image still showing
**Fix:** Hard refresh (Ctrl+F5) or clear cache

### Issue 2: CORS Error
**Symptom:** Console shows CORS error
**Fix:** Check backend CORS settings allow `localhost:5173`

### Issue 3: React State Cache
**Symptom:** Data not refreshing
**Fix:** Restart frontend dev server

### Issue 4: Image Not Loading
**Symptom:** Console shows 404 or network error
**Fix:** Check if backend is running and image endpoint works

## 🔧 Quick Fixes

### Force Refresh Data
Add this to browser console:
```javascript
localStorage.clear();
location.reload();
```

### Test Image Directly
```bash
# Test if image loads
curl -H "X-Village-Domain: localhost" \
  "http://localhost:5000/api/images/6913ba7fc6bbf639c961a6fd" \
  -o test.jpg && file test.jpg
```

### Check React State
In browser console:
```javascript
// Check what React is seeing
console.log(window.__REACT_DEVTOOLS_GLOBAL_HOOK__);
```

## 📝 What I Added

1. ✅ Debug logging in Hero component
2. ✅ Error handling with fallback image
3. ✅ Image load detection
4. ✅ Cache busting with image ID
5. ✅ Proper URL construction

## 🎯 Next Steps

1. **Open browser console (F12)**
2. **Look for "Hero Image URL:" log** - This shows the constructed URL
3. **Check Network tab** - See if image request is made and what status it returns
4. **Hard refresh** - Ctrl+F5 to clear cache
5. **Share console/network errors** if image still doesn't load

The image exists and is accessible. The issue is likely browser cache or React state. Check the browser console for the debug logs I added!

