import { Pressable, View, Text, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export interface CommandCardProps {
  icon: string;
  title: string;
  description: string;
  status: "ready" | "running" | "complete";
  onPress: () => void;
  disabled?: boolean;
}

/**
 * Card component for terminal commands
 */
export function CommandCard({
  icon,
  title,
  description,
  status,
  onPress,
  disabled = false,
}: CommandCardProps) {
  const colors = useColors();

  const handlePress = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  const statusColors = {
    ready: colors.primary,
    running: colors.warning,
    complete: colors.success,
  };

  const statusLabels = {
    ready: "READY",
    running: "RUNNING...",
    complete: "COMPLETE",
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || status === "running"}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : disabled ? 0.5 : 1,
        },
      ]}
      className={cn(
        "border border-primary/30 bg-surface rounded-lg p-4 mb-3",
        status === "running" && "border-warning/50",
        status === "complete" && "border-success/30"
      )}
    >
      <View className="flex-row items-start gap-3">
        {/* Icon */}
        <View className="w-10 h-10 items-center justify-center border border-primary/50 rounded bg-primary/10">
          <Text className="text-primary text-xl font-mono" style={{ fontFamily: 'monospace' }}>
            {icon}
          </Text>
        </View>

        {/* Content */}
        <View className="flex-1">
          <Text
            className="text-primary text-base font-bold font-mono mb-1"
            style={{
              fontFamily: 'monospace',
              textShadowColor: colors.primary,
              textShadowRadius: 5,
            }}
          >
            {title}
          </Text>
          <Text className="text-muted text-sm font-mono" style={{ fontFamily: 'monospace' }}>
            {description}
          </Text>
        </View>

        {/* Status */}
        <View className="items-end">
          <Text
            className="text-xs font-mono font-bold"
            style={{
              fontFamily: 'monospace',
              color: statusColors[status],
              textShadowColor: statusColors[status],
              textShadowRadius: 5,
            }}
          >
            {statusLabels[status]}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
