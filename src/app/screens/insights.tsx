import { GlassCard } from "../components/glass-card";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from "recharts";
import { TrendingDown, TrendingUp, Award, Target } from "lucide-react";

const weeklyData = [
  { day: "Mon", hours: 5.2 },
  { day: "Tue", hours: 4.8 },
  { day: "Wed", hours: 6.1 },
  { day: "Thu", hours: 4.5 },
  { day: "Fri", hours: 5.8 },
  { day: "Sat", hours: 7.2 },
  { day: "Sun", hours: 6.5 },
];

const trendData = [
  { week: "W1", hours: 6.8 },
  { week: "W2", hours: 6.2 },
  { week: "W3", hours: 5.8 },
  { week: "W4", hours: 5.4 },
];

export function Insights() {
  const avgScreenTime = 5.7;
  const productivityScore = 78;
  const improvement = -15;

  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Insights & Analytics</h1>
          <p className="text-muted-foreground">Your digital wellness journey</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="!p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingDown className="w-4 h-4" />
                <span className="text-xs">Weekly Avg</span>
              </div>
              <div className="text-2xl font-bold">{avgScreenTime}h</div>
              <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <TrendingDown className="w-3 h-3" />
                <span>{Math.abs(improvement)}% less</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="!p-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Award className="w-4 h-4" />
                <span className="text-xs">Score</span>
              </div>
              <div className="text-2xl font-bold">{productivityScore}</div>
              <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                <TrendingUp className="w-3 h-3" />
                <span>Excellent</span>
              </div>
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="space-y-4">
            <h3 className="font-semibold">Weekly Overview</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <XAxis
                  dataKey="day"
                  stroke="currentColor"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <Bar dataKey="hours" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="space-y-4">
            <h3 className="font-semibold">Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-20" />
                <XAxis
                  dataKey="week"
                  stroke="currentColor"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <YAxis
                  stroke="currentColor"
                  className="text-muted-foreground"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5" />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">AI Recommendations</h3>
            </div>
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 rounded-2xl bg-muted/30 border border-border"
              >
                <p className="text-sm">🎯 Set a daily limit of 5h to improve by 12%</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="p-3 rounded-2xl bg-muted/30 border border-border"
              >
                <p className="text-sm">📱 Block social media from 9-11 AM for deep work</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="p-3 rounded-2xl bg-muted/30 border border-border"
              >
                <p className="text-sm">🧘 Take 3 mindfulness breaks during peak usage</p>
              </motion.div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
