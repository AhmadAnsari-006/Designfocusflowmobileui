import { permissionManager } from './permissions';

export interface AppUsageData {
  appName: string;
  packageName: string;
  icon: string;
  totalTimeMs: number;
  lastUsedTimestamp: number;
  category: string;
}

export interface PhoneStats {
  screenOnTime: number;
  unlockCount: number;
  notificationCount: number;
  appsUsed: number;
}

export interface InstalledApp {
  name: string;
  packageName: string;
  icon: string;
  category: string;
  isSystemApp: boolean;
}

class PhoneAccessService {
  private mockApps: InstalledApp[] = [
    { name: 'Instagram', packageName: 'com.instagram.android', icon: '📷', category: 'Social', isSystemApp: false },
    { name: 'YouTube', packageName: 'com.google.android.youtube', icon: '📺', category: 'Entertainment', isSystemApp: false },
    { name: 'WhatsApp', packageName: 'com.whatsapp', icon: '💬', category: 'Social', isSystemApp: false },
    { name: 'Twitter', packageName: 'com.twitter.android', icon: '🐦', category: 'Social', isSystemApp: false },
    { name: 'Facebook', packageName: 'com.facebook.katana', icon: '👥', category: 'Social', isSystemApp: false },
    { name: 'Chrome', packageName: 'com.android.chrome', icon: '🌐', category: 'Browser', isSystemApp: false },
    { name: 'Gmail', packageName: 'com.google.android.gm', icon: '✉️', category: 'Productivity', isSystemApp: false },
    { name: 'Spotify', packageName: 'com.spotify.music', icon: '🎵', category: 'Entertainment', isSystemApp: false },
    { name: 'TikTok', packageName: 'com.zhiliaoapp.musically', icon: '🎬', category: 'Entertainment', isSystemApp: false },
    { name: 'Netflix', packageName: 'com.netflix.mediaclient', icon: '🎞️', category: 'Entertainment', isSystemApp: false },
    { name: 'Reddit', packageName: 'com.reddit.frontpage', icon: '📱', category: 'Social', isSystemApp: false },
    { name: 'Telegram', packageName: 'org.telegram.messenger', icon: '✈️', category: 'Social', isSystemApp: false },
  ];

  private generateMockUsageData(): AppUsageData[] {
    return this.mockApps.slice(0, 8).map(app => ({
      appName: app.name,
      packageName: app.packageName,
      icon: app.icon,
      totalTimeMs: Math.floor(Math.random() * 7200000), // 0-2 hours in ms
      lastUsedTimestamp: Date.now() - Math.floor(Math.random() * 86400000), // within last 24h
      category: app.category
    })).sort((a, b) => b.totalTimeMs - a.totalTimeMs);
  }

  async getUsageStats(startTime: number, endTime: number): Promise<AppUsageData[]> {
    if (permissionManager.getPermission('USAGE_STATS') !== 'granted') {
      throw new Error('Usage stats permission not granted');
    }

    // Simulate API delay
    await this.delay(500);

    const data = this.generateMockUsageData();
    const stored = localStorage.getItem('focusflow_usage_data');

    if (stored) {
      return JSON.parse(stored);
    }

    localStorage.setItem('focusflow_usage_data', JSON.stringify(data));
    return data;
  }

  async getPhoneStats(): Promise<PhoneStats> {
    if (permissionManager.getPermission('USAGE_STATS') !== 'granted') {
      throw new Error('Usage stats permission not granted');
    }

    await this.delay(300);

    const stored = localStorage.getItem('focusflow_phone_stats');
    if (stored) {
      return JSON.parse(stored);
    }

    const stats: PhoneStats = {
      screenOnTime: Math.floor(Math.random() * 28800000), // 0-8 hours
      unlockCount: Math.floor(Math.random() * 150) + 30, // 30-180 unlocks
      notificationCount: Math.floor(Math.random() * 200) + 50, // 50-250 notifications
      appsUsed: Math.floor(Math.random() * 30) + 15 // 15-45 apps
    };

    localStorage.setItem('focusflow_phone_stats', JSON.stringify(stats));
    return stats;
  }

  async getInstalledApps(): Promise<InstalledApp[]> {
    if (permissionManager.getPermission('ACCESSIBILITY') !== 'granted') {
      throw new Error('Accessibility permission not granted');
    }

    await this.delay(400);
    return this.mockApps;
  }

  async blockApp(packageName: string): Promise<boolean> {
    if (permissionManager.getPermission('ACCESSIBILITY') !== 'granted') {
      throw new Error('Accessibility permission not granted');
    }

    await this.delay(200);

    const blockedApps = this.getBlockedApps();
    if (!blockedApps.includes(packageName)) {
      blockedApps.push(packageName);
      localStorage.setItem('focusflow_blocked_apps', JSON.stringify(blockedApps));
    }

    return true;
  }

  async unblockApp(packageName: string): Promise<boolean> {
    if (permissionManager.getPermission('ACCESSIBILITY') !== 'granted') {
      throw new Error('Accessibility permission not granted');
    }

    await this.delay(200);

    const blockedApps = this.getBlockedApps();
    const filtered = blockedApps.filter(app => app !== packageName);
    localStorage.setItem('focusflow_blocked_apps', JSON.stringify(filtered));

    return true;
  }

  getBlockedApps(): string[] {
    const stored = localStorage.getItem('focusflow_blocked_apps');
    return stored ? JSON.parse(stored) : [];
  }

  async enableDoNotDisturb(): Promise<boolean> {
    if (permissionManager.getPermission('DO_NOT_DISTURB') !== 'granted') {
      throw new Error('Do Not Disturb permission not granted');
    }

    await this.delay(300);
    localStorage.setItem('focusflow_dnd_enabled', 'true');
    return true;
  }

  async disableDoNotDisturb(): Promise<boolean> {
    await this.delay(300);
    localStorage.setItem('focusflow_dnd_enabled', 'false');
    return true;
  }

  isDoNotDisturbEnabled(): boolean {
    return localStorage.getItem('focusflow_dnd_enabled') === 'true';
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Mock real-time usage tracking
  startUsageTracking(callback: (data: AppUsageData[]) => void) {
    const interval = setInterval(async () => {
      if (permissionManager.getPermission('USAGE_STATS') === 'granted') {
        const data = await this.getUsageStats(Date.now() - 86400000, Date.now());
        callback(data);
      }
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }
}

export const phoneAccessService = new PhoneAccessService();
