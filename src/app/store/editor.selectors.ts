import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditorState } from './editor.state';

export const selectEditor =
  createFeatureSelector<EditorState>('editor');

export const selectPresent =
  createSelector(selectEditor, s => s.present);

export const selectPast =
  createSelector(selectEditor, s => s.past);

export const selectFuture =
  createSelector(selectEditor, s => s.future);
