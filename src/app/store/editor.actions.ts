import { createAction, props } from '@ngrx/store';
import { MessageConfig } from '../core/models/message.model';

export const setMessage = createAction(
  '[Editor] Set Message',
  props<{ message: MessageConfig }>()
);

export const commit = createAction('[Editor] Commit');

export const undo = createAction('[Editor] Undo');
export const redo = createAction('[Editor] Redo');
