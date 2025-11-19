# Gram Panchayat Backend API

Simplified multi-tenant backend API for managing Gram Panchayat websites.

## 🎯 Features

- **Hero Section**: Image + Village name + 3 description blocks
- **About Section**: Title + Description + Video URL (text only, no images)
- **Leadership Section**: Sarpanch + 3 team members (with photos)
- **Complaints System**: Public submission + Admin viewing

## 📁 Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB & GridFS connection
├── middleware/
│   ├── villageIdentifier.js # Identify village from request
│   └── auth.js              # Admin authentication
├── routes/
│   ├── public/
│   │   ├── images.js        # Image serving
│   │   └── home.js          # Home page data
│   └── admin/
│       ├── auth.js          # Login/Register
│       ├── images.js        # Image upload/update/delete
│       ├── hero.js          # Hero section management
│       ├── about.js         # About section management
│       ├── officials.js     # Leadership management
│       └── complaints.js    # Complaints viewing
├── controllers/
│   └── imageController.js   # Image operations
├── utils/
│   └── gridfs.js            # GridFS helper functions
└── server.js                 # Main entry point
```

## 🚀 Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/grampanchayat
PORT=5000
JWT_SECRET=your-secret-key-change-this
FRONTEND_URL=http://localhost:3000
```

### 3. Initialize a Village

```bash
node scripts/initVillage.js nandgaon nandgaonpanchayat.in
```

### 4. Start Server

```bash
# Development
npm run dev

# Production
npm start
```

## 📡 API Endpoints

### Public Endpoints

All public endpoints require `X-Village-Domain` header.

#### Health Check
```
GET /api/health
```

#### Get Home Page Data
```
GET /api/v1/data/home
Headers: X-Village-Domain: nandgaonpanchayat.in
```

Response:
```json
{
  "success": true,
  "data": {
    "hero": {
      "image": "/api/images/...",
      "villageName": { "en": "...", "mr": "...", "hi": "..." },
      "descriptions": [...]
    },
    "about": {
      "title": { "en": "...", "mr": "...", "hi": "..." },
      "description": { "en": "...", "mr": "...", "hi": "..." },
      "videoUrl": "..."
    },
    "leadership": {
      "sarpanch": { ... },
      "teamMembers": [ ... ]
    }
  }
}
```

#### Serve Image
```
GET /api/images/:imageId
```

#### Submit Complaint
```
POST /api/complaints
Headers: X-Village-Domain: nandgaonpanchayat.in
Body: {
  "name": "...",
  "email": "...",
  "phone": "...",
  "subject": "...",
  "message": "..."
}
```

### Admin Endpoints

All admin endpoints require authentication:
```
Authorization: Bearer <jwt-token>
X-Village-Domain: nandgaonpanchayat.in
```

#### Authentication
- `POST /api/admin/auth/register` - Register admin
- `POST /api/admin/auth/login` - Login

#### Hero Section
- `GET /api/admin/hero` - Get hero section data
- `PUT /api/admin/hero` - Update hero section

#### About Section
- `GET /api/admin/about` - Get about section data
- `PUT /api/admin/about` - Update about section

#### Leadership
- `GET /api/admin/officials` - Get all officials
- `POST /api/admin/officials` - Create official
- `PUT /api/admin/officials/:id` - Update official
- `DELETE /api/admin/officials/:id` - Delete official

#### Images
- `POST /api/admin/images/upload` - Upload image
- `GET /api/admin/images/component/:component` - Get images by component
- `PUT /api/admin/images/:id` - Update image metadata
- `DELETE /api/admin/images/:id` - Delete image

#### Complaints
- `GET /api/admin/complaints` - Get all complaints
- `GET /api/admin/complaints/:id` - Get single complaint
- `PUT /api/admin/complaints/:id/status` - Update complaint status

## 🗄️ Database Collections

### heroSection
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  villageName: { en: "...", mr: "...", hi: "..." },
  descriptions: [
    {
      subtitle: { en: "...", mr: "...", hi: "..." },
      description: { en: "...", mr: "...", hi: "..." }
    }
  ]
}
```

### aboutSection
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  title: { en: "...", mr: "...", hi: "..." },
  description: { en: "...", mr: "...", hi: "..." },
  videoUrl: String
}
```

### officials
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  imageId: ObjectId,
  name: { en: "...", mr: "...", hi: "..." },
  role: { en: "...", mr: "...", hi: "..." },
  village: { en: "...", mr: "...", hi: "..." },
  description: { en: "...", mr: "...", hi: "..." },
  contact: String,
  isSarpanch: Boolean,
  order: Number,
  isActive: Boolean
}
```

### complaints
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String,  // 'pending', 'in-progress', 'resolved', 'closed'
  createdAt: Date
}
```

### images (metadata)
```javascript
{
  _id: ObjectId,
  gridfsId: ObjectId,
  villageId: ObjectId,
  component: "home-hero" | "leadership-sarpanch" | "leadership-team",
  category: String,  // For team members: "उपसरपंच", "ग्राम पंचायत अधिकारी", "सदस्य"
  altText: String,
  order: Number
}
```

## 🔧 Image Components

- `home-hero` - Hero background image
- `leadership-sarpanch` - Sarpanch photo
- `leadership-team` - Team member photos (with category)

## 🔐 Authentication Flow

1. Admin registers/login with email & password
2. Server returns JWT token
3. Client includes token in `Authorization: Bearer <token>` header
4. Middleware validates token and attaches admin info to request

## 📝 Example Workflow

1. **Upload Images:**
   - Upload hero image: `POST /api/admin/images/upload` (component: `home-hero`)
   - Upload Sarpanch photo: `POST /api/admin/images/upload` (component: `leadership-sarpanch`)
   - Upload team photos: `POST /api/admin/images/upload` (component: `leadership-team`)

2. **Update Sections:**
   - Update hero: `PUT /api/admin/hero`
   - Update about: `PUT /api/admin/about`
   - Create officials: `POST /api/admin/officials` (use imageId from step 1)

3. **View Complaints:**
   - Get complaints: `GET /api/admin/complaints`
   - Update status: `PUT /api/admin/complaints/:id/status`
