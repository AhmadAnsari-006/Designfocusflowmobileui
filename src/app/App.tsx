import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SplashScreen } from "./components/splash-screen";
import { Onboarding } from "./screens/onboarding";
import { HomeDashboard } from "./screens/home-dashboard";
import { FocusMode } from "./screens/focus-mode";
import { Insights } from "./screens/insights";
import { Profile } from "./screens/profile";
import { Wellness } from "./screens/wellness";
import { AppBlocking } from "./screens/app-blocking";
import { DesignSystem } from "./screens/design-system";
import { BottomNav } from "./components/bottom-nav";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setActiveTab(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleStartFocus = () => {
    setActiveTab("focus");
    window.location.hash = "#focus";
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = `#${tab}`;
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 transition-colors duration-500">
        <Onboarding onComplete={() => setHasCompletedOnboarding(true)} />
      </div>
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeDashboard onStartFocus={handleStartFocus} />;
      case "focus":
        return <FocusMode />;
      case "insights":
        return <Insights />;
      case "profile":
        return <Profile isDark={isDark} onToggleTheme={toggleTheme} />;
      case "wellness":
        return <Wellness />;
      case "blocking":
        return <AppBlocking />;
      case "design-system":
        return <DesignSystem />;
      default:
        return <HomeDashboard onStartFocus={handleStartFocus} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-purple-950 dark:to-blue-950 transition-colors duration-500">
      <div className="max-w-md mx-auto min-h-screen relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>

        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

        {activeTab === "design-system" && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-full text-sm shadow-lg z-50"
            onClick={() => handleTabChange("home")}
          >
            ← Back to App
          </motion.button>
        )}

        {activeTab === "profile" && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="fixed bottom-28 right-6 px-4 py-2 bg-gradient-to-r from-purple-600/80 to-cyan-600/80 backdrop-blur-xl text-white rounded-full text-xs shadow-lg z-40"
            onClick={() => handleTabChange("design-system")}
          >
            🎨 Design System
          </motion.button>
        )}
      </div>
    </div>
  );
}