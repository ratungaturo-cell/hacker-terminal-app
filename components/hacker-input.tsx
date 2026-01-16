import { TextInput, View, Text, type TextInputProps } from "react-native";
import { useColors } from "@/hooks/use-colors";
import { cn } from "@/lib/utils";

export interface HackerInputProps extends TextInputProps {
  prefix?: string;
  containerClassName?: string;
}

/**
 * Input field with hacker terminal styling
 */
export function HackerInput({
  prefix,
  containerClassName,
  className,
  ...props
}: HackerInputProps) {
  const colors = useColors();

  return (
    <View className={cn("flex-row items-center border border-primary/30 rounded-lg px-4 py-3", containerClassName)}>
      {prefix && (
        <Text className="text-primary font-mono mr-2" style={{ fontFamily: 'monospace' }}>
          {prefix}
        </Text>
      )}
      <TextInput
        className={cn("flex-1 text-foreground font-mono", className)}
        style={{ 
          fontFamily: 'monospace',
          color: colors.foreground,
        }}
        placeholderTextColor={colors.muted}
        {...props}
      />
    </View>
  );
}
