import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeName, getTheme, Theme } from '@/lib/themes';

const THEME_KEY = 'hacker_terminal_theme';

export function useTheme() {
  const [themeName, setThemeNameState] = useState<ThemeName>('green');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_KEY);
      if (saved && (saved === 'green' || saved === 'cyan' || saved === 'purple' || saved === 'red')) {
        setThemeNameState(saved);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setTheme = async (theme: ThemeName) => {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
      setThemeNameState(theme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = getTheme(themeName);

  return {
    themeName,
    setTheme,
    theme,
    isLoading,
  };
}
