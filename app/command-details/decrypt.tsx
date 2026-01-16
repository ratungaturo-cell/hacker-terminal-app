import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

interface File {
  name: string;
  size: string;
  encrypted: boolean;
  progress: number;
}

export default function DecryptFilesDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [decrypting, setDecrypting] = useState(false);
  const [files, setFiles] = useState<File[]>([
    { name: "database.sql.enc", size: "2.5 MB", encrypted: true, progress: 0 },
    { name: "config.json.enc", size: "156 KB", encrypted: true, progress: 0 },
    { name: "backup.zip.enc", size: "45.3 MB", encrypted: true, progress: 0 },
  ]);
  const [overallProgress, setOverallProgress] = useState(0);

  const startDecryption = () => {
    setDecrypting(true);
    playSound('click');

    let completedFiles = 0;
    const fileDecryptIntervals = files.map((file, index) => {
      return setInterval(() => {
        setFiles((prev) => {
          const updated = [...prev];
          if (updated[index].progress < 100) {
            updated[index].progress += Math.random() * 20;
            if (updated[index].progress >= 100) {
              updated[index].progress = 100;
              updated[index].encrypted = false;
              completedFiles++;
              
              if (completedFiles === files.length) {
                playSound('success');
                setDecrypting(false);
              }
            }
          }
          return updated;
        });

        const avg = files.reduce((sum, f) => sum + f.progress, 0) / files.length;
        setOverallProgress(Math.min(avg, 100));
      }, 400);
    });

    return () => {
      fileDecryptIntervals.forEach((interval) => clearInterval(interval));
    };
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
                ← {t.terminal.commands.decrypt.title}
              </Text>
            </Pressable>
          </View>

          {/* Overall Progress */}
          <View className="mb-6 p-4 border rounded-lg" style={{ borderColor: `${theme.primary}50`, backgroundColor: `${theme.primary}10` }}>
            <Text className="text-sm font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
              Status: {decrypting ? "DECRIPTANDO..." : "COMPLETO"}
            </Text>
            <View style={{ height: 8, backgroundColor: `${theme.primary}20`, borderRadius: 4, overflow: "hidden" }}>
              <View
                style={{
                  height: "100%",
                  width: `${overallProgress}%`,
                  backgroundColor: theme.primary,
                  borderRadius: 4,
                }}
              />
            </View>
            <Text className="text-xs font-mono mt-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
              {Math.round(overallProgress)}% - Algoritmo: AES-256
            </Text>
          </View>

          {/* Files List */}
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
              ARQUIVOS
            </Text>
            <View className="gap-3">
              {files.map((file, index) => (
                <View
                  key={index}
                  className="p-4 border rounded-lg"
                  style={{
                    borderColor: file.encrypted ? `${theme.error}80` : `${theme.success}80`,
                    backgroundColor: file.encrypted ? `${theme.error}10` : `${theme.success}10`,
                  }}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text
                      className="text-base font-bold font-mono flex-1"
                      style={{
                        fontFamily: 'monospace',
                        color: file.encrypted ? theme.error : theme.success,
                      }}
                    >
                      {file.name}
                    </Text>
                    <Text
                      className="text-xs font-mono"
                      style={{
                        fontFamily: 'monospace',
                        color: file.encrypted ? theme.error : theme.success,
                      }}
                    >
                      {file.encrypted ? "🔒" : "🔓"}
                    </Text>
                  </View>
                  <Text className="text-xs font-mono mb-2" style={{ fontFamily: 'monospace', color: theme.muted }}>
                    Tamanho: {file.size}
                  </Text>
                  <View style={{ height: 6, backgroundColor: `${theme.primary}20`, borderRadius: 3, overflow: "hidden" }}>
                    <View
                      style={{
                        height: "100%",
                        width: `${file.progress}%`,
                        backgroundColor: file.encrypted ? theme.warning : theme.success,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                  <Text className="text-xs font-mono mt-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                    {Math.round(file.progress)}%
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Decrypt Button */}
          <Pressable
            onPress={startDecryption}
            disabled={decrypting}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              backgroundColor: decrypting ? `${theme.primary}20` : "transparent",
            })}
          >
            <Text
              className="text-center font-mono font-bold"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              {decrypting ? "DECRIPTANDO..." : "INICIAR DECRIPTAÇÃO"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
