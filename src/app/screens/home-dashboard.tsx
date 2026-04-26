import { GlassCard } from "../components/glass-card";
import { FloatingActionButton } from "../components/floating-action-button";
import { motion } from "motion/react";
import { Smartphone, Instagram, Youtube, MessageCircle, Chrome, Sparkles, TrendingDown, Zap } from "lucide-react";

interface HomeDashboardProps {
  onStartFocus: () => void;
}

export function HomeDashboard({ onStartFocus }: HomeDashboardProps) {
  const screenTime = 4.2;
  const dailyGoal = 6.0;
  const percentage = (screenTime / dailyGoal) * 100;

  const apps = [
    { name: "Instagram", time: "1h 24m", icon: Instagram, color: "from-pink-500 to-purple-600" },
    { name: "YouTube", time: "1h 12m", icon: Youtube, color: "from-red-500 to-red-600" },
    { name: "WhatsApp", time: "48m", icon: MessageCircle, color: "from-green-500 to-green-600" },
    { name: "Chrome", time: "36m", icon: Chrome, color: "from-blue-500 to-cyan-600" },
  ];

  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Hey there! 👋</h1>
          <p className="text-muted-foreground">Let's make today productive</p>
        </div>

        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Screen Time</p>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {screenTime}h
                </h2>
                <p className="text-sm text-muted-foreground">of {dailyGoal}h goal</p>
              </div>

              <div className="relative w-32 h-32">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200 dark:text-gray-700"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - percentage / 100) }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold">{Math.round(percentage)}%</span>
                </div>
              </div>
            </div>

            {percentage < 70 && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
                <TrendingDown className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-green-600 dark:text-green-400">Great progress!</p>
                  <p className="text-sm text-green-600/80 dark:text-green-400/80">You're 30% below your average</p>
                </div>
              </div>
            )}
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">AI Suggestion</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              You spend most time on social media between 8-10 PM. Try enabling Focus Mode during these hours to reduce usage by 20%.
            </p>
            <button className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm text-sm hover:bg-white/20 transition-colors border border-white/20">
              Set Focus Schedule
            </button>
          </div>
        </GlassCard>

        <div>
          <h3 className="font-semibold mb-4">Top Apps Today</h3>
          <div className="space-y-3">
            {apps.map((app, index) => {
              const Icon = app.icon;
              return (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="!p-4" hover={false}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-muted-foreground">{app.time}</p>
                      </div>
                      <Smartphone className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      <FloatingActionButton
        icon={Zap}
        onClick={onStartFocus}
        label="Start Focus"
      />
    </div>
  );
}
