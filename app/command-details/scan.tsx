import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";
import * as Haptics from "expo-haptics";

interface Device {
  ip: string;
  name: string;
  type: string;
  signal: number;
  status: "online" | "offline";
}

export default function ScanNetworkDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    startScan();
  }, []);

  const startScan = () => {
    setScanning(true);
    setDevices([]);
    setProgress(0);
    playSound('click');

    // Simular scan progressivo
    let currentProgress = 0;
    const scanInterval = setInterval(() => {
      currentProgress += Math.random() * 25;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(scanInterval);
        
        // Adicionar dispositivos encontrados
        const foundDevices: Device[] = [
          { ip: "192.168.1.1", name: "Roteador", type: "Router", signal: 95, status: "online" },
          { ip: "192.168.1.105", name: "Smartphone", type: "Mobile", signal: 87, status: "online" },
          { ip: "192.168.1.142", name: "Notebook", type: "Computer", signal: 92, status: "online" },
          { ip: "192.168.1.200", name: "Smart TV", type: "Device", signal: 78, status: "online" },
          { ip: "192.168.1.250", name: "Impressora", type: "Printer", signal: 65, status: "offline" },
        ];
        
        setDevices(foundDevices);
        playSound('success');
        setScanning(false);
      } else {
        setProgress(currentProgress);
      }
    }, 300);
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
                ← {t.terminal.commands.scan.title}
              </Text>
            </Pressable>
          </View>

          {/* Scan Status */}
          <View className="mb-6 p-4 border rounded-lg" style={{ borderColor: `${theme.primary}50`, backgroundColor: `${theme.primary}10` }}>
            <Text className="text-sm font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
              Status: {scanning ? "ESCANEANDO..." : "COMPLETO"}
            </Text>
            <View style={{ height: 8, backgroundColor: `${theme.primary}20`, borderRadius: 4, overflow: "hidden" }}>
              <View
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  backgroundColor: theme.primary,
                  borderRadius: 4,
                }}
              />
            </View>
            <Text className="text-xs font-mono mt-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
              {Math.round(progress)}% - {devices.length} dispositivos encontrados
            </Text>
          </View>

          {/* Devices List */}
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
              DISPOSITIVOS DETECTADOS
            </Text>
            {devices.length === 0 ? (
              <Text className="text-sm font-mono text-center py-8" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {scanning ? "Procurando dispositivos..." : "Nenhum dispositivo encontrado"}
              </Text>
            ) : (
              <View className="gap-3">
                {devices.map((device, index) => (
                  <View
                    key={index}
                    className="p-4 border rounded-lg"
                    style={{
                      borderColor: device.status === "online" ? `${theme.success}80` : `${theme.error}80`,
                      backgroundColor: device.status === "online" ? `${theme.success}10` : `${theme.error}10`,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text
                        className="text-base font-bold font-mono"
                        style={{
                          fontFamily: 'monospace',
                          color: device.status === "online" ? theme.success : theme.error,
                        }}
                      >
                        {device.name}
                      </Text>
                      <Text
                        className="text-xs font-mono"
                        style={{
                          fontFamily: 'monospace',
                          color: device.status === "online" ? theme.success : theme.error,
                        }}
                      >
                        {device.status === "online" ? "● ONLINE" : "○ OFFLINE"}
                      </Text>
                    </View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      IP: {device.ip}
                    </Text>
                    <Text className="text-xs font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Tipo: {device.type}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-xs font-mono mr-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                        Sinal:
                      </Text>
                      <View style={{ height: 6, width: 100, backgroundColor: `${theme.primary}20`, borderRadius: 3, overflow: "hidden" }}>
                        <View
                          style={{
                            height: "100%",
                            width: `${device.signal}%`,
                            backgroundColor: device.signal > 70 ? theme.success : device.signal > 40 ? theme.warning : theme.error,
                            borderRadius: 3,
                          }}
                        />
                      </View>
                      <Text className="text-xs font-mono ml-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                        {device.signal}%
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Rescan Button */}
          <Pressable
            onPress={startScan}
            disabled={scanning}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              backgroundColor: scanning ? `${theme.primary}20` : "transparent",
            })}
          >
            <Text
              className="text-center font-mono font-bold"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              {scanning ? "ESCANEANDO..." : "ESCANEAR NOVAMENTE"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
