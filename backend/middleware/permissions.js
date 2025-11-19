/**
 * Permission middleware for backend routes
 * Checks if admin has required permission
 */

// Permission groups (same as frontend)
const PERMISSION_GROUPS = {
  SUPER_ADMIN: [
    'manage_hero',
    'manage_about',
    'manage_leadership',
    'view_complaints',
    'manage_complaints',
    'upload_images',
    'manage_images',
  ],
  ADMIN: [
    'manage_hero',
    'manage_about',
    'manage_leadership',
    'view_complaints',
    'manage_complaints',
    'upload_images',
    'manage_images',
  ],
  EDITOR: [
    'manage_hero',
    'manage_about',
    'manage_leadership',
    'upload_images',
  ],
  VIEWER: [
    'view_complaints',
  ],
};

/**
 * Check if admin has permission
 */
const hasPermission = (admin, permission) => {
  if (!admin) return false;
  
  // If admin has explicit permissions array, check it
  if (admin.permissions && Array.isArray(admin.permissions) && admin.permissions.length > 0) {
    return admin.permissions.includes(permission);
  }
  
  // If admin has a role, check permission group
  if (admin.role) {
    const rolePermissions = PERMISSION_GROUPS[admin.role.toUpperCase()] || [];
    return rolePermissions.includes(permission);
  }
  
  // Default: if admin exists but no role/permissions, give all permissions (backward compatibility)
  return true;
};

/**
 * Middleware to check if admin has required permission
 * Usage: router.put('/', requirePermission('manage_hero'), handler)
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    const admin = req.admin;
    
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Admin not authenticated'
      });
    }
    
    if (!hasPermission(admin, permission)) {
      return res.status(403).json({
        success: false,
        message: `You don't have permission to perform this action. Required: ${permission}`
      });
    }
    
    next();
  };
};

module.exports = {
  requirePermission,
  hasPermission,
  PERMISSION_GROUPS
};

