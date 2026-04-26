# FocusFlow - Digital Wellness & Screen Time Optimizer

## 🎨 Design System Overview

A premium mobile app UI with 3D styling, glassmorphism effects, and modern animations built with React, Tailwind CSS v4, and Motion (Framer Motion).

## 📱 Screens

### 1. **Onboarding (3 Screens)**
- **File**: `src/app/screens/onboarding.tsx`
- **Features**:
  - 3D rotating icon animations
  - Smooth slide transitions
  - Progress indicators
  - Skip functionality
  - Call-to-action button

### 2. **Home Dashboard**
- **File**: `src/app/screens/home-dashboard.tsx`
- **Features**:
  - 3D circular progress tracker for daily screen time
  - AI-powered usage suggestions
  - Top apps breakdown with usage statistics
  - Glass cards with gradient overlays
  - Success/warning indicators based on goals

### 3. **Focus Mode**
- **File**: `src/app/screens/focus-mode.tsx`
- **Features**:
  - Animated 3D focus orb with breathing effect
  - Pomodoro-style timer (25-minute default)
  - Real-time countdown
  - Blocked apps list
  - Play/Pause/Stop controls
  - Motivational tips

### 4. **Insights & Analytics**
- **File**: `src/app/screens/insights.tsx`
- **Features**:
  - Weekly bar charts (Recharts)
  - Monthly trend line graphs
  - Stat cards with trends (↗ ↘)
  - Productivity score indicator
  - AI recommendations panel
  - Dark mode optimized charts

### 5. **Profile & Settings**
- **File**: `src/app/screens/profile.tsx`
- **Features**:
  - User avatar with gradient
  - Daily goal slider
  - Theme toggle (Light/Dark)
  - Animated toggle switches
  - Settings navigation
  - Sign out option

### 6. **Wellness Center**
- **File**: `src/app/screens/wellness.tsx`
- **Features**:
  - Interactive breathing exercise
  - 4-7-8 breathing technique animation
  - Wellness suggestions cards
  - Break reminders
  - Mindfulness quotes

### 7. **App Blocking**
- **File**: `src/app/screens/app-blocking.tsx`
- **Features**:
  - Toggle switches per app
  - Category organization
  - Search functionality
  - App count indicator
  - Add custom apps option
  - Gradient app icons

### 8. **Design System Reference**
- **File**: `src/app/screens/design-system.tsx`
- **Features**:
  - All component variants
  - Color palette showcase
  - Typography system
  - Spacing guidelines (8pt grid)
  - Interactive component examples

## 🧩 Reusable Components

### **GlassCard**
- **File**: `src/app/components/glass-card.tsx`
- **Props**: `children`, `className`, `hover`
- **Features**:
  - Glassmorphism effect with backdrop blur
  - Subtle shadows and borders
  - Hover animations (scale + lift)
  - Support for gradient overlays

### **Button3D**
- **File**: `src/app/components/button-3d.tsx`
- **Props**: `children`, `onClick`, `variant`, `size`, `className`
- **Variants**: `primary`, `secondary`, `ghost`
- **Sizes**: `sm`, `md`, `lg`
- **Features**:
  - 3D depth shadows
  - Gradient backgrounds
  - Scale animations on hover/tap
  - Perspective transforms

### **ToggleSwitch**
- **File**: `src/app/components/toggle-switch.tsx`
- **Props**: `checked`, `onChange`, `label`, `size`
- **Sizes**: `sm`, `md`, `lg`
- **Features**:
  - Smooth spring animations
  - Gradient when active
  - Accessible toggle behavior

### **StatCard**
- **File**: `src/app/components/stat-card.tsx`
- **Props**: `icon`, `label`, `value`, `trend`, `gradient`
- **Features**:
  - Icon + label + value layout
  - Optional trend indicator (↗ ↘)
  - Customizable gradients
  - Glass card wrapper

### **CircularProgress**
- **File**: `src/app/components/circular-progress.tsx`
- **Props**: `percentage`, `size`, `strokeWidth`, `showLabel`, `gradient`
- **Features**:
  - Animated SVG circle
  - Gradient stroke support
  - Smooth percentage transitions
  - Customizable size and stroke

### **BottomNav**
- **File**: `src/app/components/bottom-nav.tsx`
- **Props**: `activeTab`, `onTabChange`
- **Features**:
  - 4-tab navigation (Home, Focus, Insights, Profile)
  - Animated active state indicator
  - Glass morphism effect
  - Icon + label layout

## 🎨 Design Tokens

### **Color Palette**
```css
Light Mode:
- Background: #f8f9ff (soft purple-tinted white)
- Primary: #7c3aed (purple-600)
- Secondary: #06b6d4 (cyan-500)
- Accent: #8b5cf6 (purple-500)

Dark Mode:
- Background: #0f0f1e (deep dark blue)
- Card: #1a1a2e (elevated dark surface)
- Primary: #8b5cf6 (bright purple)
- Secondary: #06b6d4 (bright cyan)
```

### **Gradients**
```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-secondary: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)
--gradient-wellness: linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)
```

