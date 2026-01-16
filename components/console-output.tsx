import { useEffect, useRef } from "react";
import { ScrollView, Text, View } from "react-native";
import { useColors } from "@/hooks/use-colors";

export interface ConsoleOutputProps {
  lines: string[];
}

/**
 * Console output area with auto-scroll
 */
export function ConsoleOutput({ lines }: ConsoleOutputProps) {
  const colors = useColors();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new lines are added
    if (scrollViewRef.current && lines.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [lines]);

  return (
    <View className="border border-primary/30 bg-black rounded-lg p-4 h-48">
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {lines.length === 0 ? (
          <Text className="text-muted text-sm font-mono" style={{ fontFamily: 'monospace' }}>
            {'> '}_
          </Text>
        ) : (
          lines.map((line, index) => (
            <Text
              key={index}
              className="text-primary text-sm font-mono mb-1"
              style={{
                fontFamily: 'monospace',
                color: line.startsWith('[ERROR]') ? colors.error : 
                       line.startsWith('[SUCCESS]') ? colors.success :
                       line.startsWith('[WARNING]') ? colors.warning :
                       colors.primary,
              }}
            >
              {line}
            </Text>
          ))
        )}
      </ScrollView>
    </View>
  );
}
