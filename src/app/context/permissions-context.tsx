import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { permissionManager, Permission, PermissionType, PermissionStatus } from '../services/permissions';

interface PermissionsContextValue {
  permissions: Permission[];
  requestPermission: (type: PermissionType) => Promise<PermissionStatus>;
  hasAllRequiredPermissions: boolean;
  isLoading: boolean;
}

const PermissionsContext = createContext<PermissionsContextValue | null>(null);

export function PermissionsProvider({ children }: { children: ReactNode }) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updatePermissions = () => {
      setPermissions(permissionManager.getAllPermissions());
      setIsLoading(false);
    };

    updatePermissions();
    const unsubscribe = permissionManager.subscribe(updatePermissions);

    return () => unsubscribe();
  }, []);

  const requestPermission = async (type: PermissionType): Promise<PermissionStatus> => {
    return await permissionManager.requestPermission(type);
  };

  const hasAllRequiredPermissions = permissionManager.hasAllRequiredPermissions();

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        requestPermission,
        hasAllRequiredPermissions,
        isLoading
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
}

export function usePermissions() {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within PermissionsProvider');
  }
  return context;
}
