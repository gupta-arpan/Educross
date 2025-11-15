// src/screens/ProfileScreen.tsx
import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Switch, useTheme } from 'react-native-paper';
import ScreenWrapper from '../components/ScreenWrapper';
import AppHeader from '../components/AppHeader';
import { ThemeContext } from '../theme/ThemeContext';

export default function ProfileScreen() {
  const theme = useTheme(); 
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <ScreenWrapper>
      <AppHeader title="Profile & Settings" />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text variant="titleMedium">Dark Mode</Text>
          <Switch value={isDarkTheme} onValueChange={toggleTheme} />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { paddingTop: 20 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
});