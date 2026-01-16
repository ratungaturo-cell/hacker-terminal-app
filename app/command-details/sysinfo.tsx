import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

interface SystemInfo {
  os: string;
  version: string;
  cpu: string;
  ram: string;
  storage: string;
  uptime: string;
  hostname: string;
  architecture: string;
}

export default function SystemInfoDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [sysInfo, setSysInfo] = useState<SystemInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSystemInfo();
  }, []);

  const loadSystemInfo = () => {
    setLoading(true);
    playSound('click');

    setTimeout(() => {
      const info: SystemInfo = {
        os: Platform.OS === 'ios' ? 'iOS' : Platform.OS === 'android' ? 'Android' : 'Web',
        version: Platform.Version?.toString() || 'Unknown',
        cpu: '8 cores @ 2.4GHz',
        ram: '8GB',
        storage: '256GB SSD',
        uptime: '45 dias, 12 horas',
        hostname: 'hacker-terminal-01',
        architecture: 'ARM64',
      };
      
      setSysInfo(info);
      playSound('success');
      setLoading(false);
    }, 1500);
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
                ← {t.terminal.commands.sysinfo.title}
              </Text>
            </Pressable>
          </View>

          {/* Loading State */}
          {loading ? (
            <View className="flex-1 items-center justify-center">
              <Text
                className="text-lg font-mono"
                style={{
                  fontFamily: 'monospace',
                  color: theme.muted,
                }}
              >
                COLETANDO INFORMAÇÕES...
              </Text>
            </View>
          ) : sysInfo ? (
            <View>
              {/* System Overview */}
              <View className="mb-6 p-4 border rounded-lg" style={{ borderColor: `${theme.primary}50`, backgroundColor: `${theme.primary}10` }}>
                <Text
                  className="text-base font-bold font-mono mb-4"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.primary,
                    textShadowColor: theme.primary,
                    textShadowRadius: 8,
                  }}
                >
                  VISÃO GERAL
                </Text>
                <View className="gap-3">
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Sistema Operacional:
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.os} {sysInfo.version}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Hostname:
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.hostname}
                    </Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Arquitetura:
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.architecture}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Hardware Info */}
              <View className="mb-6 p-4 border rounded-lg" style={{ borderColor: `${theme.primary}50`, backgroundColor: `${theme.primary}10` }}>
                <Text
                  className="text-base font-bold font-mono mb-4"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.primary,
                    textShadowColor: theme.primary,
                    textShadowRadius: 8,
                  }}
                >
                  HARDWARE
                </Text>
                <View className="gap-4">
                  <View>
                    <Text className="text-xs font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Processador
                    </Text>
                    <Text className="text-sm font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.cpu}
                    </Text>
                    <View style={{ height: 6, backgroundColor: `${theme.primary}20`, borderRadius: 3, overflow: "hidden" }}>
                      <View
                        style={{
                          height: "100%",
                          width: "65%",
                          backgroundColor: theme.warning,
                          borderRadius: 3,
                        }}
                      />
                    </View>
                    <Text className="text-xs font-mono mt-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Uso: 65%
                    </Text>
                  </View>

                  <View>
                    <Text className="text-xs font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Memória RAM
                    </Text>
                    <Text className="text-sm font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.ram}
                    </Text>
                    <View style={{ height: 6, backgroundColor: `${theme.primary}20`, borderRadius: 3, overflow: "hidden" }}>
                      <View
                        style={{
                          height: "100%",
                          width: "48%",
                          backgroundColor: theme.success,
                          borderRadius: 3,
                        }}
                      />
                    </View>
                    <Text className="text-xs font-mono mt-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Uso: 48%
                    </Text>
                  </View>

                  <View>
                    <Text className="text-xs font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Armazenamento
                    </Text>
                    <Text className="text-sm font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.storage}
                    </Text>
                    <View style={{ height: 6, backgroundColor: `${theme.primary}20`, borderRadius: 3, overflow: "hidden" }}>
                      <View
                        style={{
                          height: "100%",
                          width: "72%",
                          backgroundColor: theme.warning,
                          borderRadius: 3,
                        }}
                      />
                    </View>
                    <Text className="text-xs font-mono mt-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Uso: 72%
                    </Text>
                  </View>
                </View>
              </View>

              {/* System Stats */}
              <View className="mb-6 p-4 border rounded-lg" style={{ borderColor: `${theme.primary}50`, backgroundColor: `${theme.primary}10` }}>
                <Text
                  className="text-base font-bold font-mono mb-4"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.primary,
                    textShadowColor: theme.primary,
                    textShadowRadius: 8,
                  }}
                >
                  ESTATÍSTICAS
                </Text>
                <View className="gap-3">
                  <View className="flex-row justify-between">
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Tempo de atividade:
                    </Text>
                    <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.primary }}>
                      {sysInfo.uptime}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Refresh Button */}
              <Pressable
                onPress={loadSystemInfo}
                disabled={loading}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.8 : 1,
                  borderColor: theme.primary,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: loading ? `${theme.primary}20` : "transparent",
                })}
              >
                <Text
                  className="text-center font-mono font-bold"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.primary,
                  }}
                >
                  {loading ? "ATUALIZANDO..." : "ATUALIZAR"}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
