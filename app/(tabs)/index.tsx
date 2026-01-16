import { useState, useEffect } from "react";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { ScreenContainer } from "@/components/screen-container";
import { CommandCard } from "@/components/command-card";
import { ConsoleOutput } from "@/components/console-output";
import { StatusIndicator } from "@/components/status-indicator";
import { useColors } from "@/hooks/use-colors";

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
  const [username, setUsername] = useState("root");
  const [consoleLines, setConsoleLines] = useState<string[]>([
    "> System initialized...",
    "> Welcome to Hacker Terminal v1.0.0",
    "> Type a command to begin",
  ]);
  const [commands, setCommands] = useState<Command[]>([
    {
      id: "scan",
      icon: "📡",
      title: "SCAN NETWORK",
      description: "Discover devices on local network",
      status: "ready",
      output: [
        "> Initializing network scan...",
        "> Scanning subnet 192.168.1.0/24",
        "> Found device: 192.168.1.1 (Router)",
        "> Found device: 192.168.1.105 (Phone)",
        "> Found device: 192.168.1.142 (Laptop)",
        "[SUCCESS] Scan complete - 3 devices found",
      ],
    },
    {
      id: "decrypt",
      icon: "🔓",
      title: "DECRYPT FILES",
      description: "Decrypt encrypted data files",
      status: "ready",
      output: [
        "> Loading encrypted files...",
        "> Attempting decryption with AES-256",
        "> Progress: 25%",
        "> Progress: 50%",
        "> Progress: 75%",
        "> Progress: 100%",
        "[SUCCESS] Files decrypted successfully",
      ],
    },
    {
      id: "firewall",
      icon: "🛡️",
      title: "BREACH FIREWALL",
      description: "Penetrate security firewall",
      status: "ready",
      output: [
        "> Analyzing firewall configuration...",
        "> Searching for vulnerabilities...",
        "> Exploit found: CVE-2024-1337",
        "> Injecting payload...",
        "> Bypassing authentication...",
        "[SUCCESS] Firewall breached",
      ],
    },
    {
      id: "database",
      icon: "💾",
      title: "ACCESS DATABASE",
      description: "Query remote database",
      status: "ready",
      output: [
        "> Connecting to database server...",
        "> SELECT * FROM users WHERE admin=1",
        "> ID: 1 | User: admin | Level: 10",
        "> ID: 7 | User: sysadmin | Level: 9",
        "> ID: 23 | User: root | Level: 10",
        "[SUCCESS] Query executed - 3 results",
      ],
    },
    {
      id: "trace",
      icon: "🌍",
      title: "TRACE IP",
      description: "Geolocate IP address",
      status: "ready",
      output: [
        "> Tracing IP: 203.0.113.42",
        "> Resolving geolocation...",
        "> Country: United States",
        "> City: San Francisco, CA",
        "> ISP: CloudNet Systems",
        "[SUCCESS] Trace complete",
      ],
    },
    {
      id: "sysinfo",
      icon: "⚙️",
      title: "SYSTEM INFO",
      description: "Display system information",
      status: "ready",
      output: [
        "> Gathering system information...",
        `> OS: ${Platform.OS}`,
        `> Platform: ${Platform.Version}`,
        "> CPU: 8 cores @ 2.4GHz",
        "> RAM: 8GB",
        "> Storage: 256GB SSD",
        "[SUCCESS] System info retrieved",
      ],
    },
  ]);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    const storedUsername = await AsyncStorage.getItem("username");
    
    if (!isLoggedIn) {
      router.replace("/login");
    } else if (storedUsername) {
      setUsername(storedUsername);
    }
  };

  const handleLogout = async () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    await AsyncStorage.removeItem("isLoggedIn");
    await AsyncStorage.removeItem("username");
    router.replace("/login");
  };

  const executeCommand = (commandId: string) => {
    const command = commands.find((cmd) => cmd.id === commandId);
    if (!command || command.status === "running") return;

    // Update command status to running
    setCommands((prev) =>
      prev.map((cmd) =>
        cmd.id === commandId ? { ...cmd, status: "running" } : cmd
      )
    );

    // Add initial console output
    setConsoleLines((prev) => [...prev, `> Executing ${command.title}...`]);

    // Simulate command execution with progressive output
    let lineIndex = 0;
    const interval = setInterval(() => {
      if (lineIndex < command.output.length) {
        setConsoleLines((prev) => [...prev, command.output[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(interval);
        // Mark command as complete
        setCommands((prev) =>
          prev.map((cmd) =>
            cmd.id === commandId ? { ...cmd, status: "complete" } : cmd
          )
        );
      }
    }, 400);
  };

  return (
    <ScreenContainer className="bg-black">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 p-4">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-6 pb-4 border-b border-primary/30">
            <View>
              <Text
                className="text-xl font-bold text-primary mb-1"
                style={{
                  fontFamily: 'monospace',
                  textShadowColor: colors.primary,
                  textShadowRadius: 10,
                }}
              >
                {username}@hacker:~$
              </Text>
              <StatusIndicator status="online" />
            </View>
            <Pressable
              onPress={handleLogout}
              style={({ pressed }) => [
                {
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              className="border border-error/50 bg-error/10 rounded-lg px-4 py-2"
            >
              <Text
                className="text-error text-sm font-mono font-bold"
                style={{ fontFamily: 'monospace' }}
              >
                LOGOUT
              </Text>
            </Pressable>
          </View>

          {/* Commands Section */}
          <View className="mb-6">
            <Text
              className="text-primary text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: 'monospace',
                textShadowColor: colors.primary,
                textShadowRadius: 8,
              }}
            >
              AVAILABLE COMMANDS
            </Text>
            {commands.map((command) => (
              <CommandCard
                key={command.id}
                icon={command.icon}
                title={command.title}
                description={command.description}
                status={command.status}
                onPress={() => executeCommand(command.id)}
              />
            ))}
          </View>

          {/* Console Output */}
          <View className="mb-6">
            <Text
              className="text-primary text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: 'monospace',
                textShadowColor: colors.primary,
                textShadowRadius: 8,
              }}
            >
              CONSOLE OUTPUT
            </Text>
            <ConsoleOutput lines={consoleLines} />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
