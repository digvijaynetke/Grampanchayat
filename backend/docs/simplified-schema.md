# Simplified Backend Schema

This backend supports only 3 sections: Hero, About, and Leadership, plus Complaints system.

## Collections

### 1. heroSection Collection
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  villageName: {
    en: String,
    mr: String,
    hi: String
  },
  descriptions: [  // Array of 3 description blocks
    {
      subtitle: {
        en: String,
        mr: String,
        hi: String
      },
      description: {
        en: String,
        mr: String,
        hi: String
      }
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Image:** Stored in `images` collection with `component: 'home-hero'`

---

### 2. aboutSection Collection
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  title: {
    en: String,
    mr: String,
    hi: String
  },
  description: {
    en: String,
    mr: String,
    hi: String
  },
  videoUrl: String,  // Video URL or path
  createdAt: Date,
  updatedAt: Date
}
```

**No images** - Text only

---

### 3. officials Collection
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  imageId: ObjectId,        // Reference to images collection
  name: {
    en: String,
    mr: String,
    hi: String
  },
  role: {
    en: String,            // "Sarpanch", "Deputy Sarpanch", "Gram Panchayat Officer", "Member"
    mr: String,            // "सरपंच", "उपसरपंच", "ग्राम पंचायत अधिकारी", "सदस्य"
    hi: String
  },
  village: {
    en: String,
    mr: String,
    hi: String
  },
  description: {          // Optional, mainly for Sarpanch
    en: String,
    mr: String,
    hi: String
  },
  contact: String,        // Optional phone number
  isSarpanch: Boolean,    // true for Sarpanch, false for team members
  order: Number,          // For sorting team members
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Images:** 
- Sarpanch: `component: 'leadership-sarpanch'`
- Team members: `component: 'leadership-team'` (with category: उपसरपंच, ग्राम पंचायत अधिकारी, सदस्य)

---

### 4. complaints Collection
```javascript
{
  _id: ObjectId,
  villageId: ObjectId,
  name: String,
  email: String,
  phone: String,          // Optional
  subject: String,
  message: String,
  status: String,         // 'pending', 'in-progress', 'resolved', 'closed'
  createdAt: Date,
  updatedAt: Date
}
```

---

### 5. qrcodes Collection
```javascript
{
  _id: ObjectId,
  imageId: ObjectId,        // Reference to images collection (QR code image)
  price: Number,            // Optional price for the payment/service
  purpose: {                // What is this QR code for?
    en: String,
    mr: String,
    hi: String
  },
  description: {            // Additional description
    en: String,
    mr: String,
    hi: String
  },
  isActive: Boolean,        // Whether to show on website
  order: Number,           // Display order
  createdAt: Date,
  updatedAt: Date
}
```

**Images:** Stored in `images` collection with `component: 'qr-code'`

---

### 6. images Collection (Metadata)
```javascript
{
  _id: ObjectId,
  gridfsId: ObjectId,     // Reference to GridFS file
  villageId: ObjectId,
  component: String,      // 'home-hero', 'leadership-sarpanch', 'leadership-team', 'qr-code'
  category: String,       // Optional (e.g., 'उपसरपंच', 'ग्राम पंचायत अधिकारी', 'सदस्य')
  altText: String,
  order: Number,
  uploadedAt: Date,
  filename: String,
  contentType: String,
  size: Number
}
```

---

## API Endpoints Summary

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/v1/data/home` - Get home page data (Hero, About, Leadership)
- `GET /api/v1/data/qrcodes` - Get active QR codes
- `GET /api/images/:imageId` - Serve image
- `POST /api/complaints` - Submit complaint

### Admin Endpoints (Require Authentication + X-Village-Domain header)
- `POST /api/admin/auth/register` - Register admin
- `POST /api/admin/auth/login` - Login admin
- `GET /api/admin/hero` - Get hero section data
- `PUT /api/admin/hero` - Update hero section
- `GET /api/admin/about` - Get about section data
- `PUT /api/admin/about` - Update about section
- `GET /api/admin/officials` - Get all officials
- `POST /api/admin/officials` - Create official
- `PUT /api/admin/officials/:id` - Update official
- `DELETE /api/admin/officials/:id` - Delete official
- `GET /api/admin/complaints` - Get complaints (with pagination)
- `GET /api/admin/complaints/:id` - Get single complaint
- `PUT /api/admin/complaints/:id/status` - Update complaint status
- `POST /api/admin/images/upload` - Upload image
- `GET /api/admin/images/component/:component` - Get images by component
- `PUT /api/admin/images/:id` - Update image metadata
- `DELETE /api/admin/images/:id` - Delete image
- `GET /api/admin/qrcodes` - Get all QR codes
- `GET /api/admin/qrcodes/:id` - Get single QR code
- `POST /api/admin/qrcodes` - Create QR code
- `PUT /api/admin/qrcodes/:id` - Update QR code
- `DELETE /api/admin/qrcodes/:id` - Delete QR code

