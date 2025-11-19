import { useAdmin } from '../../context/AdminContext';
import { hasPermission } from '../../utils/permissions';

/**
 * Component to conditionally render children based on permissions
 * Usage: <PermissionGuard permission={PERMISSIONS.MANAGE_HERO}>...</PermissionGuard>
 */
const PermissionGuard = ({ permission, children, fallback = null }) => {
  const { admin } = useAdmin();

  if (hasPermission(admin, permission)) {
    return children;
  }

  return fallback;
};

export default PermissionGuard;

