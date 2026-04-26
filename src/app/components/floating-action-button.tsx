import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label?: string;
}

export function FloatingActionButton({ icon: Icon, onClick, label }: FloatingActionButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-32 right-6 z-40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="relative">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 blur-xl opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl">
          <Icon className="w-7 h-7 text-white" />
        </div>
        {label && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
