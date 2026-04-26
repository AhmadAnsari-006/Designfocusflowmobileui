import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button3D } from "../components/button-3d";
import { Smartphone, Brain, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

const screens = [
  {
    icon: Smartphone,
    title: "Break Free from Digital Addiction",
    description: "Your phone shouldn't control you. Take back your time and focus on what truly matters.",
    gradient: "from-purple-600 to-blue-600"
  },
  {
    icon: Brain,
    title: "Smart AI-Powered Insights",
    description: "Get personalized recommendations based on your usage patterns and productivity goals.",
    gradient: "from-cyan-500 to-purple-600"
  },
  {
    icon: Sparkles,
    title: "Cultivate Digital Wellness",
    description: "Build healthier habits with focus modes, mindfulness exercises, and screen time limits.",
    gradient: "from-blue-500 to-purple-700"
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = screens[currentIndex];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 pb-12">
      <div className="w-full flex justify-end">
        <button
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div
              className={`w-32 h-32 rounded-full bg-gradient-to-br ${current.gradient} flex items-center justify-center shadow-2xl`}
              animate={{
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{
                boxShadow: '0 20px 60px -10px rgba(124, 58, 237, 0.5)',
              }}
            >
              <Icon className="w-16 h-16 text-white" />
            </motion.div>

            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {current.title}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {current.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md space-y-6">
        <div className="flex justify-center gap-2">
          {screens.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-gradient-to-r from-purple-600 to-blue-600"
                  : "w-2 bg-gray-300 dark:bg-gray-700"
              }`}
              animate={{ scale: index === currentIndex ? 1 : 0.8 }}
            />
          ))}
        </div>

        <Button3D
          onClick={handleNext}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {currentIndex < screens.length - 1 ? "Continue" : "Start Focus Journey"}
        </Button3D>
      </div>
    </div>
  );
}
