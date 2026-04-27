# FocusFlow Backend Architecture

## 🏗️ Current Implementation (Frontend-Only)

The app currently runs with a **simulated backend** that stores all data locally in `localStorage`. This provides a fully functional demo without requiring server infrastructure.

### Architecture Components

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │ Permissions  │  │ Phone Access │  │ Local State  │ │
│  │   Manager    │  │   Service    │  │  Management  │ │
│  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↓
         ┌───────────────────────────────────┐
         │      localStorage (Browser)        │
         │  • User preferences                │
         │  • Permission states               │
         │  • App usage data (mock)           │
         │  • Blocked apps list               │
         │  • Focus session history           │
         └───────────────────────────────────┘
```

## 📦 Services Layer

### 1. **Permission Manager** (`src/app/services/permissions.ts`)

Manages app permissions for accessing phone features:

```typescript
// Permission types
- USAGE_STATS      // Track screen time
- NOTIFICATIONS    // Send alerts
- OVERLAY          // Display over apps
- DO_NOT_DISTURB   // DND control
- ACCESSIBILITY    // App blocking
```

**Key Features:**
- Request permission flow simulation
- Status tracking (granted/denied/pending)
- Persistent storage in localStorage
- Observer pattern for state updates

**Usage:**
```typescript
import { permissionManager } from './services/permissions';

// Request permission
const status = await permissionManager.requestPermission('USAGE_STATS');

// Check status
const hasAccess = permissionManager.getPermission('USAGE_STATS') === 'granted';
```

### 2. **Phone Access Service** (`src/app/services/phone-access.ts`)

Simulates Android phone APIs for accessing device data:

**APIs Provided:**
```typescript
// Get app usage statistics
getUsageStats(startTime, endTime): Promise<AppUsageData[]>

// Get phone statistics
getPhoneStats(): Promise<PhoneStats>

// Get installed apps
getInstalledApps(): Promise<InstalledApp[]>

// Block/unblock apps
blockApp(packageName): Promise<boolean>
unblockApp(packageName): Promise<boolean>

// Do Not Disturb control
enableDoNotDisturb(): Promise<boolean>
disableDoNotDisturb(): Promise<boolean>
```

**Mock Data:**
- Generates realistic usage patterns
- Simulates 12+ popular apps
- Random but consistent usage times
- Stored in localStorage for persistence

### 3. **Permissions Context** (`src/app/context/permissions-context.tsx`)

React Context provider for global permission state:

```typescript
const { 
  permissions,              // All permissions
  requestPermission,        // Request single permission
  hasAllRequiredPermissions // Check if ready
} = usePermissions();
```

## 🔄 User Flow

```
1. Splash Screen (2s)
   ↓
2. Onboarding (3 screens)
   ↓
3. Permissions Setup ⭐ NEW
   ├─ Required: Usage Stats, Overlay, Accessibility
   ├─ Optional: Notifications, Do Not Disturb
   └─ Progress tracker (X of 5 granted)
   ↓
4. Main App
   ├─ Home Dashboard
   ├─ Focus Mode
   ├─ Insights & Analytics
   └─ Profile & Settings
      └─ Manage Permissions (revisit anytime)
```

## 🎯 Permissions Setup Screen

**Features:**
- ✅ Beautiful animated UI
- ✅ Required vs Optional permissions
- ✅ Real-time status updates (granted/denied/pending)
- ✅ Progress indicator
- ✅ "Grant All" shortcut button
- ✅ Skip option (for demo)
- ✅ Persists state across sessions

**Permission Descriptions:**
| Permission | Icon | Required | Purpose |
|------------|------|----------|---------|
| Usage Access | 📊 | Yes | Track screen time and app usage |
| Display Over Apps | 🔒 | Yes | Show focus mode overlays |
| Accessibility | ⚡ | Yes | Block apps in real-time |
| Notifications | 🔔 | No | Send reminders and alerts |
| Do Not Disturb | 🌙 | No | Auto-enable DND during focus |

## 📱 Android Permission Mapping

When building the real Flutter/Android app, map these to:

```kotlin
// Usage Stats
android.permission.PACKAGE_USAGE_STATS
Settings.ACTION_USAGE_ACCESS_SETTINGS

// Overlay
android.permission.SYSTEM_ALERT_WINDOW
Settings.ACTION_MANAGE_OVERLAY_PERMISSION

// Accessibility
android.accessibilityservice.AccessibilityService
Settings.ACTION_ACCESSIBILITY_SETTINGS

// Notifications
android.permission.POST_NOTIFICATIONS (Android 13+)

