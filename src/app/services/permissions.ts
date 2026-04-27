export type PermissionType =
  | 'USAGE_STATS'
  | 'NOTIFICATIONS'
  | 'OVERLAY'
  | 'DO_NOT_DISTURB'
  | 'ACCESSIBILITY';

export type PermissionStatus = 'granted' | 'denied' | 'pending';

export interface Permission {
  type: PermissionType;
  status: PermissionStatus;
  name: string;
  description: string;
  required: boolean;
  icon: string;
}

export const PERMISSIONS: Record<PermissionType, Omit<Permission, 'status'>> = {
  USAGE_STATS: {
    type: 'USAGE_STATS',
    name: 'Usage Access',
    description: 'Required to track screen time and app usage statistics',
    required: true,
    icon: '📊'
  },
  NOTIFICATIONS: {
    type: 'NOTIFICATIONS',
    name: 'Notifications',
    description: 'Send reminders and alerts about screen time goals',
    required: false,
    icon: '🔔'
  },
  OVERLAY: {
    type: 'OVERLAY',
    name: 'Display Over Apps',
    description: 'Show focus mode overlay and app blocking screens',
    required: true,
    icon: '🔒'
  },
  DO_NOT_DISTURB: {
    type: 'DO_NOT_DISTURB',
    name: 'Do Not Disturb',
    description: 'Automatically enable DND during focus sessions',
    required: false,
    icon: '🌙'
  },
  ACCESSIBILITY: {
    type: 'ACCESSIBILITY',
    name: 'Accessibility Service',
    description: 'Block apps and monitor usage in real-time',
    required: true,
    icon: '⚡'
  }
};

class PermissionManager {
  private permissions: Map<PermissionType, PermissionStatus> = new Map();
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.loadPermissions();
  }

  private loadPermissions() {
    const stored = localStorage.getItem('focusflow_permissions');
    if (stored) {
      const parsed = JSON.parse(stored);
      Object.entries(parsed).forEach(([key, value]) => {
        this.permissions.set(key as PermissionType, value as PermissionStatus);
      });
    } else {
      // Initialize with pending status
      Object.keys(PERMISSIONS).forEach(type => {
        this.permissions.set(type as PermissionType, 'pending');
      });
    }
  }

  private savePermissions() {
    const obj: Record<string, PermissionStatus> = {};
    this.permissions.forEach((status, type) => {
      obj[type] = status;
    });
    localStorage.setItem('focusflow_permissions', JSON.stringify(obj));
    this.notifyListeners();
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getPermission(type: PermissionType): PermissionStatus {
    return this.permissions.get(type) || 'pending';
  }

  getAllPermissions(): Permission[] {
    return Object.keys(PERMISSIONS).map(type => ({
      ...PERMISSIONS[type as PermissionType],
      status: this.getPermission(type as PermissionType)
    }));
  }

  async requestPermission(type: PermissionType): Promise<PermissionStatus> {
    // Simulate permission request dialog
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate user accepting (90% chance)
        const granted = Math.random() > 0.1;
        const status: PermissionStatus = granted ? 'granted' : 'denied';
        this.permissions.set(type, status);
        this.savePermissions();
        resolve(status);
      }, 1000);
    });
  }

  grantPermission(type: PermissionType) {
    this.permissions.set(type, 'granted');
    this.savePermissions();
  }

  denyPermission(type: PermissionType) {
    this.permissions.set(type, 'denied');
    this.savePermissions();
  }

  hasAllRequiredPermissions(): boolean {
    return Object.values(PERMISSIONS)
      .filter(p => p.required)
      .every(p => this.getPermission(p.type) === 'granted');
  }

  getPendingRequiredPermissions(): Permission[] {
    return this.getAllPermissions().filter(
      p => p.required && p.status === 'pending'
    );
  }
}

export const permissionManager = new PermissionManager();
