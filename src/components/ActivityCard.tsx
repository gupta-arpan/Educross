import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Chip, Text, useTheme, Avatar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Activity, OnlineClassActivity, AssessmentActivity } from '../types';
import { formatActivityDate, formatDueDate } from '../utils/dateUtils';

const iconColors = {
  quiz: '#673AB7',
  assignment: '#FF9800',
  discussion: '#009688',
};
interface Props {
  activity: Activity;
  onPressAction: (activity: Activity) => void;
}

export default function ActivityCard({ activity, onPressAction }: Props) {
  const theme = useTheme();

  const getStatusChip = () => {
    const { status } = activity;
    let icon = '';
    let color = '';

    switch (status) {
      case 'Completed':
        icon = 'check-circle';
        color = theme.colors.success;
        break;
      case 'InProgress':
        icon = 'progress-clock';
        color = theme.colors.primary;
        break;
      case 'Pending':
      default:
        icon = 'clock-outline';
        color = theme.colors.warning;
        break;
    }

    return (
      <Chip icon={icon} textStyle={{ color }} style={{ backgroundColor: 'transparent', paddingLeft: 0 }}>
        {status}
      </Chip>
    );
  };

  const getActionButton = () => {
    const { status, type } = activity;
    let text = '';
    let mode: 'contained' | 'outlined' = 'contained';
    let icon = '';

    switch (status) {
      case 'Completed':
        text = 'Review';
        mode = 'outlined';
        icon = 'eye-check';
        break;
      case 'InProgress':
        text = 'Continue';
        icon = 'play-circle';
        break;
      case 'Pending':
      default:
        text = type === 'OnlineClass' ? 'Join Class' : 'Start';
        icon = type === 'OnlineClass' ? 'video' : 'pencil';
        break;
    }

    return (
      <Button
        mode={mode}
        icon={icon}
        onPress={() => onPressAction(activity)}
        style={styles.actionButton}
      >
        {text}
      </Button>
    );
  };

  const getCardIcon = () => {
    if (activity.type === 'OnlineClass') {
      return (
        <Avatar.Icon
          size={40}
          icon="video"
          color="#fff"
          style={{ backgroundColor: theme.colors.primary }}
        />
      );
    }

    let icon: string;
    let color: string;

    switch (activity.assessmentType) {
      case 'Quiz':
        icon = 'file-question';
        color = iconColors.quiz;
        break;
      case 'Assignment':
        icon = 'file-document-edit';
        color = iconColors.assignment;
        break;
      case 'Discussion':
        icon = 'forum';
        color = iconColors.discussion;
        break;
      default:
        icon = 'file';
        color = theme.colors.onSurfaceDisabled;
        break;
    }

    return (
      <Avatar.Icon
        size={40}
        icon={icon}
        color="#fff"
        style={{ backgroundColor: color }}
      />
    );
  };

  const renderDetails = () => {
    if (activity.type === 'OnlineClass') {
      const classActivity = activity as OnlineClassActivity;
      return (
        <>
          <InfoRow
            icon="calendar-clock"
            text={formatActivityDate(classActivity.dateTime)}
          />
          <InfoRow
            icon="account-tie"
            text={`with ${classActivity.instructor}`}
          />
        </>
      );
    }

    const assessmentActivity = activity as AssessmentActivity;
    return (
      <>
        <InfoRow
          icon="calendar-check"
          text={`Due: ${formatDueDate(assessmentActivity.dueDate)}`}
        />
        <InfoRow
          icon="tag"
          text={`Type: ${assessmentActivity.assessmentType}`}
        />
      </>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={activity.title}
        titleVariant="titleMedium"
        titleNumberOfLines={2}
        subtitle={activity.program}
        subtitleStyle={{ color: theme.colors.primary, fontWeight: 'bold' }}
        left={() => getCardIcon()}
      />
      <Card.Content>
        <View style={styles.detailsContainer}>{renderDetails()}</View>
        <View style={[styles.footer, { borderTopColor: theme.colors.outlineVariant }]}>          {getStatusChip()}
          {getActionButton()}
        </View>
      </Card.Content>
    </Card>
  );
}

// A small helper component to keep info rows consistent
const InfoRow = ({ icon, text }: { icon: string; text: string }) => {
  const theme = useTheme();
  return (
    <View style={styles.infoRow}>
      <MaterialCommunityIcons
        name={icon as any}
        size={16}
        color={theme.colors.onSurfaceVariant}
        style={styles.infoIcon}
      />
      <Text variant="bodyMedium" style={{ color: theme.colors.onSurfaceVariant, flex: 1 }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    elevation: 2,
  },
  detailsContainer: {
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoIcon: {
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  actionButton: {
  },
});