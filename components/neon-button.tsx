import { Pressable, Text, type PressableProps, Platform } from "react-native";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export interface NeonButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "danger";
  textClassName?: string;
}

/**
 * Button with neon glow effect and haptic feedback
 */
export function NeonButton({
  title,
  variant = "primary",
  textClassName,
  className,
  onPress,
  ...props
}: NeonButtonProps) {
  const colors = useColors();

  const handlePress = (event: any) => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  const variantStyles = {
    primary: "border-primary bg-primary/10",
    secondary: "border-secondary bg-secondary/10",
    danger: "border-error bg-error/10",
  };

  const variantTextColors = {
    primary: colors.primary,
    secondary: colors.secondary,
    danger: colors.error,
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.97 : 1 }],
          opacity: pressed ? 0.9 : 1,
        },
      ]}
      className={cn(
        "border-2 rounded-lg px-6 py-4 items-center justify-center",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      <Text
        className={cn("text-lg font-bold font-mono uppercase", textClassName)}
        style={{
          fontFamily: 'monospace',
          color: variantTextColors[variant],
          textShadowColor: variantTextColors[variant],
          textShadowRadius: 10,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
