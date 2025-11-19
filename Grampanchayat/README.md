# Gram Panchayat Frontend

React frontend for Gram Panchayat websites integrated with backend API.

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_VILLAGE_DOMAIN=nandgaonpanchayat.in
```

**Note:** `VITE_VILLAGE_DOMAIN` is optional - it will auto-detect from `window.location.hostname` if not set.

### 3. Start Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

## 📡 Backend Integration

The frontend is integrated with the backend API:

- **Hero Section**: Fetches hero image, village name, and descriptions
- **About Section**: Fetches title, description, and video URL
- **Leadership Section**: Fetches Sarpanch and team members with photos
- **Complaints**: Submits complaints to backend

### API Configuration

All API calls are configured in `src/config/api.js`:
- Automatically includes `X-Village-Domain` header
- Handles authentication for admin routes
- Provides helper functions for all API endpoints

### Components Updated

- `Hero.jsx` - Fetches from `/api/v1/data/home` (hero section)
- `About.jsx` - Fetches from `/api/v1/data/home` (about section)
- `Leadership.jsx` - Fetches from `/api/v1/data/home` (leadership section)
- `ComplaintModal.jsx` - Submits to `/api/complaints`

### Custom Hook

- `useHomeData` - React hook that fetches and caches home page data

## 🔧 Development

The frontend uses:
- **React 19** with Vite
- **Tailwind CSS** for styling
- Custom hooks for data fetching
- Fallback content if API data is not available

## 📝 Notes

- Images are served from backend via `/api/images/:imageId`
- All text content supports multi-language (en, mr, hi)
- Default language is Marathi (mr)
- Components gracefully handle loading and error states
