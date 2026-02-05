import { MessageConfig } from '../core/models/message.model';

export interface EditorState {
  past: MessageConfig[];
  present: MessageConfig;
  future: MessageConfig[];
}
