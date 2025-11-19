# Admin Permissions System

## Overview

The admin panel uses a role-based access control (RBAC) system to manage what different admins can do.

## Permissions

### Available Permissions

- `manage_hero` - Can edit hero section (image + text)
- `manage_about` - Can edit about section (text + video)
- `manage_leadership` - Can manage officials (CRUD operations)
- `view_complaints` - Can view complaints list
- `manage_complaints` - Can update complaint status
- `upload_images` - Can upload images
- `manage_images` - Can delete/update images

## Permission Groups (Roles)

### SUPER_ADMIN
All permissions - full access to everything.

### ADMIN
All permissions - full access (same as SUPER_ADMIN for now).

### EDITOR
- `manage_hero`
- `manage_about`
- `manage_leadership`
- `upload_images`

Can edit content but cannot manage complaints.

### VIEWER
- `view_complaints`

Can only view complaints, cannot edit anything.

## How It Works

### Backend

1. **Admin Collection** stores:
   ```javascript
   {
     email: String,
     password: String (hashed),
     villageId: ObjectId,
     role: String,        // 'admin', 'editor', 'viewer', etc.
     permissions: Array,  // Optional: explicit permissions
     createdAt: Date
   }
   ```

2. **JWT Token** includes:
   - `role` - Admin's role
   - `permissions` - Array of permissions

3. **Default Behavior**:
   - If `permissions` array exists → use it
   - Else if `role` exists → use `PERMISSION_GROUPS[role]`
   - Else → give all permissions (backward compatibility)

### Frontend

1. **Permission Checks**:
   - `hasPermission(admin, permission)` - Check single permission
   - `hasAnyPermission(admin, [permissions])` - Check if has any
   - `hasAllPermissions(admin, [permissions])` - Check if has all

2. **Protected Routes**:
   ```jsx
   <ProtectedRoute requiredPermission={PERMISSIONS.MANAGE_HERO}>
     <HeroEditor />
   </ProtectedRoute>
   ```

3. **Component-Level Checks**:
   ```jsx
   {hasPermission(admin, PERMISSIONS.MANAGE_LEADERSHIP) && (
     <button>Add Official</button>
   )}
   ```

4. **PermissionGuard Component**:
   ```jsx
   <PermissionGuard permission={PERMISSIONS.VIEW_COMPLAINTS}>
     <ComplaintsList />
   </PermissionGuard>
   ```

## Setting Admin Roles

### Option 1: Set Role (Uses Permission Groups)

When creating/updating admin in database:
```javascript
{
  role: 'editor',  // Will get permissions from PERMISSION_GROUPS.EDITOR
  permissions: []  // Empty - uses role-based permissions
}
```

### Option 2: Set Explicit Permissions

```javascript
{
  role: 'custom',
  permissions: ['manage_hero', 'manage_about']  // Only these permissions
}
```

## Example: Creating Different Admin Types

### Full Admin
```javascript
{
  email: 'admin@village.in',
  role: 'admin',  // Gets all permissions
  permissions: []
}
```

### Content Editor
```javascript
{
  email: 'editor@village.in',
  role: 'editor',  // Can edit content, cannot manage complaints
  permissions: []
}
```

### Complaint Viewer Only
```javascript
{
  email: 'viewer@village.in',
  role: 'viewer',  // Can only view complaints
  permissions: []
}
```

### Custom Permissions
```javascript
{
  email: 'custom@village.in',
  role: 'custom',
  permissions: ['manage_hero', 'view_complaints']  // Only these
}
```

## Access URLs

- **Admin Login**: `domain.com/#admin-login`
- **Admin Dashboard**: `domain.com/#admin-dashboard`

## Security Notes

- Permissions are checked on both frontend (UI) and backend (API)
- JWT token includes role/permissions for quick checks
- Backend should validate permissions on every request
- Default behavior gives all permissions if role/permissions not set (for backward compatibility)

