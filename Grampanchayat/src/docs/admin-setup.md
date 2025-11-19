# Admin Panel Setup Guide

## Quick Start

### 1. Access Admin Panel

Navigate to: `yourdomain.com/#admin-login`

### 2. Register First Admin

**Option A: Via API (Recommended)**
```bash
POST http://localhost:5000/api/admin/auth/register
Headers:
  X-Village-Domain: nandgaonpanchayat.in
Body:
{
  "email": "admin@example.com",
  "password": "password123"
}
```

**Option B: Via MongoDB**
```javascript
// In MongoDB, update admin document:
db.admins.updateOne(
  { email: "admin@example.com" },
  { 
    $set: { 
      role: "admin",  // or "editor", "viewer"
      permissions: []  // or specific permissions array
    } 
  }
)
```

### 3. Login

Use the registered email and password to login at `/#admin-login`

## Admin Roles

### Full Admin (Default)
- Can manage everything
- Role: `admin`
- Permissions: All

### Editor
- Can edit Hero, About, Leadership
- Cannot manage complaints
- Role: `editor`
- Permissions: `manage_hero`, `manage_about`, `manage_leadership`, `upload_images`

### Viewer
- Can only view complaints
- Cannot edit anything
- Role: `viewer`
- Permissions: `view_complaints`

## Setting Admin Roles

### Method 1: Update in MongoDB

```javascript
// Make admin an editor
db.admins.updateOne(
  { email: "editor@example.com" },
  { $set: { role: "editor" } }
)

// Make admin a viewer
db.admins.updateOne(
  { email: "viewer@example.com" },
  { $set: { role: "viewer" } }
)

// Custom permissions
db.admins.updateOne(
  { email: "custom@example.com" },
  { 
    $set: { 
      role: "custom",
      permissions: ["manage_hero", "view_complaints"]
    } 
  }
)
```

### Method 2: Add Role Field When Creating

When registering via API, you can manually update the admin in MongoDB to set role/permissions.

## Features by Permission

| Permission | Can Do |
|------------|--------|
| `manage_hero` | Edit hero image, village name, descriptions |
| `manage_about` | Edit about title, description, video URL |
| `manage_leadership` | Add/edit/delete officials (Sarpanch + team) |
| `view_complaints` | View complaints list |
| `manage_complaints` | Update complaint status |
| `upload_images` | Upload new images |
| `manage_images` | Delete/update existing images |

## Dashboard Sections

Based on permissions, admins will see different sections:

- **Full Admin**: All 4 sections (Hero, About, Leadership, Complaints)
- **Editor**: 3 sections (Hero, About, Leadership)
- **Viewer**: 1 section (Complaints - view only)

## Security

- All admin routes require authentication
- JWT token stored in localStorage
- Permissions checked on both frontend and backend
- Each admin is tied to their village (cannot access other villages' data)

