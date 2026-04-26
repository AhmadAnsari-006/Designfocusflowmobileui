import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Button3D } from "../components/button-3d";
import { GlassCard } from "../components/glass-card";
import { Play, Pause, X, Instagram, Youtube, MessageCircle } from "lucide-react";

export function FocusMode() {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          return 25 * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const blockedApps = [
    { name: "Instagram", icon: Instagram },
    { name: "YouTube", icon: Youtube },
    { name: "WhatsApp", icon: MessageCircle },
  ];

  return (
    <div className="min-h-screen pb-32 pt-8">
      <div className="px-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold">Focus Mode</h1>
          <p className="text-muted-foreground">Stay focused, stay productive</p>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="relative">
            <motion.div
              className="w-72 h-72 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center"
              animate={{
                scale: isActive ? [1, 1.05, 1] : 1,
                rotate: isActive ? 360 : 0,
              }}
              transition={{
                scale: { duration: 2, repeat: isActive ? Infinity : 0, ease: "easeInOut" },
                rotate: { duration: 20, repeat: isActive ? Infinity : 0, ease: "linear" },
              }}
              style={{
                boxShadow: '0 25px 80px -15px rgba(124, 58, 237, 0.6)',
              }}
            >
              <div className="w-64 h-64 rounded-full bg-background dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {isActive ? "Stay Focused" : "Ready to start"}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 blur-3xl"
              animate={{
                scale: isActive ? [1, 1.2, 1] : 1,
                opacity: isActive ? [0.5, 0.8, 0.5] : 0.3,
              }}
              transition={{
                duration: 3,
                repeat: isActive ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="flex gap-4">
            <Button3D
              onClick={() => setIsActive(!isActive)}
              variant="primary"
              size="lg"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Focus
                </>
              )}
            </Button3D>

            {isActive && (
              <Button3D
                onClick={() => {
                  setIsActive(false);
                  setTimeLeft(25 * 60);
                }}
                variant="ghost"
                size="lg"
              >
                <X className="w-5 h-5 mr-2" />
                End
              </Button3D>
            )}
          </div>
        </div>

        <GlassCard>
          <div className="space-y-4">
            <h3 className="font-semibold">Blocked Apps</h3>
            <div className="space-y-2">
              {blockedApps.map((app) => {
                const Icon = app.icon;
                return (
                  <div
                    key={app.name}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-muted/50"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm">{app.name}</span>
                    {isActive && (
                      <span className="ml-auto text-xs px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400">
                        Blocked
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>

        <GlassCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium">💡 Pro Tip</p>
            <p className="text-sm text-muted-foreground">
              Take a 5-minute break every 25 minutes to maintain peak productivity
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
