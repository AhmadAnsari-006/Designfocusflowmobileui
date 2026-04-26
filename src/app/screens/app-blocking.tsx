import { useState } from "react";
import { GlassCard } from "../components/glass-card";
import { Button3D } from "../components/button-3d";
import { motion } from "motion/react";
import {
  Instagram,
  Youtube,
  MessageCircle,
  Twitter,
  Facebook,
  Chrome,
  Mail,
  Music,
  ShoppingBag,
  Film,
  Search,
  Plus
} from "lucide-react";

interface App {
  id: string;
  name: string;
  icon: any;
  color: string;
  blocked: boolean;
  category: string;
}

export function AppBlocking() {
  const [apps, setApps] = useState<App[]>([
    { id: "1", name: "Instagram", icon: Instagram, color: "from-pink-500 to-purple-600", blocked: true, category: "Social" },
    { id: "2", name: "YouTube", icon: Youtube, color: "from-red-500 to-red-600", blocked: true, category: "Entertainment" },
    { id: "3", name: "WhatsApp", icon: MessageCircle, color: "from-green-500 to-green-600", blocked: true, category: "Social" },
    { id: "4", name: "Twitter", icon: Twitter, color: "from-blue-400 to-blue-600", blocked: false, category: "Social" },
    { id: "5", name: "Facebook", icon: Facebook, color: "from-blue-600 to-blue-800", blocked: false, category: "Social" },
    { id: "6", name: "Chrome", icon: Chrome, color: "from-blue-500 to-cyan-600", blocked: false, category: "Browser" },
    { id: "7", name: "Gmail", icon: Mail, color: "from-red-500 to-pink-600", blocked: false, category: "Productivity" },
    { id: "8", name: "Spotify", icon: Music, color: "from-green-400 to-green-600", blocked: false, category: "Entertainment" },
    { id: "9", name: "Amazon", icon: ShoppingBag, color: "from-orange-400 to-yellow-600", blocked: false, category: "Shopping" },
    { id: "10", name: "Netflix", icon: Film, color: "from-red-600 to-red-800", blocked: false, category: "Entertainment" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const toggleApp = (id: string) => {
    setApps(apps.map(app =>
      app.id === id ? { ...app, blocked: !app.blocked } : app
    ));
  };

  const filteredApps = apps.filter(app =>
    app.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const blockedCount = apps.filter(app => app.blocked).length;

  const categories = Array.from(new Set(apps.map(app => app.category)));

  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">App Blocking</h1>
          <p className="text-muted-foreground">
            {blockedCount} apps blocked during focus mode
          </p>
        </div>

        <GlassCard className="!p-4">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search apps..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </GlassCard>

        {categories.map((category) => {
          const categoryApps = filteredApps.filter(app => app.category === category);
          if (categoryApps.length === 0) return null;

          return (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground px-2">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryApps.map((app, index) => {
                  const Icon = app.icon;
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <GlassCard className="!p-4" hover={false}>
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{app.name}</p>
                            <p className="text-xs text-muted-foreground">{app.category}</p>
                          </div>
                          <button
                            onClick={() => toggleApp(app.id)}
                            className="relative"
                          >
                            <motion.div
                              className={`w-14 h-7 rounded-full p-1 transition-colors ${
                                app.blocked
                                  ? "bg-gradient-to-r from-purple-600 to-cyan-600"
                                  : "bg-gray-300 dark:bg-gray-700"
                              }`}
                              animate={{
                                justifyContent: app.blocked ? "flex-end" : "flex-start"
                              }}
                            >
                              <motion.div
                                className="w-5 h-5 rounded-full bg-white shadow-lg"
                                layout
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              />
                            </motion.div>
                          </button>
                        </div>
                      </GlassCard>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <GlassCard className="!p-4 border-2 border-dashed border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-900/10">
          <button className="w-full flex items-center justify-center gap-2 text-purple-600 dark:text-purple-400">
            <Plus className="w-5 h-5" />
            <span>Add Custom App</span>
          </button>
        </GlassCard>

        <div className="pt-4">
          <Button3D variant="primary" size="lg" className="w-full">
            Save Changes
          </Button3D>
        </div>
      </div>
    </div>
  );
}
