import { QuestionSet } from 'models/entities/QuestionSet';
import { baseApiService } from './BaseApiService';

class ContentService {
  static getInstance(): ContentService {
    return new ContentService();
  }

  async fetchContentbyContentId(data: {
    content_id: string;
  }): Promise<QuestionSet> {
    return baseApiService.get(`api/v1/content/read/${data.content_id}`);
  }
}

export const contentService = ContentService.getInstance();
