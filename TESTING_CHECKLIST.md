# ✅ Testing Checklist

## Backend Status

- ✅ MongoDB connection configured
- ✅ Master database connected
- ✅ Test panchayat initialized (`localhost` → `db_localhost`)
- ✅ Backend server starting on port 5000

## Frontend Status

- ✅ Environment variables configured
- ✅ API configuration ready
- ✅ Frontend server starting on port 5173 (default Vite port)

## Test Steps

### 1. Check Backend Health
```bash
curl http://localhost:5000/api/health
```

Expected: `{"status":"Server is running",...}`

### 2. Test Public API
```bash
curl -H "X-Village-Domain: localhost" http://localhost:5000/api/v1/data/home
```

Expected: Empty data (no content yet, but should return success)

### 3. Register Admin
```bash
curl -X POST http://localhost:5000/api/admin/auth/register \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: localhost" \
  -d '{"email": "admin@test.com", "password": "admin123"}'
```

Expected: `{"success": true, "message": "Admin registered successfully"}`

### 4. Login as Admin
```bash
curl -X POST http://localhost:5000/api/admin/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Village-Domain: localhost" \
  -d '{"email": "admin@test.com", "password": "admin123"}'
```

Expected: `{"success": true, "token": "...", ...}`

### 5. Access Frontend
Open browser: `http://localhost:5173`

### 6. Test Admin Panel
Navigate to: `http://localhost:5173#admin-login`

Login with:
- Email: `admin@test.com`
- Password: `admin123`

## Common Issues

### Backend not starting?
- Check MongoDB connection in `.env`
- Check if port 5000 is available
- Check MongoDB Atlas network access

### Frontend not connecting?
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check CORS settings in backend
- Check browser console for errors

### API returns 404?
- Ensure `X-Village-Domain: localhost` header is sent
- Check if panchayat is initialized

### Database errors?
- Run: `node backend/scripts/testConnection.js`
- Verify panchayat exists: Check master database

## Next Steps After Testing

1. ✅ Add hero section data
2. ✅ Add about section data
3. ✅ Add leadership (Sarpanch + team)
4. ✅ Upload images
5. ✅ Test complaint submission

