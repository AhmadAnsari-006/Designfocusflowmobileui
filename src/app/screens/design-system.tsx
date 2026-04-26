import { GlassCard } from "../components/glass-card";
import { Button3D } from "../components/button-3d";
import { ToggleSwitch } from "../components/toggle-switch";
import { StatCard } from "../components/stat-card";
import { CircularProgress } from "../components/circular-progress";
import { useState } from "react";
import { TrendingDown, Award, Target, Zap } from "lucide-react";

export function DesignSystem() {
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);

  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent">
            FocusFlow Design System
          </h1>
          <p className="text-muted-foreground mt-2">
            Premium 3D UI components with glassmorphism
          </p>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Buttons (3D Style)</h2>
            <GlassCard>
              <div className="flex flex-wrap gap-3">
                <Button3D variant="primary" size="sm">
                  Small Primary
                </Button3D>
                <Button3D variant="primary" size="md">
                  Medium Primary
                </Button3D>
                <Button3D variant="primary" size="lg">
                  Large Primary
                </Button3D>
              </div>
              <div className="flex flex-wrap gap-3 mt-3">
                <Button3D variant="secondary" size="md">
                  Secondary
                </Button3D>
                <Button3D variant="ghost" size="md">
                  Ghost
                </Button3D>
              </div>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Glass Cards</h2>
            <GlassCard>
              <h3 className="font-semibold mb-2">Default Glass Card</h3>
              <p className="text-sm text-muted-foreground">
                Glassmorphism card with backdrop blur and soft shadows. Hover enabled by default.
              </p>
            </GlassCard>
            <GlassCard className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10">
              <h3 className="font-semibold mb-2">Glass Card with Gradient</h3>
              <p className="text-sm text-muted-foreground">
                Add subtle gradient backgrounds for visual hierarchy.
              </p>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Toggle Switches</h2>
            <GlassCard>
              <div className="space-y-4">
                <ToggleSwitch
                  checked={toggle1}
                  onChange={setToggle1}
                  label="Enable notifications"
                  size="sm"
                />
                <ToggleSwitch
                  checked={toggle2}
                  onChange={setToggle2}
                  label="Focus mode active"
                  size="md"
                />
              </div>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Stat Cards</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatCard
                icon={TrendingDown}
                label="Weekly Avg"
                value="5.7h"
                trend={{ value: 15, isPositive: false, label: "less" }}
              />
              <StatCard
                icon={Award}
                label="Score"
                value="78"
                trend={{ value: 12, isPositive: true, label: "up" }}
              />
              <StatCard
                icon={Target}
                label="Goal Met"
                value="85%"
                gradient="from-green-500 to-emerald-600"
              />
              <StatCard
                icon={Zap}
                label="Streak"
                value="12d"
                gradient="from-orange-500 to-red-600"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Circular Progress</h2>
            <GlassCard>
              <div className="flex justify-around items-center py-4">
                <div className="text-center space-y-2">
                  <CircularProgress percentage={70} size={100} strokeWidth={8} />
                  <p className="text-xs text-muted-foreground">Daily Goal</p>
                </div>
                <div className="text-center space-y-2">
                  <CircularProgress percentage={45} size={100} strokeWidth={8} />
                  <p className="text-xs text-muted-foreground">Weekly Avg</p>
                </div>
                <div className="text-center space-y-2">
                  <CircularProgress percentage={92} size={100} strokeWidth={8} />
                  <p className="text-xs text-muted-foreground">Focus Time</p>
                </div>
              </div>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Color Palette</h2>
            <GlassCard>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <div className="h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg" />
                  <p className="text-xs text-center">Primary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg" />
                  <p className="text-xs text-center">Secondary</p>
                </div>
                <div className="space-y-2">
                  <div className="h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 shadow-lg" />
                  <p className="text-xs text-center">Accent</p>
                </div>
              </div>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Typography</h2>
            <GlassCard>
              <div className="space-y-3">
                <h1>Heading 1 - Display Large</h1>
                <h2>Heading 2 - Display Medium</h2>
                <h3>Heading 3 - Display Small</h3>
                <p className="text-foreground">
                  Body text - Regular weight for comfortable reading
                </p>
                <p className="text-muted-foreground">
                  Muted text - Used for secondary information
                </p>
                <p className="text-sm text-muted-foreground">
                  Small text - Captions and helper text
                </p>
              </div>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Spacing System</h2>
            <GlassCard>
              <p className="text-sm text-muted-foreground mb-4">
                8pt grid system for consistent spacing
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded" />
                  <span className="text-xs">8px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-500 rounded" />
                  <span className="text-xs">12px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-purple-500 rounded-xl" />
                  <span className="text-xs">16px</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-2xl shadow-lg" />
                  <span className="text-xs">24px</span>
                </div>
              </div>
            </GlassCard>
          </section>
        </div>
      </div>
    </div>
  );
}
