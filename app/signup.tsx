import { useState } from "react";
import { View, Text, Image, KeyboardAvoidingView, Platform, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { HackerInput } from "@/components/hacker-input";
import { NeonButton } from "@/components/neon-button";
import { registerUser } from "@/lib/auth-service";

export default function SignUpScreen() {
  const router = useRouter();
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

    // Validate inputs
    if (!username || !email || !password || !confirmPassword) {
      setError("ALL FIELDS REQUIRED");
      return;
    }

    if (password !== confirmPassword) {
      setError("PASSWORDS DO NOT MATCH");
      return;
    }

    setLoading(true);

    // Simulate registration delay
    setTimeout(async () => {
      const result = await registerUser(username, email, password);

      if (result.success) {
        setSuccess("ACCOUNT CREATED SUCCESSFULLY");
        setTimeout(() => {
          router.replace("/login");
        }, 1500);
      } else {
        setError(result.message || "REGISTRATION FAILED");
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
                className="text-2xl font-bold text-primary mb-2"
                style={{
                  fontFamily: 'monospace',
                  textShadowColor: '#00ff41',
                  textShadowRadius: 20,
                }}
              >
                CREATE ACCOUNT
              </Text>
              <Text className="text-muted text-xs font-mono" style={{ fontFamily: 'monospace' }}>
                JOIN THE NETWORK
              </Text>
            </View>

            {/* Registration Form */}
            <View className="gap-3 mb-4">
              <HackerInput
                prefix="user:"
                placeholder="username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <HackerInput
                prefix="mail:"
                placeholder="email@domain.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                editable={!loading}
              />

              <HackerInput
                prefix="pass:"
                placeholder="password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
              />

              <HackerInput
                prefix="conf:"
                placeholder="confirm password"
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

            {/* Success Message */}
            {success ? (
              <View className="mb-4 border border-success/50 bg-success/10 rounded-lg p-3">
                <Text
                  className="text-success text-center font-mono text-sm"
                  style={{
                    fontFamily: 'monospace',
                    textShadowColor: '#00ff41',
                    textShadowRadius: 10,
                  }}
                >
                  {success}
                </Text>
              </View>
            ) : null}

            {/* Sign Up Button */}
            <NeonButton
              title={loading ? "CREATING..." : "CREATE ACCOUNT"}
              onPress={handleSignUp}
              disabled={loading}
              className="mb-4"
            />

            {/* Login Link */}
            <View className="items-center">
              <Text className="text-muted text-sm font-mono" style={{ fontFamily: 'monospace' }}>
                ALREADY HAVE AN ACCOUNT?
              </Text>
              <Pressable
                onPress={() => router.replace("/login")}
                disabled={loading}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <Text
                  className="text-primary text-sm font-mono font-bold mt-2"
                  style={{
                    fontFamily: 'monospace',
                    textShadowColor: '#00ff41',
                    textShadowRadius: 8,
                  }}
                >
                  LOGIN HERE
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
