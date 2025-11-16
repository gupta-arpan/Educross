import React from 'react';
import { Appbar, useTheme } from 'react-native-paper';
import { Platform, StyleSheet } from 'react-native';
interface Props {
  title: string;
}

export default function AppHeader({ title }: Props) {
  const theme = useTheme();
  const headerMode = Platform.OS === 'web' ? 'center-aligned' : 'small';

  return (
    <Appbar.Header
      mode={headerMode}
      elevated={false}
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.outlineVariant,
      }}
    >
      <Appbar.Content 
        title={title} 
        titleStyle={{ fontWeight: 'bold' }}
        style={Platform.OS === 'web' ? null : styles.mobileContent}
      />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  mobileContent: {
    marginLeft: 12,
  },
});