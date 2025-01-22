import { call, put, takeLatest } from 'redux-saga/effects';
import { audioService } from 'services/api-services/audioService';
import { AudioDataActionType } from 'store/actions/actions.constants';
import {
  AudioActionPayloadType,
  getAudioRecordsCompleted,
  getAudioRecordsError,
} from 'store/actions/audio.action';
import { SagaPayloadType } from 'types/SagaPayload.type';

interface AudioSagaPayloadType extends SagaPayloadType {
  payload: AudioActionPayloadType;
}

function* getAudioRecordsSaga({ payload }: AudioSagaPayloadType): any {
  try {
    const response = yield call(audioService.fetchAudioRecords, payload);

    yield put(
      getAudioRecordsCompleted({
        question_id: payload.question_id,
        audioRecords: response.result,
      })
    );
  } catch (e: any) {
    yield put(
      getAudioRecordsError((e?.errors && e.errors[0]?.message) || e?.message)
    );
  }
}

export function* audioSaga() {
  yield takeLatest(AudioDataActionType.GET_AUDIO, getAudioRecordsSaga);
}
