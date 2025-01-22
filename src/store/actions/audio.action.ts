import { AudioDataActionType } from './actions.constants';

export type AudioActionPayloadType = {
  question_id: string;
};

export const getAudioRecords = (payload: AudioActionPayloadType) => ({
  type: AudioDataActionType.GET_AUDIO,
  payload,
});

export const getAudioRecordsCompleted = (payload: any) => ({
  type: AudioDataActionType.GET_AUDIO_COMPLETED,
  payload,
});

export const getAudioRecordsError = (payload: any) => ({
  type: AudioDataActionType.GET_AUDIO_ERROR,
  payload,
});
