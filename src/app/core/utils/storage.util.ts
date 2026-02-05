import { EditorState } from '../../store/editor.state';

const KEY = 'editor-state';

export function saveState(state: EditorState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function loadState(): { editor: EditorState } | undefined {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { editor: JSON.parse(raw) } : undefined;
  } catch {
    return undefined;
  }
}