// Do Not Disturb
android.permission.ACCESS_NOTIFICATION_POLICY
Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS
```

## 🚀 Adding Real Backend with Supabase

### Why Supabase?

- ✅ **Multi-device sync** - Access data across devices
- ✅ **Cloud analytics** - Historical trends and insights
- ✅ **User authentication** - Secure user accounts
- ✅ **Real-time updates** - Live data synchronization
- ✅ **Backup & restore** - Never lose your data

### Database Schema (Supabase)

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE,
  created_at TIMESTAMP DEFAULT NOW(),
  daily_goal_hours DECIMAL DEFAULT 6.0,
  theme_preference TEXT DEFAULT 'dark'
);

-- App usage logs
CREATE TABLE app_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  app_name TEXT NOT NULL,
  package_name TEXT NOT NULL,
  usage_time_ms BIGINT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Focus sessions
CREATE TABLE focus_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  started_at TIMESTAMP NOT NULL,
  ended_at TIMESTAMP,
  duration_minutes INTEGER,
  completed BOOLEAN DEFAULT false
);

-- Blocked apps
CREATE TABLE blocked_apps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  package_name TEXT NOT NULL,
  is_blocked BOOLEAN DEFAULT true,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- User goals
CREATE TABLE user_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  goal_type TEXT NOT NULL,
  target_value DECIMAL NOT NULL,
  current_value DECIMAL DEFAULT 0,
  date DATE NOT NULL
);
```

### Migration Steps

1. **Connect Supabase** (via Figma Make settings)
   - Create Supabase project
   - Get project URL and anon key
   - Connect via Make UI

2. **Update Services**
   ```typescript
   // Replace localStorage with Supabase calls
   import { createClient } from '@supabase/supabase-js';
   
   const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
   
   // Example: Save usage data
   await supabase.from('app_usage').insert({
     user_id: user.id,
     app_name: 'Instagram',
     package_name: 'com.instagram.android',
     usage_time_ms: 3600000,
     date: new Date().toISOString().split('T')[0]
   });
   ```

3. **Add Authentication**
   ```typescript
   // Sign up
   const { data, error } = await supabase.auth.signUp({
     email: 'user@example.com',
     password: 'secure-password'
   });
   
   // Sign in
   const { data, error } = await supabase.auth.signInWithPassword({
     email: 'user@example.com',
     password: 'secure-password'
   });
   ```

4. **Enable Real-time Sync**
   ```typescript
   // Subscribe to changes
   supabase
     .from('app_usage')
     .on('INSERT', payload => {
       console.log('New usage data:', payload);
     })
     .subscribe();
   ```

## 🔐 Security Considerations

### Current (Local Storage)
- ✅ No network requests = No data leaks
- ✅ Data stays on device
- ❌ No backup if browser data is cleared
- ❌ No multi-device sync

### With Supabase
- ✅ Encrypted data in transit (HTTPS)
- ✅ Row Level Security (RLS) policies
- ✅ Cloud backups
- ⚠️ Requires authentication
- ⚠️ Must comply with privacy laws (GDPR, CCPA)

### RLS Policies Example

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own data"
  ON app_usage
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own data
CREATE POLICY "Users can insert own data"
  ON app_usage
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

## 📊 Data Privacy & Compliance

**Important Notes:**
- 🔒 Screen time data is **sensitive personal information**
- 📋 Requires user consent (GDPR Article 6)
- 🗑️ Users must be able to delete their data
- 📄 Privacy policy is **required**
- 🚫 **Do NOT** collect without explicit consent

**Recommended Privacy Policy Sections:**
1. What data we collect (app usage, screen time)
2. How we use it (analytics, insights)
3. Where it's stored (Supabase / local)
4. User rights (access, delete, export)
5. Data retention policy

## 🎨 Current Feature Set

✅ **Fully Functional Without Backend:**
- Onboarding flow
- Permission management system
- Simulated phone access
- Mock app usage data
- Focus mode timer
- App blocking UI
- Dark/light theme
- Local data persistence
- Analytics charts
- Wellness center

## 🚀 Next Steps

### Option 1: Keep Frontend-Only (Current)
- Perfect for prototyping
- No server costs
- Works offline
- Privacy-first approach

### Option 2: Add Supabase
- Would enable cloud sync
- Multi-device support
- Historical analytics
- User accounts

Would you like me to:
1. ✅ **Keep as-is** - Frontend-only demo (current state)
2. 🔄 **Connect Supabase** - Add real backend (requires setup)
3. 📱 **Flutter migration guide** - Document Android implementation

---

**Current Status:** ✅ Fully functional with local storage and mock data
