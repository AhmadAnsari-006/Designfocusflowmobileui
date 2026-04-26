import { GlassCard } from "./glass-card";
import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  gradient?: string;
}

export function StatCard({ icon: Icon, label, value, trend, gradient = "from-purple-500 to-blue-600" }: StatCardProps) {
  return (
    <GlassCard className="!p-4 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon className="w-4 h-4" />
          <span className="text-xs">{label}</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold"
        >
          {value}
        </motion.div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs ${
            trend.isPositive
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}>
            <span>{trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%</span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
}
