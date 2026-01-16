import { useState } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

interface FirewallLayer {
  name: string;
  status: "protected" | "vulnerable" | "breached";
  exploits: string[];
}

export default function BreachFirewallDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [breaching, setBreaching] = useState(false);
  const [layers, setLayers] = useState<FirewallLayer[]>([
    {
      name: "Camada 1: Filtro de Pacotes",
      status: "protected",
      exploits: ["Buffer Overflow", "Port Scanning"],
    },
    {
      name: "Camada 2: Proxy",
      status: "protected",
      exploits: ["HTTP Tunneling", "SOCKS Proxy"],
    },
    {
      name: "Camada 3: Detecção de Intrusão",
      status: "protected",
      exploits: ["Evasão de IDS", "Fragmentação"],
    },
    {
      name: "Camada 4: Autenticação",
      status: "protected",
      exploits: ["SQL Injection", "Brute Force"],
    },
  ]);
  const [breachedCount, setBreachedCount] = useState(0);

  const startBreach = () => {
    setBreaching(true);
    playSound('click');
    setBreachedCount(0);

    let currentLayer = 0;
    const breachInterval = setInterval(() => {
      if (currentLayer < layers.length) {
        setLayers((prev) => {
          const updated = [...prev];
          updated[currentLayer].status = "breached";
          return updated;
        });
        setBreachedCount(currentLayer + 1);
        currentLayer++;
      } else {
        clearInterval(breachInterval);
        playSound('success');
        setBreaching(false);
      }
    }, 600);
  };

  const getStatusColor = (status: FirewallLayer["status"]) => {
    switch (status) {
      case "protected":
        return theme.error;
      case "vulnerable":
        return theme.warning;
      case "breached":
        return theme.success;
    }
  };

  const getStatusText = (status: FirewallLayer["status"]) => {
    switch (status) {
      case "protected":
        return "PROTEGIDO";
      case "vulnerable":
        return "VULNERÁVEL";
      case "breached":
        return "QUEBRADO";
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
                ← {t.terminal.commands.firewall.title}
              </Text>
            </Pressable>
          </View>

          {/* Status */}
          <View className="mb-6 p-4 border rounded-lg" style={{ borderColor: `${theme.primary}50`, backgroundColor: `${theme.primary}10` }}>
            <Text className="text-sm font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
              Status: {breaching ? "PENETRANDO..." : "CONCLUÍDO"}
            </Text>
            <View style={{ height: 8, backgroundColor: `${theme.primary}20`, borderRadius: 4, overflow: "hidden" }}>
              <View
                style={{
                  height: "100%",
                  width: `${(breachedCount / layers.length) * 100}%`,
                  backgroundColor: theme.primary,
                  borderRadius: 4,
                }}
              />
            </View>
            <Text className="text-xs font-mono mt-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
              {breachedCount}/{layers.length} camadas quebradas
            </Text>
          </View>

          {/* Firewall Layers */}
          <View className="mb-6">
            <Text
              className="text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
                textShadowColor: theme.primary,
                textShadowRadius: 8,
              }}
            >
              CAMADAS DO FIREWALL
            </Text>
            <View className="gap-3">
              {layers.map((layer, index) => (
                <View
                  key={index}
                  className="p-4 border rounded-lg"
                  style={{
                    borderColor: `${getStatusColor(layer.status)}80`,
                    backgroundColor: `${getStatusColor(layer.status)}10`,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text
                      className="text-base font-bold font-mono flex-1"
                      style={{
                        fontFamily: 'monospace',
                        color: getStatusColor(layer.status),
                      }}
                    >
                      {layer.name}
                    </Text>
                    <Text
                      className="text-xs font-mono"
                      style={{
                        fontFamily: 'monospace',
                        color: getStatusColor(layer.status),
                      }}
                    >
                      {getStatusText(layer.status)}
                    </Text>
                  </View>
                  <Text className="text-xs font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                    Exploits disponíveis:
                  </Text>
                  <View className="flex-row flex-wrap gap-2">
                    {layer.exploits.map((exploit, i) => (
                      <View
                        key={i}
                        style={{
                          backgroundColor: `${getStatusColor(layer.status)}30`,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          borderRadius: 4,
                          borderColor: getStatusColor(layer.status),
                          borderWidth: 1,
                        }}
                      >
                        <Text
                          className="text-xs font-mono"
                          style={{
                            fontFamily: 'monospace',
                            color: getStatusColor(layer.status),
                          }}
                        >
                          {exploit}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Breach Button */}
          <Pressable
            onPress={startBreach}
            disabled={breaching}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              backgroundColor: breaching ? `${theme.primary}20` : "transparent",
            })}
          >
            <Text
              className="text-center font-mono font-bold"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              {breaching ? "PENETRANDO..." : "INICIAR ATAQUE"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
