import { baseApiService } from './BaseApiService';

class AudioService {
  static getInstance(): AudioService {
    return new AudioService();
  }

  async fetchAudioRecords(data: { question_id: string }): Promise<any> {
    return baseApiService.post(
      `/api/v1/portal/tts/list/${data.question_id}`,
      'api.tts.list',
      {}
    );
  }
}

export const audioService = AudioService.getInstance();
