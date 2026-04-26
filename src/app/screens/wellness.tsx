import { useState } from "react";
import { GlassCard } from "../components/glass-card";
import { Button3D } from "../components/button-3d";
import { motion, AnimatePresence } from "motion/react";
import { Wind, Coffee, Dumbbell, Moon as MoonIcon } from "lucide-react";

export function Wellness() {
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");

  const startBreathing = () => {
    setBreathing(true);
    let phase: "inhale" | "hold" | "exhale" = "inhale";

    const cycle = () => {
      if (!breathing) return;

      if (phase === "inhale") {
        setTimeout(() => {
          phase = "hold";
          setBreathPhase(phase);
          cycle();
        }, 4000);
      } else if (phase === "hold") {
        setTimeout(() => {
          phase = "exhale";
          setBreathPhase(phase);
          cycle();
        }, 7000);
      } else {
        setTimeout(() => {
          phase = "inhale";
          setBreathPhase(phase);
          cycle();
        }, 8000);
      }
    };

    cycle();
  };

  const suggestions = [
    {
      icon: Coffee,
      title: "Take a Break",
      description: "You've been focused for 2 hours. Time for a 10-minute break.",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Dumbbell,
      title: "Stretch Exercise",
      description: "Quick 5-minute stretching routine to refresh your body.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: MoonIcon,
      title: "Wind Down",
      description: "It's getting late. Consider reducing screen time before bed.",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Wellness Center</h1>
          <p className="text-muted-foreground">Nurture your mind and body</p>
        </div>

        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10" />
          <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Breathing Exercise</h3>
            </div>

            <div className="flex flex-col items-center gap-6 py-8">
              <div className="relative w-48 h-48">
                <AnimatePresence>
                  {breathing && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 blur-2xl"
                        animate={{
                          scale: breathPhase === "inhale" ? 1.5 : breathPhase === "hold" ? 1.5 : 1,
                          opacity: breathPhase === "inhale" ? 0.8 : breathPhase === "hold" ? 0.8 : 0.3,
                        }}
                        transition={{ duration: breathPhase === "inhale" ? 4 : breathPhase === "hold" ? 7 : 8 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl"
                        animate={{
                          scale: breathPhase === "inhale" ? 1.2 : breathPhase === "hold" ? 1.2 : 0.8,
                        }}
                        transition={{ duration: breathPhase === "inhale" ? 4 : breathPhase === "hold" ? 7 : 8 }}
                      >
                        <div className="text-white text-center">
                          <p className="text-lg font-semibold capitalize">{breathPhase}</p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                {!breathing && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl">
                    <Wind className="w-12 h-12 text-white" />
                  </div>
                )}
              </div>

              <Button3D
                onClick={() => {
                  if (breathing) {
                    setBreathing(false);
                  } else {
                    startBreathing();
                  }
                }}
                variant="primary"
                size="lg"
              >
                {breathing ? "Stop Exercise" : "Start Breathing"}
              </Button3D>

              {breathing && (
                <p className="text-sm text-muted-foreground text-center">
                  Follow the circle: Inhale (4s) → Hold (7s) → Exhale (8s)
                </p>
              )}
            </div>
          </div>
        </GlassCard>

        <div className="space-y-3">
          <h3 className="font-semibold">Wellness Suggestions</h3>
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <motion.div
                key={suggestion.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="!p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${suggestion.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>

        <GlassCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10">
          <div className="space-y-3">
            <h3 className="font-semibold">Daily Mindfulness Tip</h3>
            <p className="text-sm text-muted-foreground">
              "The present moment is the only time over which we have dominion." — Thích Nhất Hạnh
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
