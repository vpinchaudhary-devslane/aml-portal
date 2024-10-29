import { QuestionSet } from 'models/entities/QuestionSet';
import { baseApiService } from './BaseApiService';

class MediaService {
  static getInstance(): MediaService {
    return new MediaService();
  }

  async fetchContentMedia(data: { data: any }): Promise<QuestionSet> {
    return baseApiService.post(
      `api/v1/content/media/read/presigned-url`,
      'api.contentMedia.read',
      data.data
    );
  }
}

export const mediaService = MediaService.getInstance();
