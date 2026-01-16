import { useState } from "react";
import { ScrollView, Text, View, Pressable, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

interface DatabaseRecord {
  id: number;
  username: string;
  email: string;
  level: number;
  lastAccess: string;
}

export default function AccessDatabaseDetailsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [query, setQuery] = useState("SELECT * FROM users WHERE admin=1");
  const [results, setResults] = useState<DatabaseRecord[]>([]);
  const [executing, setExecuting] = useState(false);

  const executeQuery = () => {
    if (!query.trim()) return;
    
    setExecuting(true);
    playSound('click');

    setTimeout(() => {
      // Simular resultados da query
      const mockResults: DatabaseRecord[] = [
        { id: 1, username: "admin", email: "admin@system.local", level: 10, lastAccess: "2024-01-16 13:20" },
        { id: 7, username: "sysadmin", email: "sysadmin@system.local", level: 9, lastAccess: "2024-01-16 12:45" },
        { id: 23, username: "root", email: "root@system.local", level: 10, lastAccess: "2024-01-16 11:30" },
      ];
      
      setResults(mockResults);
      playSound('success');
      setExecuting(false);
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
                ← {t.terminal.commands.database.title}
              </Text>
            </Pressable>
          </View>

          {/* Query Input */}
          <View className="mb-6">
            <Text
              className="text-sm font-mono mb-2"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              SQL QUERY
            </Text>
            <TextInput
              value={query}
              onChangeText={setQuery}
              editable={!executing}
              multiline
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
                backgroundColor: theme.surface,
                borderColor: theme.primary,
                borderWidth: 1,
                borderRadius: 8,
                padding: 12,
                minHeight: 100,
                fontSize: 12,
              }}
              placeholderTextColor={theme.muted}
            />
          </View>

          {/* Execute Button */}
          <Pressable
            onPress={executeQuery}
            disabled={executing || !query.trim()}
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
              borderColor: theme.primary,
              borderWidth: 1,
              borderRadius: 8,
              padding: 12,
              marginBottom: 24,
              backgroundColor: executing ? `${theme.primary}20` : "transparent",
            })}
          >
            <Text
              className="text-center font-mono font-bold"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
              }}
            >
              {executing ? "EXECUTANDO..." : "EXECUTAR QUERY"}
            </Text>
          </Pressable>

          {/* Results */}
          {results.length > 0 && (
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
                RESULTADOS ({results.length})
              </Text>
              <View className="gap-3">
                {results.map((record, index) => (
                  <View
                    key={index}
                    className="p-4 border rounded-lg"
                    style={{
                      borderColor: `${theme.primary}50`,
                      backgroundColor: `${theme.primary}10`,
                    }}
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <Text
                        className="text-sm font-bold font-mono"
                        style={{
                          fontFamily: 'monospace',
                          color: theme.primary,
                        }}
                      >
                        ID: {record.id}
                      </Text>
                      <View
                        style={{
                          backgroundColor: record.level >= 9 ? theme.error : theme.warning,
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
                          NÍVEL {record.level}
                        </Text>
                      </View>
                    </View>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Usuário: {record.username}
                    </Text>
                    <Text className="text-xs font-mono mb-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Email: {record.email}
                    </Text>
                    <Text className="text-xs font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                      Último acesso: {record.lastAccess}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
