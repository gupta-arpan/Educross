import { Activity } from "../types";

export const formatActivityDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  } catch (error) {
    return "Invalid Date";
  }
};

export const formatDueDate = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return "Invalid Date";
  }
};

export interface ActivitySection {
  title: 'Today' | 'Upcoming' | 'Past Activities';
  data: Activity[];
}

const getStartOfDay = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const groupActivitiesByDate = (activities: Activity[]): ActivitySection[] => {
  const today = getStartOfDay(new Date());

  const todayData: Activity[] = [];
  const upcomingData: Activity[] = [];
  const pastData: Activity[] = [];

  const sortedActivities = [...activities].sort((a, b) => {
    const dateA = new Date(a.type === 'OnlineClass' ? a.dateTime : a.dueDate);
    const dateB = new Date(b.type === 'OnlineClass' ? b.dateTime : b.dueDate);
    return dateB.getTime() - dateA.getTime();
  });

  for (const activity of sortedActivities) {
    const activityDateStr =
      activity.type === 'OnlineClass' ? activity.dateTime : activity.dueDate;
    const activityDate = getStartOfDay(new Date(activityDateStr));

    if (activityDate.getTime() === today.getTime()) {
      todayData.push(activity);
    } else if (activityDate.getTime() > today.getTime()) {
      upcomingData.push(activity);
    } else {
      pastData.push(activity);
    }
  }

  const sections: ActivitySection[] = [];
  if (todayData.length > 0) {
    sections.push({ title: 'Today', data: todayData });
  }
  if (upcomingData.length > 0) {
    sections.push({ title: 'Upcoming', data: upcomingData.reverse() });
  }
  if (pastData.length > 0) {
    sections.push({ title: 'Past Activities', data: pastData });
  }

  return sections;
};