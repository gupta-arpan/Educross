// src/types/index.ts

// Defines the main categories: Online Class or Assessment [cite: 6]
export type ActivityType = 'OnlineClass' | 'Assessment';

// Defines the sub-categories for Assessments [cite: 6]
export type AssessmentType = 'Assignment' | 'Quiz' | 'Discussion';

// Defines the possible states for an activity
export type ActivityStatus = 'Pending' | 'InProgress' | 'Completed';

// Base properties shared by all activities
interface BaseActivity {
  id: string;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  program: 'AI' | 'Machine Learning' | 'Cloud Computing'; // For filtering [cite: 3]
}

// Specific properties for an Online Class
export interface OnlineClassActivity extends BaseActivity {
  type: 'OnlineClass';
  dateTime: string; // ISO string format (e.g., "2025-11-20T14:00:00Z")
  durationMinutes: number;
  instructor: string;
  meetingLink: string;
}

// Specific properties for an Assessment
export interface AssessmentActivity extends BaseActivity {
  type: 'Assessment';
  assessmentType: AssessmentType;
  dueDate: string; // ISO string format
}

// A union type representing any possible activity
export type Activity = OnlineClassActivity | AssessmentActivity;