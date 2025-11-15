// src/utils/dateUtils.ts

/**
 * Formats an ISO date string into a readable format.
 * Example: "Nov 17, 2025, 11:00 AM"
 */
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

/**
 * Formats an ISO date string into a date-only format.
 * Example: "Nov 22, 2025"
 */
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