import { GlassCard } from "../components/glass-card";
import { Button3D } from "../components/button-3d";
import { Moon, Sun, Bell, Target, Shield, HelpCircle, LogOut } from "lucide-react";
import { motion } from "motion/react";

interface ProfileProps {
  isDark: boolean;
  onToggleTheme: () => void;
}

export function Profile({ isDark, onToggleTheme }: ProfileProps) {
  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-6">
        <div className="text-center space-y-4">
          <motion.div
            className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white text-3xl font-bold shadow-2xl"
            whileHover={{ scale: 1.05 }}
            style={{
              boxShadow: '0 20px 60px -10px rgba(124, 58, 237, 0.5)',
            }}
          >
            JD
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-muted-foreground">john.doe@email.com</p>
          </div>
        </div>

        <GlassCard>
          <div className="space-y-4">
            <h3 className="font-semibold">Daily Goal</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Screen time limit</span>
                <span className="text-sm font-medium text-purple-600">6.0 hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="12"
                defaultValue="6"
                className="w-full h-2 rounded-full bg-muted appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #8b5cf6 0%, #8b5cf6 50%, #e5e7eb 50%, #e5e7eb 100%)',
                }}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1h</span>
                <span>12h</span>
              </div>
            </div>
          </div>
        </GlassCard>

        <div className="space-y-3">
          <h3 className="font-semibold">Preferences</h3>

          <GlassCard className="!p-4" hover={false}>
            <button
              onClick={onToggleTheme}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <span>Theme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {isDark ? "Dark" : "Light"}
                </span>
                <motion.div
                  className="w-12 h-6 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 p-1 cursor-pointer"
                  animate={{ justifyContent: isDark ? "flex-end" : "flex-start" }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full bg-white shadow-lg"
                    layout
                  />
                </motion.div>
              </div>
            </button>
          </GlassCard>

          <GlassCard className="!p-4" hover={false}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5" />
                <span>Notifications</span>
              </div>
              <motion.div
                className="w-12 h-6 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 p-1 cursor-pointer flex items-center justify-end"
              >
                <motion.div className="w-4 h-4 rounded-full bg-white shadow-lg" />
              </motion.div>
            </div>
          </GlassCard>

          <GlassCard className="!p-4" hover={false}>
            <button
              onClick={() => window.location.hash = '#wellness'}
              className="w-full flex items-center gap-3"
            >
              <Target className="w-5 h-5" />
              <span>Wellness Center</span>
            </button>
          </GlassCard>

          <GlassCard className="!p-4" hover={false}>
            <button
              onClick={() => window.location.hash = '#blocking'}
              className="w-full flex items-center gap-3"
            >
              <Shield className="w-5 h-5" />
              <span>App Blocking</span>
            </button>
          </GlassCard>

          <GlassCard className="!p-4" hover={false}>
            <button className="w-full flex items-center gap-3">
              <HelpCircle className="w-5 h-5" />
              <span>Help & Support</span>
            </button>
          </GlassCard>
        </div>

        <Button3D variant="ghost" className="w-full !bg-red-500/10 !text-red-600 dark:!text-red-400">
          <LogOut className="w-5 h-5 mr-2" />
          Sign Out
        </Button3D>

        <div className="text-center text-xs text-muted-foreground pt-4">
          FocusFlow v1.0.0
          <br />
          Made with 💜 for digital wellness
        </div>
      </div>
    </div>
  );
}
