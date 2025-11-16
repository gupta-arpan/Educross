
export type ActivityType = 'OnlineClass' | 'Assessment';

export type AssessmentType = 'Assignment' | 'Quiz' | 'Discussion';

export type ActivityStatus = 'Pending' | 'InProgress' | 'Completed';

interface BaseActivity {
  id: string;
  title: string;
  type: ActivityType;
  status: ActivityStatus;
  program: 'AI' | 'Machine Learning' | 'Cloud Computing';
}

export interface OnlineClassActivity extends BaseActivity {
  type: 'OnlineClass';
  dateTime: string;
  durationMinutes: number;
  instructor: string;
  meetingLink: string;
}

export interface AssessmentActivity extends BaseActivity {
  type: 'Assessment';
  assessmentType: AssessmentType;
  dueDate: string;
}

export type Activity = OnlineClassActivity | AssessmentActivity;