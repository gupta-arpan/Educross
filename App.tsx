import React, { useState, useMemo, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import AppNavigation from './src/navigation/AppNavigation';
import { LightTheme, DarkTheme } from './src/theme/theme';
import { ThemeContext } from './src/theme/ThemeContext';

export default function App() {
  const colorScheme = useColorScheme(); 
  const [isDarkTheme, setIsDarkTheme] = useState(colorScheme === 'dark');

  const toggleTheme = useCallback(() => {
    setIsDarkTheme((prev) => !prev);
  }, []);

  const paperTheme = isDarkTheme ? DarkTheme : LightTheme;

  const navigationTheme = useMemo(() => {
    const navTheme = isDarkTheme ? NavigationDarkTheme : NavigationDefaultTheme;

    return {
      ...navTheme,
      colors: {
        ...navTheme.colors,
        background: paperTheme.colors.background,
        card: paperTheme.colors.surface,
        text: paperTheme.colors.onSurface,
        primary: paperTheme.colors.primary,
        border: paperTheme.colors.outlineVariant,
      },
    };
  }, [isDarkTheme, paperTheme]);

  const themeContextValue = useMemo(
    () => ({
      isDarkTheme,
      toggleTheme,
    }),
    [isDarkTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PaperProvider theme={paperTheme}>
            <NavigationContainer theme={navigationTheme}>
              <AppNavigation />
            </NavigationContainer>
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ThemeContext.Provider>
  );
}