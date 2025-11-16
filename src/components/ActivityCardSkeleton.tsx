import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

const Placeholder = ({ style }: { style?: any }) => {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.placeholder,
        { backgroundColor: theme.colors.surfaceVariant },
        style,
      ]}
    />
  );
};

export default function ActivityCardSkeleton() {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Placeholder style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Placeholder style={styles.line} />
            <Placeholder style={[styles.line, { width: '40%' }]} />
          </View>
        </View>
        <View style={styles.footer}>
          <Placeholder style={[styles.line, { width: '30%' }]} />
          <Placeholder style={[styles.line, { width: '40%' }]} />
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 0, // No shadow for skeletons
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  line: {
    height: 16,
    borderRadius: 4,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  placeholder: {
    opacity: 0.5,
  },
});