// import { Injectable, signal, effect } from '@angular/core';
// import { Store } from '@ngrx/store';
// import * as EditorActions from './editor.actions';
// import { EditorState } from './editor.state';

// @Injectable({ providedIn: 'root' })
// export class EditorFacade {

//   present = signal<any>(null);
//   past = signal<any[]>([]);
//   future = signal<any[]>([]);

//   constructor(private store: Store<{ editor: EditorState }>) {
//     this.store.select('editor').subscribe(state => {
//       this.present.set(state.present);
//       this.past.set(state.past);
//       this.future.set(state.future);
//     });
//   }

//   set(message: any) {
//     this.store.dispatch(EditorActions.setMessage({ message }));
//   }

//   commit() {
//     this.store.dispatch(EditorActions.commit());
//   }

//   undo() {
//     this.store.dispatch(EditorActions.undo());
//   }

//   redo() {
//     this.store.dispatch(EditorActions.redo());
//   }
// }
import { Injectable, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import * as EditorActions from './editor.actions';
import * as EditorSelectors from './editor.selectors';
import { MessageConfig } from '../core/models/message.model';

@Injectable({ providedIn: 'root' })
export class EditorFacade {

  present = signal<MessageConfig | null>(null);
  past = signal<MessageConfig[]>([]);
  future = signal<MessageConfig[]>([]);

  constructor(private store: Store) {
    this.store.select(EditorSelectors.selectPresent)
      .subscribe(v => this.present.set(v));

    this.store.select(EditorSelectors.selectPast)
      .subscribe(v => this.past.set(v));

    this.store.select(EditorSelectors.selectFuture)
      .subscribe(v => this.future.set(v));
  }

  set(message: MessageConfig) {
    this.store.dispatch(EditorActions.setMessage({ message }));
  }

  commit() {
    this.store.dispatch(EditorActions.commit());
  }

  undo() {
    this.store.dispatch(EditorActions.undo());
  }

  redo() {
    this.store.dispatch(EditorActions.redo());
  }
}
