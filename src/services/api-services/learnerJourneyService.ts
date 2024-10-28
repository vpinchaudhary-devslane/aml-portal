import { LearnerJourney } from 'models/entities/LearnerJourney';
import { baseApiService } from './BaseApiService';

class LearnerJourneyService {
  static getInstance(): LearnerJourneyService {
    return new LearnerJourneyService();
  }

  async fetchLearnerjourney(data: {
    learner_id: string;
  }): Promise<LearnerJourney> {
    return baseApiService.get(
      `/api/v1/learner/journey/read/${data.learner_id}`
    );
  }
}

export const learnerJourneyService = LearnerJourneyService.getInstance();
