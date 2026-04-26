import { motion } from "motion/react";
import { Zap } from "lucide-react";

export function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center space-y-8"
      >
        <motion.div
          className="w-32 h-32 mx-auto rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl"
          animate={{
            rotateY: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            boxShadow: '0 25px 80px -15px rgba(255, 255, 255, 0.5)',
          }}
        >
          <Zap className="w-16 h-16 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-white space-y-2"
        >
          <h1 className="text-4xl font-bold">FocusFlow</h1>
          <p className="text-white/80">Digital Wellness Optimizer</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-2 justify-center"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-white"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
