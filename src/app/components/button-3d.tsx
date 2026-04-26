import { motion } from "motion/react";
import { ReactNode } from "react";

interface Button3DProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button3D({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = ""
}: Button3DProps) {
  const baseStyles = "rounded-2xl font-medium transition-all duration-200";

  const variants = {
    primary: "bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/50",
    secondary: "bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50",
    ghost: "bg-white/10 backdrop-blur-sm text-foreground border border-white/20"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      style={{
        transform: 'perspective(1000px)',
      }}
    >
      {children}
    </motion.button>
  );
}
