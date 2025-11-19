# Setup Instructions

## Quick Start

1. **Install Dependencies:**
   ```bash
   npm run install-all
   ```

2. **Copy Images:**
   The images from the root `img/` folder need to be accessible to the React app. They should be in `frontend/public/img/`.
   
   You can copy them manually or run:
   ```bash
   cp -r img/* frontend/public/img/
   ```

3. **Add Welcome Video (Optional):**
   For the About page video feature, place your welcome video at:
   ```
   frontend/public/videos/welcome.mp4
   ```
   If the video doesn't exist, a placeholder will be shown.

4. **Start Development Servers:**
   ```bash
   npm run dev
   ```

## Image Requirements

The following images are expected in `frontend/public/img/`:

- `logo.png` - Gram Panchayat logo (for header)
- `gav1.jpeg`, `gav2.jpeg`, `gav3.jpeg` - Village images
- `1.jpeg`, `2.jpeg`, `3.jpeg` - Additional images for gallery
- `sarpanch.png` - Sarpanch photo
- `gramadhikari.png` - Gram Adhikari photo
- `panipurotha_karmachari.png` - Panipurotha Karmachari photo
- `shipaii.png` - Shipaii photo

If any image is missing, a placeholder will be shown automatically.

## Backend Configuration

1. Create `backend/.env` file:
   ```
   PORT=5000
   NODE_ENV=development
   ```

2. The backend API endpoints are ready. MongoDB integration can be added later.

## Troubleshooting

- **Images not showing**: Make sure images are in `frontend/public/img/` folder
- **Video not playing**: Place video at `frontend/public/videos/welcome.mp4` or it will show a placeholder
- **Port conflicts**: Change PORT in `backend/.env` if 5000 is already in use
- **CORS errors**: Backend is configured to allow requests from frontend (localhost:3000)

