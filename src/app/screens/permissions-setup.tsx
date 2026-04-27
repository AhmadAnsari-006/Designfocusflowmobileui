import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "../components/glass-card";
import { Button3D } from "../components/button-3d";
import { usePermissions } from "../context/permissions-context";
import { Permission, PermissionType } from "../services/permissions";
import { Check, X, Clock, Shield } from "lucide-react";

interface PermissionsSetupProps {
  onComplete: () => void;
}

export function PermissionsSetup({ onComplete }: PermissionsSetupProps) {
  const { permissions, requestPermission, hasAllRequiredPermissions } = usePermissions();
  const [requesting, setRequesting] = useState<PermissionType | null>(null);

  const handleRequestPermission = async (type: PermissionType) => {
    setRequesting(type);
    await requestPermission(type);
    setRequesting(null);
  };

  const handleRequestAll = async () => {
    const pendingRequired = permissions.filter(p => p.required && p.status === 'pending');

    for (const permission of pendingRequired) {
      setRequesting(permission.type);
      await requestPermission(permission.type);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    setRequesting(null);
  };

  const getStatusIcon = (permission: Permission) => {
    if (requesting === permission.type) {
      return <Clock className="w-5 h-5 text-blue-500 animate-spin" />;
    }
    if (permission.status === 'granted') {
      return <Check className="w-5 h-5 text-green-500" />;
    }
    if (permission.status === 'denied') {
      return <X className="w-5 h-5 text-red-500" />;
    }
    return <Clock className="w-5 h-5 text-gray-400" />;
  };

  const getStatusColor = (permission: Permission) => {
    if (permission.status === 'granted') return 'border-green-500/30 bg-green-500/5';
    if (permission.status === 'denied') return 'border-red-500/30 bg-red-500/5';
    return 'border-gray-300/30 dark:border-gray-700/30';
  };

  const requiredPermissions = permissions.filter(p => p.required);
  const optionalPermissions = permissions.filter(p => !p.required);
  const grantedCount = permissions.filter(p => p.status === 'granted').length;

  return (
    <div className="min-h-screen pb-8 pt-8">
      <div className="px-6 space-y-6">
        <div className="text-center space-y-4">
          <motion.div
            className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center shadow-2xl"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <div>
            <h1 className="text-2xl font-bold">Setup Permissions</h1>
            <p className="text-muted-foreground mt-2">
              FocusFlow needs access to track and manage your screen time
            </p>
          </div>
        </div>

        <GlassCard className="!p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Setup Progress</p>
              <p className="text-xs text-muted-foreground">{grantedCount} of {permissions.length} permissions</p>
            </div>
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((grantedCount / permissions.length) * 100)}%
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-600 to-cyan-600"
              initial={{ width: 0 }}
              animate={{ width: `${(grantedCount / permissions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </GlassCard>

        <div className="space-y-4">
          <h3 className="font-semibold">Required Permissions</h3>
          {requiredPermissions.map((permission, index) => (
            <motion.div
              key={permission.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className={`!p-4 border-2 ${getStatusColor(permission)}`} hover={false}>
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0">{permission.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{permission.name}</h4>
                      {permission.required && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-400">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {permission.description}
                    </p>
                    {permission.status === 'pending' && (
                      <button
                        onClick={() => handleRequestPermission(permission.type)}
                        disabled={requesting !== null}
                        className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {requesting === permission.type ? 'Requesting...' : 'Grant Access'}
                      </button>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusIcon(permission)}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {optionalPermissions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Optional Permissions</h3>
            {optionalPermissions.map((permission, index) => (
              <motion.div
                key={permission.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (requiredPermissions.length + index) * 0.1 }}
              >
                <GlassCard className={`!p-4 border ${getStatusColor(permission)}`} hover={false}>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{permission.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{permission.name}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-600 dark:text-gray-400">
                          Optional
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {permission.description}
                      </p>
                      {permission.status === 'pending' && (
                        <button
                          onClick={() => handleRequestPermission(permission.type)}
                          disabled={requesting !== null}
                          className="mt-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-sm border border-white/20 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {requesting === permission.type ? 'Requesting...' : 'Grant Access'}
                        </button>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusIcon(permission)}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        )}

        <div className="space-y-3 pt-4">
          {!hasAllRequiredPermissions && (
            <Button3D
              onClick={handleRequestAll}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Grant All Required Permissions
            </Button3D>
          )}

          {hasAllRequiredPermissions && (
            <Button3D
              onClick={onComplete}
              variant="primary"
              size="lg"
              className="w-full"
            >
              Continue to App
            </Button3D>
          )}

          {!hasAllRequiredPermissions && (
            <button
              onClick={onComplete}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          )}
        </div>

        <div className="text-center text-xs text-muted-foreground pt-4 space-y-1">
          <p>🔒 Your privacy is protected</p>
          <p>All data is stored locally on your device</p>
        </div>
      </div>
    </div>
  );
}
