import { Home, Focus, BarChart3, User } from "lucide-react";
import { motion } from "motion/react";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "focus", icon: Focus, label: "Focus" },
    { id: "insights", icon: BarChart3, label: "Insights" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="max-w-md mx-auto px-4 pb-4">
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 px-6 py-3"
          style={{
            boxShadow: '0 -4px 32px 0 rgba(31, 38, 135, 0.2)',
          }}
        >
          <div className="flex justify-around items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="flex flex-col items-center gap-1 relative px-6 py-2"
                  whileTap={{ scale: 0.9 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <Icon
                    className={`w-6 h-6 relative z-10 transition-colors ${
                      isActive
                        ? "text-purple-600 dark:text-purple-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  />
                  <span className={`text-xs relative z-10 transition-colors ${
                    isActive
                      ? "text-purple-600 dark:text-purple-400 font-medium"
                      : "text-gray-500 dark:text-gray-400"
                  }`}>
                    {tab.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
