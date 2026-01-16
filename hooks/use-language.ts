import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language, getTranslation } from '@/lib/i18n';

const LANGUAGE_KEY = 'hacker_terminal_language';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language>('pt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (saved && (saved === 'pt' || saved === 'en' || saved === 'es')) {
        setLanguageState(saved);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_KEY, lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = getTranslation(language);

  return {
    language,
    setLanguage,
    t,
    isLoading,
  };
}
