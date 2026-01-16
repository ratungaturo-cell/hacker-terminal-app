import { useState } from "react";
import { ScrollView, Text, View, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { ScreenContainer } from "@/components/screen-container";
import { useLanguage } from "@/hooks/use-language";
import { useTheme } from "@/hooks/use-theme";
import { useSound } from "@/hooks/use-sound";
import * as Haptics from "expo-haptics";
import { Language } from "@/lib/i18n";
import { ThemeName, themes } from "@/lib/themes";

export default function SettingsScreen() {
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { themeName, setTheme, theme } = useTheme();
  const { playSound } = useSound();

  const languages: { code: Language; label: string }[] = [
    { code: 'pt', label: t.settings.portuguese },
    { code: 'en', label: t.settings.english },
    { code: 'es', label: t.settings.spanish },
  ];

  const themeOptions: { name: ThemeName; label: string }[] = [
    { name: 'green', label: t.settings.themeGreen },
    { name: 'cyan', label: t.settings.themeCyan },
    { name: 'purple', label: t.settings.themePurple },
    { name: 'red', label: t.settings.themeRed },
  ];

  const handleLanguageChange = async (lang: Language) => {
    playSound('click');
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await setLanguage(lang);
  };

  const handleThemeChange = async (newTheme: ThemeName) => {
    playSound('click');
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    await setTheme(newTheme);
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
                ← {t.settings.title}
              </Text>
            </Pressable>
          </View>

          {/* Language Section */}
          <View className="mb-8">
            <Text
              className="text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
                textShadowColor: theme.primary,
                textShadowRadius: 8,
              }}
            >
              {t.settings.language}
            </Text>
            <View className="gap-3">
              {languages.map((lang) => (
                <Pressable
                  key={lang.code}
                  onPress={() => handleLanguageChange(lang.code)}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.8 : 1,
                    borderColor: language === lang.code ? theme.primary : `${theme.primary}40`,
                    borderWidth: 2,
                    borderRadius: 8,
                    padding: 12,
                    backgroundColor: language === lang.code ? `${theme.primary}20` : 'transparent',
                  })}
                >
                  <Text
                    className="text-base font-mono"
                    style={{
                      fontFamily: 'monospace',
                      color: language === lang.code ? theme.primary : theme.muted,
                      fontWeight: language === lang.code ? 'bold' : 'normal',
                    }}
                  >
                    {language === lang.code ? '✓ ' : '  '}{lang.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Theme Section */}
          <View className="mb-8">
            <Text
              className="text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
                textShadowColor: theme.primary,
                textShadowRadius: 8,
              }}
            >
              {t.settings.theme}
            </Text>
            <View className="gap-3">
              {themeOptions.map((themeOption) => {
                const themeColors = themes[themeOption.name];
                return (
                  <Pressable
                    key={themeOption.name}
                    onPress={() => handleThemeChange(themeOption.name)}
                    style={({ pressed }) => ({
                      opacity: pressed ? 0.8 : 1,
                      borderColor: themeName === themeOption.name ? themeColors.primary : `${themeColors.primary}40`,
                      borderWidth: 2,
                      borderRadius: 8,
                      padding: 12,
                      backgroundColor: themeName === themeOption.name ? `${themeColors.primary}20` : 'transparent',
                    })}
                  >
                    <View className="flex-row items-center gap-3">
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 4,
                          backgroundColor: themeColors.primary,
                          borderColor: themeColors.secondary,
                          borderWidth: 2,
                        }}
                      />
                      <Text
                        className="text-base font-mono flex-1"
                        style={{
                          fontFamily: 'monospace',
                          color: themeName === themeOption.name ? themeColors.primary : theme.muted,
                          fontWeight: themeName === themeOption.name ? 'bold' : 'normal',
                        }}
                      >
                        {themeName === themeOption.name ? '✓ ' : '  '}{themeOption.label}
                      </Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          {/* Theme Preview */}
          <View className="mb-8">
            <Text
              className="text-lg font-bold font-mono mb-4"
              style={{
                fontFamily: 'monospace',
                color: theme.primary,
                textShadowColor: theme.primary,
                textShadowRadius: 8,
              }}
            >
              Preview
            </Text>
            <View
              style={{
                borderColor: theme.primary,
                borderWidth: 1,
                borderRadius: 8,
                padding: 16,
                backgroundColor: theme.surface,
              }}
            >
              <Text
                style={{
                  fontFamily: 'monospace',
                  color: theme.primary,
                  fontSize: 16,
                  marginBottom: 8,
                  textShadowColor: theme.primary,
                  textShadowRadius: 10,
                }}
              >
                {'> '}TEMA ATIVO
              </Text>
              <View className="flex-row gap-2 flex-wrap">
                <View
                  style={{
                    backgroundColor: theme.primary,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontFamily: 'monospace', color: theme.background, fontSize: 12 }}>
                    PRIMARY
              </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.secondary,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontFamily: 'monospace', color: theme.background, fontSize: 12 }}>
                    SECONDARY
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.success,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontFamily: 'monospace', color: theme.background, fontSize: 12 }}>
                    SUCCESS
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: theme.error,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontFamily: 'monospace', color: theme.background, fontSize: 12 }}>
                    ERROR
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
