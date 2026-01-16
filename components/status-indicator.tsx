import { useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useColors } from "@/hooks/use-colors";

export interface StatusIndicatorProps {
  status: "online" | "offline" | "connecting";
  label?: string;
}

/**
 * Pulsing LED status indicator
 */
export function StatusIndicator({ status, label }: StatusIndicatorProps) {
  const colors = useColors();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (status === "online" || status === "connecting") {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        false
      );
    } else {
      opacity.value = 0.3;
    }
  }, [status]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const statusColors = {
    online: colors.success,
    offline: colors.error,
    connecting: colors.warning,
  };

  const statusLabels = {
    online: "ONLINE",
    offline: "OFFLINE",
    connecting: "CONNECTING",
  };

  return (
    <View className="flex-row items-center gap-2">
      <Animated.View
        style={[
          animatedStyle,
          {
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: statusColors[status],
            shadowColor: statusColors[status],
            shadowRadius: 8,
            shadowOpacity: 1,
          },
        ]}
      />
      <Text
        className="text-xs font-mono font-bold"
        style={{
          fontFamily: 'monospace',
          color: statusColors[status],
        }}
      >
        {label || statusLabels[status]}
      </Text>
    </View>
  );
}
