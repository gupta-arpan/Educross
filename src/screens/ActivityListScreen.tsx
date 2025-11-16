import React, { useState, useMemo, useEffect } from 'react';
import { View, SectionList, Alert, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme, Searchbar, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ScreenWrapper';
import AppHeader from '../components/AppHeader';
import ActivityCard from '../components/ActivityCard';
import ActivityCardSkeleton from '../components/ActivityCardSkeleton';
import { MOCK_ACTIVITIES } from '../data/mockData';
import { Activity } from '../types';
import FilterChip from '../components/FilterChip';
import { groupActivitiesByDate } from '../utils/dateUtils';

type FilterCategory = 'All' | 'AI' | 'Machine Learning' | 'Cloud Computing';
const FILTER_CATEGORIES = ['All', 'AI', 'Machine Learning', 'Cloud Computing'];
const SKELETON_DATA = Array.from(Array(5).keys());

export default function ActivityListScreen() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredActivities = useMemo(() => {
    let activities = MOCK_ACTIVITIES;
    if (selectedFilter !== 'All') {
      activities = activities.filter((a) => a.program === selectedFilter);
    }
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
      activities = activities.filter((a) =>
        a.title.toLowerCase().includes(query)
      );
    }
    return activities;
  }, [selectedFilter, searchQuery]);

  const activitySections = useMemo(() => {
    return groupActivitiesByDate(filteredActivities);
  }, [filteredActivities]);

  const handleActionPress = (activity: Activity) => {
    const message = `You clicked the action for "${activity.title}"`;
    if (Platform.OS === 'web') alert(message);
    else Alert.alert('Action Triggered', message);
  };

  const renderFilterChips = () => (
    <View style={[styles.filterContainer, { borderBottomColor: theme.colors.outlineVariant }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FILTER_CATEGORIES.map((category) => (
          <FilterChip
            key={category}
            label={category}
            selected={selectedFilter === category}
            onPress={() => setSelectedFilter(category as FilterCategory)}
          />
        ))}
      </ScrollView>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <Text variant="titleMedium" style={[styles.sectionHeader, {backgroundColor: theme.colors.background}]}>
      {title}
    </Text>
  );

  const renderItem = ({ item }: { item: Activity }) => (
    <ActivityCard activity={item} onPressAction={handleActionPress} />
  );

  const EmptyState = (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="magnify-close" size={64} color={theme.colors.onSurfaceDisabled} />
      <Text variant="titleLarge" style={styles.emptyText}>
        No activities found
      </Text>
      <Text variant="bodyMedium" style={styles.emptyText}>
        Try adjusting your search or filters.
      </Text>
    </View>
  );

  if (isLoading) {
    return (
      <ScreenWrapper>
        <AppHeader title="My Activities" />
        <Searchbar placeholder="Search activities..." value={searchQuery} style={styles.searchbar} editable={false} />
        {renderFilterChips()}
        <View style={styles.listContainer}>
          {SKELETON_DATA.map((i) => <ActivityCardSkeleton key={`skeleton-${i}`} />)}
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <AppHeader title="My Activities" />
      <Searchbar
        placeholder="Search activities..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />
      {renderFilterChips()}
      
      <View style={styles.listContainer}>
        {activitySections.length === 0 ? (
          EmptyState
        ) : (
          <SectionList
            sections={activitySections}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  searchbar: { marginVertical: 12, borderRadius: 30 },
  filterContainer: { paddingVertical: 12, borderBottomWidth: 1 },
  listContainer: { flex: 1, paddingHorizontal: 0 }, // Use padding on content
  listContent: { paddingBottom: 20 },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingHorizontal: 20,
  },
  emptyText: { color: 'gray', marginTop: 8 },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    fontWeight: 'bold',
  },
});