### **Typography**
- **Font Family**: Poppins (400, 500, 600, 700)
- **Base Size**: 16px
- **Scale**: Default Tailwind scale
- **Font Weights**:
  - Normal: 400
  - Medium: 500
  - Semibold: 600
  - Bold: 700

### **Spacing**
- **System**: 8pt grid
- **Common values**: 8px, 12px, 16px, 24px, 32px, 48px
- **Border Radius**:
  - Small: 8px
  - Medium: 16px
  - Large: 24px
  - Extra Large: 32px

### **Shadows**
```css
Glass Card: 0 8px 32px 0 rgba(31, 38, 135, 0.15)
3D Button: 0 20px 60px -10px rgba(124, 58, 237, 0.5)
Elevation: 0 4px 12px rgba(0,0,0,0.1)
```

## 🎬 Animations & Motion

### **Motion Principles**
- **Ease**: easeOut, easeInOut
- **Duration**: 0.2s - 0.4s for UI transitions
- **Spring**: type: "spring", bounce: 0.2, stiffness: 500, damping: 30
- **Hover**: scale: 1.02-1.05, y: -2px
- **Tap**: scale: 0.95

### **Key Animations**
1. **Page Transitions**: Slide + fade (x: 20, opacity: 0 → 1)
2. **Card Hover**: Scale + lift (scale: 1.02, y: -2)
3. **Button Press**: Scale down (scale: 0.95)
4. **Progress Rings**: Stroke-dashoffset animation (1s easeOut)
5. **Breathing Exercise**: Scale + opacity pulse (4-7-8 rhythm)
6. **3D Orb Rotation**: Continuous rotation (20s linear)

## 📦 Tech Stack

- **React** 18.3.1
- **TypeScript** (via .tsx files)
- **Tailwind CSS** 4.1.12
- **Motion** (Framer Motion) 12.23.24
- **Recharts** 2.15.2 (for charts)
- **Lucide React** 0.487.0 (for icons)
- **Radix UI** (various components)

## 🎯 Flutter Translation Guide

### **Component Mapping**

| Web Component | Flutter Equivalent |
|---------------|-------------------|
| GlassCard | ClipRRect + BackdropFilter + blur |
| Button3D | ElevatedButton + BoxShadow + gradient |
| ToggleSwitch | AnimatedToggleSwitch package |
| CircularProgress | CircularProgressIndicator + CustomPaint |
| BottomNav | BottomNavigationBar |
| Motion animations | AnimatedContainer + AnimatedBuilder |

### **Key Flutter Packages Needed**
```yaml
dependencies:
  flutter_animate: ^4.5.0
  glassmorphism: ^3.0.0
  google_fonts: ^6.1.0  # for Poppins
  fl_chart: ^0.66.0     # for charts
  flutter_svg: ^2.0.9
```

### **Design System Export**
1. **Colors**: Define in `theme.dart` using Material 3 ColorScheme
2. **Typography**: Use Google Fonts Poppins with custom TextTheme
3. **Spacing**: Create custom spacing constants (8, 12, 16, 24...)
4. **Radius**: BorderRadius.circular() with named constants
5. **Shadows**: BoxShadow with multiple layers for depth

## 🌟 Key Features

✅ **Light + Dark Mode** - Fully themed with smooth transitions  
✅ **3D Effects** - Depth, shadows, perspective transforms  
✅ **Glassmorphism** - Backdrop blur, transparency, layered UI  
✅ **Smooth Animations** - Motion-powered transitions  
✅ **Responsive** - Mobile-first design (max-w-md container)  
✅ **Accessibility** - Semantic HTML, ARIA labels, keyboard nav  
✅ **Component Library** - Reusable, documented components  
✅ **8pt Grid** - Consistent spacing system  

## 🚀 Getting Started

1. Navigate through the app using bottom navigation
2. View the Design System by going to Profile → "🎨 Design System" button
3. All screens are accessible via hash routing:
   - `#home` - Dashboard
   - `#focus` - Focus Mode
   - `#insights` - Analytics
   - `#profile` - Settings
   - `#wellness` - Wellness Center
   - `#blocking` - App Blocking
   - `#design-system` - Component Library

## 💡 Design Philosophy

**Calm & Focused**
- Soft gradients (purple → blue → cyan)
- Ample whitespace
- Subtle animations (not distracting)
- Rounded corners (friendly, approachable)

**Premium Feel**
- 3D depth and shadows
- Glassmorphism effects
- High-quality typography (Poppins)
- Smooth 60fps animations

**User-Centric**
- Clear visual hierarchy
- Instant feedback on interactions
- Progressive disclosure
- Accessibility first

## 📝 Notes for Developers

- All components are self-contained and reusable
- Motion components use layout animations for smooth transitions
- Dark mode uses CSS variables for easy theming
- Charts are responsive and theme-aware
- Hash routing allows deep linking to specific screens
- Components follow atomic design principles
- 8pt grid ensures visual consistency

---

**Built with 💜 for Digital Wellness**
