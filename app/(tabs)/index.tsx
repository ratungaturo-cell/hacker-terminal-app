import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { getCurrentUser, logoutUser } from "@/lib/auth-service";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { CommandCard } from "@/components/command-card";
import { ConsoleOutput } from "@/components/console-output";
import { StatusIndicator } from "@/components/status-indicator";
import { useColors } from "@/hooks/use-colors";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";

interface Command {
  id: string;
  icon: string;
  title: string;
  description: string;
  status: "ready" | "running" | "complete";
  output: string[];
}

export default function TerminalScreen() {
  const router = useRouter();
  const colors = useColors();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const { playSound } = useSound();
  const [username, setUsername] = useState("root");
  const [userEmail, setUserEmail] = useState("");
  const [consoleLines, setConsoleLines] = useState<string[]>([]);
  const MAX_CONSOLE_LINES = 8;
  const [commands, setCommands] = useState<Command[]>([
    {
      id: "scan",
      icon: "📡",
      title: t.terminal.commands.scan.title,
      description: t.terminal.commands.scan.description,
      status: "ready",
      output: [
        "> Inicializando scan de rede...",
        "> Escaneando subnet 192.168.1.0/24",
        "> Dispositivo encontrado: 192.168.1.1 (Roteador)",
        "> Dispositivo encontrado: 192.168.1.105 (Telefone)",
        "> Dispositivo encontrado: 192.168.1.142 (Notebook)",
        "[SUCCESS] Scan completo - 3 dispositivos encontrados",
      ],
    },
    {
      id: "decrypt",
      icon: "🔓",
      title: t.terminal.commands.decrypt.title,
      description: t.terminal.commands.decrypt.description,
      status: "ready",
      output: [
        "> Carregando arquivos criptografados...",
        "> Tentando decriptação com AES-256",
        "> Progresso: 25%",
        "> Progresso: 50%",
        "> Progresso: 75%",
        "> Progresso: 100%",
        "[SUCCESS] Arquivos decriptados com sucesso",
      ],
    },
    {
      id: "firewall",
      icon: "🛡️",
      title: t.terminal.commands.firewall.title,
      description: t.terminal.commands.firewall.description,
      status: "ready",
      output: [
        "> Analisando configuração do firewall...",
        "> Procurando por vulnerabilidades...",
        "> Exploit encontrado: CVE-2024-1337",
        "> Injetando payload...",
        "> Contornando autenticação...",
        "[SUCCESS] Firewall quebrado",
      ],
    },
    {
      id: "database",
      icon: "💾",
      title: t.terminal.commands.database.title,
      description: t.terminal.commands.database.description,
      status: "ready",
      output: [
        "> Conectando ao servidor de banco de dados...",
        "> SELECT * FROM users WHERE admin=1",
        "> ID: 1 | Usuário: admin | Nível: 10",
        "> ID: 7 | Usuário: sysadmin | Nível: 9",
        "> ID: 23 | Usuário: root | Nível: 10",
        "[SUCCESS] Consulta executada - 3 resultados",
      ],
    },
    {
      id: "trace",
      icon: "🌍",
      title: t.terminal.commands.trace.title,
      description: t.terminal.commands.trace.description,
      status: "ready",
      output: [
        "> Rastreando IP: 203.0.113.42",
        "> Resolvendo geolocalização...",
        "> País: Brasil",
        "> Cidade: São Paulo, SP",
        "> ISP: CloudNet Systems",
        "[SUCCESS] Rastreamento completo",
      ],
    },
    {
      id: "sysinfo",
      icon: "⚙️",
      title: t.terminal.commands.sysinfo.title,
      description: t.terminal.commands.sysinfo.description,
      status: "ready",
      output: [
        "> Coletando informações do sistema...",
        `> SO: ${Platform.OS}`,
        `> Plataforma: ${Platform.Version}`,
        "> CPU: 8 núcleos @ 2.4GHz",
        "> RAM: 8GB",
        "> Armazenamento: 256GB SSD",
        "[SUCCESS] Informações do sistema recuperadas",
      ],
    },
  ]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const user = await getCurrentUser();
    if (!user) {
      router.replace("/login");
    } else {
      setUsername(user.username);
      setUserEmail(user.email);
    }
  };

  const handleLogout = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await logoutUser();
    router.replace("/login");
  };

  const executeCommand = (commandId: string) => {
    const command = commands.find((cmd) => cmd.id === commandId);
    if (!command || command.status === "running") return;

    playSound("click");

    setCommands((prev) =>
      prev.map((cmd) =>
        cmd.id === commandId ? { ...cmd, status: "running" } : cmd
      )
    );

    setConsoleLines((prev) => {
      const updated = [...prev, `${t.terminal.executing} ${command.title}...`];
      return updated.slice(-MAX_CONSOLE_LINES);
    });

    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < command.output.length) {
        const line = command.output[lineIndex];
        if (typeof line === "string" && line.length > 0) {
          setConsoleLines((prev) => {
            const updated = [...prev, line];
            return updated.slice(-MAX_CONSOLE_LINES);
          });
        }
        lineIndex++;
      } else {
        clearInterval(interval);
        playSound("success");
        setCommands((prev) =>
          prev.map((cmd) =>
            cmd.id === commandId ? { ...cmd, status: "complete" } : cmd
          )
        );
      }
    }, 400);
  };

  const handleCommandPress = (commandId: string) => {
    playSound("click");
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    // Navegar para tela de detalhes
    switch (commandId) {
      case "scan":
        router.push("/command-details/scan");
        break;
      case "decrypt":
        router.push("/command-details/decrypt");
        break;
      case "firewall":
        router.push("/command-details/firewall");
        break;
      case "database":
        router.push("/command-details/database");
        break;
      case "trace":
        router.push("/command-details/trace");
        break;
      case "sysinfo":
        router.push("/command-details/sysinfo");
        break;
    }
  };

  return (
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6 pb-4" style={{ borderBottomColor: `${theme.primary}50`, borderBottomWidth: 1 }}>
            <View className="flex-1">
              <Text
                className="text-xl font-bold mb-1"
                style={{
                  fontFamily: "monospace",
                  color: theme.primary,
                  textShadowColor: theme.primary,
                  textShadowRadius: 10,
                }}
              >
                {username}@hacker:~$
              </Text>
              <Text className="text-xs font-mono mb-2" style={{ fontFamily: "monospace", color: theme.muted }}>
                {userEmail}
              </Text>
              <StatusIndicator status="online" />
            </View>
            <Pressable
              onPress={() => {
                playSound("click");
                router.push("/settings");
              }}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                borderColor: theme.primary + "80",
                backgroundColor: theme.primary + "20",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 12,
                paddingVertical: 8,
                marginRight: 8,
              })}
            >
              <Text
                className="text-sm font-mono font-bold"
                style={{ fontFamily: "monospace", color: theme.primary }}
              >
                ⚙️
              </Text>
            </Pressable>
            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => ({
                opacity: pressed ? 0.7 : 1,
                borderColor: theme.error + "80",
                backgroundColor: theme.error + "20",
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 16,
                paddingVertical: 8,
              })}
            >
              <Text
                className="text-sm font-mono font-bold"
                style={{ fontFamily: "monospace", color: theme.error }}
              >
                {t.terminal.logout}
              </Text>
            </Pressable>
          </View>

          {/* Commands Section */}
          <View className="mb-6">
            <Text
              className="text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: "monospace",
                color: theme.primary,
                textShadowColor: theme.primary,
                textShadowRadius: 8,
              }}
            >
              {t.terminal.availableCommands}
            </Text>
            {commands.map((command) => (
              <CommandCard
                key={command.id}
                icon={command.icon}
                title={command.title}
                description={command.description}
                status={command.status}
                onPress={() => handleCommandPress(command.id)}
              />
            ))}
          </View>

          {/* Console Output */}
          <View className="mb-6">
            <Text
              className="text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: "monospace",
                color: theme.primary,
                textShadowColor: theme.primary,
                textShadowRadius: 8,
              }}
            >
              {t.terminal.consoleOutput}
            </Text>
            <ConsoleOutput lines={consoleLines} />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
