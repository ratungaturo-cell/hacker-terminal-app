import { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

interface TraceResult {
  ip: string;
  country: string;
  city: string;
  isp: string;
  latitude: string;
  longitude: string;
  timezone: string;
  threat: "low" | "medium" | "high";
}

export default function TraceIPDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [ipAddress, setIpAddress] = useState("203.0.113.42");
  const [tracing, setTracing] = useState(false);
  const [result, setResult] = useState<TraceResult | null>(null);

  const startTrace = () => {
    if (!ipAddress.trim()) return;
    
    setTracing(true);
    playSound('click');

    setTimeout(() => {
      const mockResult: TraceResult = {
        ip: ipAddress,
        country: "Brasil",
        city: "São Paulo, SP",
        isp: "CloudNet Systems",
        latitude: "-23.5505",
        longitude: "-46.6333",
        timezone: "America/Sao_Paulo",
        threat: "high",
      };
      
      setResult(mockResult);
      playSound('success');
      setTracing(false);
    }, 2000);
  };

  const getThreatColor = (threat: TraceResult["threat"]) => {
    switch (threat) {
      case "low":
        return theme.success;
      case "medium":
        return theme.warning;
      case "high":
        return theme.error;
    }
  };

  const getThreatText = (threat: TraceResult["threat"]) => {
    switch (threat) {
      case "low":
        return "BAIXO";
      case "medium":
        return "MÉDIO";
      case "high":
        return "ALTO";
    }
  };

  return (
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6 pb-4" style={{ borderBottomColor: `${theme.primary}50`, borderBottomWidth: 1 }}>
            <Pressable
              onPress={() => {
                playSound('click');
                router.back();
              }}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Text
                className="text-2xl font-bold"
                style={{
                  fontFamily: 'monospace',
                  color: theme.primary,
                }}
              >
                ← {t.terminal.commands.trace.title}
              </Text>
            </Pressable>
          </View>

          {/* IP Input */}
          <View className="mb-6">
            <Text
              className="text-sm font-mono mb-2"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              ENDEREÇO IP
            </Text>
            <TextInput
              value={ipAddress}
              onChangeText={setIpAddress}
              editable={!tracing}
              placeholder="xxx.xxx.xxx.xxx"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
                backgroundColor: theme.surface,
                borderColor: theme.primary,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                fontSize: 14,
              }}
              placeholderTextColor={theme.muted}
            />
          </View>

          {/* Trace Button */}
          <Pressable
            onPress={startTrace}
            disabled={tracing || !ipAddress.trim()}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              marginBottom: 24,
              backgroundColor: tracing ? `${theme.primary}20` : "transparent",
            })}
          >
            <Text
              className="text-center font-mono font-bold"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              {tracing ? "RASTREANDO..." : "RASTREAR IP"}
            </Text>
          </Pressable>

          {/* Results */}
          {result && (
            <View>
              <Text
                className="text-lg font-bold font-mono mb-4"
                style={{
                  fontFamily: 'monospace',
                  color: theme.primary,
                  textShadowColor: theme.primary,
                  textShadowRadius: 8,
                }}
              >
                INFORMAÇÕES RASTREADAS
              </Text>
              <View
                className="p-4 border rounded-lg mb-4"
                style={{
                  borderColor: `${getThreatColor(result.threat)}80`,
                  backgroundColor: `${getThreatColor(result.threat)}10`,
                }}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <Text
                    className="text-base font-bold font-mono"
                    style={{
                      fontFamily: 'monospace',
                      color: theme.primary,
                    }}
                  >
                    {result.ip}
                  </Text>
                  <View
                    style={{
                      backgroundColor: getThreatColor(result.threat),
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                    }}
                  >
                    <Text
                      className="text-xs font-mono"
                      style={{
                        fontFamily: 'monospace',
                        color: theme.background,
                      }}
                    >
                      AMEAÇA: {getThreatText(result.threat)}
                    </Text>
                  </View>
                </View>

                <View className="gap-3">
                  <View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      País
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {result.country}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Cidade
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {result.city}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Provedor de Internet
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {result.isp}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Coordenadas
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {result.latitude}, {result.longitude}
                    </Text>
                  </View>

                  <View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Fuso Horário
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {result.timezone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
