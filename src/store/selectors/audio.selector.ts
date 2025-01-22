import { createSelector } from 'reselect';
import { AppState } from 'store/reducers';

const audioState = (state: AppState) => state.audio;

export const isLoadingAudioRecordSelector = createSelector(
  [audioState],
  (aState) => aState.isLoading
);

export const getAudioRecordSelector = createSelector(
  [audioState],
  (aState) => aState.entities
);

export const getAudioRecordErrorSelector = createSelector(
  [audioState],
  (aState) => aState.error
);
