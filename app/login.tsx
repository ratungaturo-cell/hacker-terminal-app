import { useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenContainer } from "@/components/screen-container";
import { HackerInput } from "@/components/hacker-input";
import { NeonButton } from "@/components/neon-button";

export default function LoginScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    
    if (!username || !password) {
      setError("ACCESS DENIED: CREDENTIALS REQUIRED");
      return;
    }

    setLoading(true);
    
    // Simulate authentication delay
    setTimeout(async () => {
      // Simple validation - accept any non-empty credentials
      if (username.length > 0 && password.length > 0) {
        await AsyncStorage.setItem("isLoggedIn", "true");
        await AsyncStorage.setItem("username", username);
        setLoading(false);
        router.replace("/(tabs)");
      } else {
        setError("ACCESS DENIED: INVALID CREDENTIALS");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <ScreenContainer className="bg-black">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 justify-center px-6 py-8">
            {/* Logo */}
            <View className="items-center mb-12">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 120, height: 120 }}
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <View className="items-center mb-8">
              <Text
                className="text-3xl font-bold text-primary mb-2"
                style={{
                  fontFamily: 'monospace',
                  textShadowColor: '#00ff41',
                  textShadowRadius: 20,
                }}
              >
                HACKER TERMINAL
              </Text>
              <Text className="text-muted text-sm font-mono" style={{ fontFamily: 'monospace' }}>
                v1.0.0 - SECURE ACCESS REQUIRED
              </Text>
            </View>

            {/* Login Form */}
            <View className="gap-4 mb-6">
              <HackerInput
                prefix="root@"
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <HackerInput
                prefix="pass:"
                placeholder="********"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
            </View>

            {/* Error Message */}
            {error ? (
              <View className="mb-4 border border-error/50 bg-error/10 rounded-lg p-3">
                <Text
                  className="text-error text-center font-mono text-sm"
                  style={{
                    fontFamily: 'monospace',
                    textShadowColor: '#ff0055',
                    textShadowRadius: 10,
                  }}
                >
                  {error}
                </Text>
              </View>
            ) : null}

            {/* Login Button */}
            <NeonButton
              title={loading ? "AUTHENTICATING..." : "ACCESS GRANTED"}
              onPress={handleLogin}
              disabled={loading}
            />

            {/* Footer */}
            <View className="items-center mt-8">
              <Text className="text-muted text-xs font-mono" style={{ fontFamily: 'monospace' }}>
                UNAUTHORIZED ACCESS IS PROHIBITED
              </Text>
              <Text className="text-muted text-xs font-mono mt-1" style={{ fontFamily: 'monospace' }}>
                ALL ACTIVITIES ARE MONITORED
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
