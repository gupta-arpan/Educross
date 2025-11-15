// src/components/ScreenWrapper.tsx
import React from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
  scrollable?: boolean;
}

export default function ScreenWrapper({ children, scrollable = false }: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle = [
    styles.container,
    {
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'web' ? 20 : insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left + 20,
      paddingRight: insets.right + 20,
    },
  ];

  if (scrollable) {
    return (
      <ScrollView style={containerStyle} contentContainerStyle={styles.contentContainer}>
        {children}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20, // Extra padding for scroll content
  },
});