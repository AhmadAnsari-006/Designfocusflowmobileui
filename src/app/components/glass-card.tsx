import { motion } from "motion/react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = "", hover = true }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -2 } : {}}
      className={`backdrop-blur-xl bg-white/70 dark:bg-white/5 rounded-3xl p-6 shadow-lg border border-white/20 dark:border-white/10 ${className}`}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}
    >
      {children}
    </motion.div>
  );
}
