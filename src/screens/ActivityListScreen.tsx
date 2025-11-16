// src/screens/ActivityListScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, FlatList, Alert, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, Searchbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import AppHeader from '../components/AppHeader';
import ActivityCard from '../components/ActivityCard';
import { MOCK_ACTIVITIES } from '../data/mockData';
import { Activity } from '../types';
import FilterChip from '../components/FilterChip';

type FilterCategory = 'All' | 'AI' | 'Machine Learning' | 'Cloud Computing';
const FILTER_CATEGORIES: FilterCategory[] = [
  'All',
  'AI',
  'Machine Learning',
  'Cloud Computing',
];

export default function ActivityListScreen() {
  const theme = useTheme();
  const [selectedFilter, setSelectedFilter] =
    useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredActivities = useMemo(() => {
    let activities = MOCK_ACTIVITIES;

    if (selectedFilter !== 'All') {
      activities = activities.filter(
        (activity) => activity.program === selectedFilter
      );
    }

    const lowerCaseQuery = searchQuery.trim().toLowerCase();
    if (lowerCaseQuery.length > 0) {
      activities = activities.filter((activity) =>
        activity.title.toLowerCase().includes(lowerCaseQuery)
      );
    }
    return activities;
  }, [selectedFilter, searchQuery]);

  const handleActionPress = (activity: Activity) => {
    const message = `You clicked the action for "${activity.title}"`;
    const title = 'Action Triggered';

    if (Platform.OS === 'web') {
      alert(message);
    } else {
      Alert.alert(title, message);
    }
  };

  const renderFilterChips = () => (
    <View style={[styles.filterContainer, { borderBottomColor: theme.colors.outlineVariant }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FILTER_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={category}
            selected={selectedFilter === category}
            onPress={() => setSelectedFilter(category)}
          />
        ))}
      </ScrollView>
    </View>
  );

  return (
    <ScreenWrapper>
      <AppHeader title="My Learning Activities" />

      <Searchbar
        placeholder="Search activities..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      {renderFilterChips()}

      <FlatList
        data={filteredActivities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ActivityCard
            activity={item}
            onPressAction={handleActionPress}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons
              name="magnify-close"
              size={64}
              color={theme.colors.onSurfaceDisabled}
            />
            <Text
              variant="titleLarge"
              style={{ color: theme.colors.onSurfaceDisabled, marginTop: 16 }}
            >
              No activities found
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: theme.colors.onSurfaceDisabled, marginTop: 4 }}
            >
              Try adjusting your search or filters.
            </Text>
          </View>
        }
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  searchbar: { marginVertical: 12 },
  filterContainer: { paddingVertical: 12, borderBottomWidth: 1 },
  listContent: { paddingTop: 8, paddingBottom: 20 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});