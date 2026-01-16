import { useEffect } from "react";
import { useRouter } from "expo-router";
import { isUserLoggedIn } from "@/lib/auth-service";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const loggedIn = await isUserLoggedIn();

      if (loggedIn) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.replace("/login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000000" }}>
      <ActivityIndicator size="large" color="#00ff41" />
    </View>
  );
}
