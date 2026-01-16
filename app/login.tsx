import { useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { HackerInput } from "@/components/hacker-input";
import { NeonButton } from "@/components/neon-button";
import { loginUser } from "@/lib/auth-service";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";

export default function LoginScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!username || !password) {
      setError(t.login.credentialsRequired);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const result = await loginUser(username, password);

      if (result.success) {
        setLoading(false);
        router.replace("/(tabs)");
      } else {
        setError(result.message || t.login.invalidCredentials);
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
                className="text-3xl font-bold mb-2"
                style={{
                  fontFamily: 'monospace',
                  color: theme.primary,
                  textShadowColor: theme.primary,
                  textShadowRadius: 20,
                }}
              >
                {t.login.title}
              </Text>
              <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {t.login.subtitle}
              </Text>
            </View>

            {/* Login Form */}
            <View className="gap-4 mb-6">
              <HackerInput
                prefix="root@"
                placeholder={t.login.username}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <HackerInput
                prefix="pass:"
                placeholder={t.login.password}
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
              <View className="mb-4 border rounded-lg p-3" style={{ borderColor: `${theme.error}80`, backgroundColor: `${theme.error}20` }}>
                <Text
                  className="text-center font-mono text-sm"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.error,
                    textShadowColor: theme.error,
                    textShadowRadius: 10,
                  }}
                >
                  {error}
                </Text>
              </View>
            ) : null}

            {/* Login Button */}
            <NeonButton
              title={loading ? t.login.authenticating : t.login.button}
              onPress={handleLogin}
              disabled={loading}
              className="mb-6"
            />

            {/* Sign Up Link */}
            <View className="items-center">
              <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {t.login.newToNetwork}
              </Text>
              <Pressable
                onPress={() => router.replace("/signup")}
                disabled={loading}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text
                  className="text-sm font-mono font-bold mt-2"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.primary,
                    textShadowColor: theme.primary,
                    textShadowRadius: 8,
                  }}
                >
                  {t.login.createAccount}
                </Text>
              </Pressable>
            </View>

            {/* Footer */}
            <View className="items-center mt-8">
              <Text className="text-xs font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {t.login.unauthorized}
              </Text>
              <Text className="text-xs font-mono mt-1" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {t.login.monitored}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
