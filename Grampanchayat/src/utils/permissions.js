/**
 * Permission System for Admin Access Control
 * 
 * Permissions:
 * - manage_hero: Can edit hero section
 * - manage_about: Can edit about section
 * - manage_leadership: Can manage officials
 * - view_complaints: Can view complaints
 * - manage_complaints: Can update complaint status
 * - upload_images: Can upload images
 * - manage_images: Can delete/update images
 */

// Define permission groups
export const PERMISSIONS = {
  // Hero section
  MANAGE_HERO: 'manage_hero',
  
  // About section
  MANAGE_ABOUT: 'manage_about',
  
  // Leadership
  MANAGE_LEADERSHIP: 'manage_leadership',
  
  // Complaints
  VIEW_COMPLAINTS: 'view_complaints',
  MANAGE_COMPLAINTS: 'manage_complaints',
  
  // Images
  UPLOAD_IMAGES: 'upload_images',
  MANAGE_IMAGES: 'manage_images',
};

// Permission groups (roles)
export const PERMISSION_GROUPS = {
  SUPER_ADMIN: [
    PERMISSIONS.MANAGE_HERO,
    PERMISSIONS.MANAGE_ABOUT,
    PERMISSIONS.MANAGE_LEADERSHIP,
    PERMISSIONS.VIEW_COMPLAINTS,
    PERMISSIONS.MANAGE_COMPLAINTS,
    PERMISSIONS.UPLOAD_IMAGES,
    PERMISSIONS.MANAGE_IMAGES,
  ],
  ADMIN: [
    PERMISSIONS.MANAGE_HERO,
    PERMISSIONS.MANAGE_ABOUT,
    PERMISSIONS.MANAGE_LEADERSHIP,
    PERMISSIONS.VIEW_COMPLAINTS,
    PERMISSIONS.MANAGE_COMPLAINTS,
    PERMISSIONS.UPLOAD_IMAGES,
    PERMISSIONS.MANAGE_IMAGES,
  ],
  EDITOR: [
    PERMISSIONS.MANAGE_HERO,
    PERMISSIONS.MANAGE_ABOUT,
    PERMISSIONS.MANAGE_LEADERSHIP,
    PERMISSIONS.UPLOAD_IMAGES,
  ],
  VIEWER: [
    PERMISSIONS.VIEW_COMPLAINTS,
  ],
};

/**
 * Check if admin has a specific permission
 * @param {Object} admin - Admin object (from context)
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (admin, permission) => {
  if (!admin) return false;
  
  // If admin has explicit permissions array, check it
  if (admin.permissions && Array.isArray(admin.permissions)) {
    return admin.permissions.includes(permission);
  }
  
  // If admin has a role, check permission group
  if (admin.role) {
    const rolePermissions = PERMISSION_GROUPS[admin.role.toUpperCase()] || [];
    return rolePermissions.includes(permission);
  }
  
  // Default: if admin exists, give all permissions (for backward compatibility)
  // In production, you should always have a role or permissions array
  return true;
};

/**
 * Check if admin has any of the given permissions
 * @param {Object} admin - Admin object
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAnyPermission = (admin, permissions) => {
  return permissions.some(permission => hasPermission(admin, permission));
};

/**
 * Check if admin has all of the given permissions
 * @param {Object} admin - Admin object
 * @param {string[]} permissions - Array of permissions to check
 * @returns {boolean}
 */
export const hasAllPermissions = (admin, permissions) => {
  return permissions.every(permission => hasPermission(admin, permission));
};

