import { LearnerJourneyStatus } from 'models/enums/learnerJourney.enum';

export interface LearnerJourney {
  identifier: string;
  learner_id: string;
  question_set_id: string;
  completed_question_ids: null;
  status: LearnerJourneyStatus;
  start_time: Date;
  end_time: null;
  attempts_count: number;
  created_by: string;
  updated_by: null;
  created_at: Date;
  updated_at: Date;
}
