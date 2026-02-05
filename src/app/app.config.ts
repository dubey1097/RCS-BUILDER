import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';

import { editorReducer } from './store/editor.reducer';
import { hydrationMetaReducer } from './store/editor.metareducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(
      { editor: editorReducer },
      {
        metaReducers: [hydrationMetaReducer],
      }
    ),
  ],
};
