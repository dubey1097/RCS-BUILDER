import { MetaReducer } from '@ngrx/store';
import { saveState, loadState } from '../core/utils/storage.util';
import { RootState } from './root.state';

export const hydrationMetaReducer: MetaReducer<RootState> =
  (reducer) => {

    const persisted = loadState();

    return (state, action) => {
      const nextState = reducer(
        state ?? persisted,
        action
      );

      saveState(nextState.editor);
      return nextState;
    };
  };
