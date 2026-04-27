import { GlassCard } from "../components/glass-card";
import { Button3D } from "../components/button-3d";
import { usePermissions } from "../context/permissions-context";
import { Check, X, Clock, AlertCircle } from "lucide-react";
import { motion } from "motion/react";

export function PermissionsManager() {
  const { permissions, requestPermission, hasAllRequiredPermissions } = usePermissions();

  const handleRequest = async (type: any) => {
    await requestPermission(type);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'denied':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="pb-32 pt-8">
      <div className="px-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Permissions Manager</h1>
          <p className="text-muted-foreground">Manage app permissions and access</p>
        </div>

        {!hasAllRequiredPermissions && (
          <GlassCard className="!p-4 border-2 border-orange-500/30 bg-orange-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-orange-600 dark:text-orange-400">Action Required</p>
                <p className="text-sm text-orange-600/80 dark:text-orange-400/80 mt-1">
                  Some required permissions are missing. Grant them to use all features.
                </p>
              </div>
            </div>
          </GlassCard>
        )}

        <div className="space-y-3">
          {permissions.map((permission, index) => (
            <motion.div
              key={permission.type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <GlassCard className="!p-4" hover={false}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">{permission.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-medium">{permission.name}</h4>
                      {permission.required && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                          Required
                        </span>
                      )}
                      {permission.status === 'granted' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                          Granted
                        </span>
                      )}
                      {permission.status === 'denied' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                          Denied
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {permission.description}
                    </p>
                    {permission.status !== 'granted' && (
                      <button
                        onClick={() => handleRequest(permission.type)}
                        className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium"
                      >
                        Grant Permission
                      </button>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(permission.status)}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <GlassCard className="bg-gradient-to-br from-purple-500/10 to-blue-500/10">
          <div className="space-y-3">
            <h3 className="font-semibold">About Permissions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>🔒 All data is stored locally on your device</li>
              <li>🚫 No data is sent to external servers</li>
              <li>⚡ Permissions can be revoked anytime from settings</li>
              <li>🛡️ FocusFlow respects your privacy</li>
            </ul>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
