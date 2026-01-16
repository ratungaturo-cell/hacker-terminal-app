import { useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { HackerInput } from "@/components/hacker-input";
import { NeonButton } from "@/components/neon-button";
import { registerUser } from "@/lib/auth-service";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";

export default function SignUpScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async () => {
    setError("");
    setSuccess("");

    if (!username || !email || !password || !confirmPassword) {
      setError(t.signup.allFieldsRequired);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.signup.passwordsMismatch);
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      const result = await registerUser(username, email, password);

      if (result.success) {
        setSuccess(t.signup.accountCreated);
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      } else {
        setError(result.message || "Registration failed");
      }

      setLoading(false);
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
            <View className="items-center mb-8">
              <Image
                source={require("@/assets/images/icon.png")}
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
              />
            </View>

            {/* Title */}
            <View className="items-center mb-6">
              <Text
                className="text-2xl font-bold mb-2"
                style={{
                  fontFamily: 'monospace',
                  color: theme.primary,
                  textShadowColor: theme.primary,
                  textShadowRadius: 20,
                }}
              >
                {t.signup.title}
              </Text>
              <Text className="text-xs font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {t.signup.subtitle}
              </Text>
            </View>

            {/* Registration Form */}
            <View className="gap-3 mb-4">
              <HackerInput
                prefix="user:"
                placeholder={t.signup.username}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <HackerInput
                prefix="mail:"
                placeholder={t.signup.email}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={!loading}
              />

              <HackerInput
                prefix="pass:"
                placeholder={t.signup.password}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <HackerInput
                prefix="conf:"
                placeholder={t.signup.confirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                returnKeyType="done"
                onSubmitEditing={handleSignUp}
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

            {/* Success Message */}
            {success ? (
              <View className="mb-4 border rounded-lg p-3" style={{ borderColor: `${theme.success}80`, backgroundColor: `${theme.success}20` }}>
                <Text
                  className="text-center font-mono text-sm"
                  style={{
                    fontFamily: 'monospace',
                    color: theme.success,
                    textShadowColor: theme.success,
                    textShadowRadius: 10,
                  }}
                >
                  {success}
                </Text>
              </View>
            ) : null}

            {/* Sign Up Button */}
            <NeonButton
              title={loading ? t.signup.creating : t.signup.button}
              onPress={handleSignUp}
              disabled={loading}
              className="mb-4"
            />

            {/* Login Link */}
            <View className="items-center">
              <Text className="text-sm font-mono" style={{ fontFamily: 'monospace', color: theme.muted }}>
                {t.signup.alreadyHaveAccount}
              </Text>
              <Pressable
                onPress={() => router.replace("/login")}
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
                  {t.signup.loginHere}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
