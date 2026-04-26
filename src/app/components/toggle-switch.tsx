import { motion } from "motion/react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
}

export function ToggleSwitch({ checked, onChange, label, size = "md" }: ToggleSwitchProps) {
  const sizes = {
    sm: { container: "w-10 h-5", dot: "w-3 h-3" },
    md: { container: "w-14 h-7", dot: "w-5 h-5" },
    lg: { container: "w-16 h-8", dot: "w-6 h-6" }
  };

  return (
    <button
      onClick={() => onChange(!checked)}
      className="flex items-center gap-3"
    >
      {label && <span className="text-sm">{label}</span>}
      <motion.div
        className={`${sizes[size].container} rounded-full p-1 transition-colors ${
          checked
            ? "bg-gradient-to-r from-purple-600 to-cyan-600"
            : "bg-gray-300 dark:bg-gray-700"
        }`}
        animate={{ justifyContent: checked ? "flex-end" : "flex-start" }}
      >
        <motion.div
          className={`${sizes[size].dot} rounded-full bg-white shadow-lg`}
          layout
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </button>
  );
}
