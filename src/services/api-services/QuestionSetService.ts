import { QuestionSet } from 'models/entities/QuestionSet';
import { baseApiService } from './BaseApiService';

class QuestionSetService {
  static getInstance(): QuestionSetService {
    return new QuestionSetService();
  }

  async fetchQuestionSet(data: {
    question_set_id: string;
  }): Promise<QuestionSet> {
    return baseApiService.post(`/question-set/${data.question_set_id}`, data, {
      extras: { useAuth: false },
    });
  }
}

export const questionSetService = QuestionSetService.getInstance();
