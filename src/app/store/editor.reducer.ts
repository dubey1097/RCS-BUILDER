import { createReducer, on } from '@ngrx/store';
import * as EditorActions from './editor.actions';
import { EditorState } from './editor.state';

export const initialState: EditorState = {
  past: [],
  present: {
    id: crypto.randomUUID(),
    type: 'text',
    content: '',
  } as any,
  future: [],
};

export const editorReducer = createReducer(
  initialState,

  on(EditorActions.setMessage, (state, { message }) => ({
    ...state,
    present: message,
  })),

  on(EditorActions.commit, (state) => ({
    past: [...state.past, state.present],
    present: state.present,
    future: [],
  })),

  on(EditorActions.undo, (state) => {
    const previous = state.past.at(-1);
    if (!previous) return state;

    return {
      past: state.past.slice(0, -1),
      present: previous,
      future: [state.present, ...state.future],
    };
  }),

  on(EditorActions.redo, (state) => {
    const next = state.future[0];
    if (!next) return state;

    return {
      past: [...state.past, state.present],
      present: next,
      future: state.future.slice(1),
    };
  })
);
