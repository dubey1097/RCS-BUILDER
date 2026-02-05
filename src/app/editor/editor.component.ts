import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderFacade } from '../store/builder.facade';
import { MessageConfig } from '../core/models/message.model';
import { CarouselEditorComponent } from './carousel-editor.component';
import { RichCardEditorComponent } from './rich-card-editor.component';


@Component({
  standalone: true,
  selector: 'app-editor',
  imports: [CommonModule, CarouselEditorComponent, RichCardEditorComponent],
  template: `
   <select (change)="switchType($any($event.target).value)">
  <option value="text">Text</option>
  <option value="rich-card">Rich Card</option>
  <option value="carousel">Carousel</option>
</select>

<ng-container [ngSwitch]="config().type">

  <!-- TEXT -->
  <textarea
    *ngSwitchCase="'text'"
    rows="4"
    (input)="onTextChange($any($event.target).value)">
    {{ config().description }}
  </textarea>

  <!-- RICH CARD -->
  <app-rich-card-editor
    *ngSwitchCase="'rich-card'"
    [card]="config()"
    (cardChange)="updateRichCard($event)">
  </app-rich-card-editor>

  <!-- CAROUSEL -->
  <app-carousel-editor
    *ngSwitchCase="'carousel'"
    [config]="config()">
  </app-carousel-editor>

</ng-container>

  `,
})
export class EditorComponent {

  config = signal<MessageConfig>({
    id: crypto.randomUUID(),
    type: 'text',
    content: '',
  });

  constructor(public facade: BuilderFacade) { }

  onTextChange(text: string) {
    const updated = { ...this.config(), content: text };
    this.config.set(updated);
    this.facade.update(updated);
  }

  switchType(type: 'text' | 'carousel') {
    const next: MessageConfig =
      type === 'carousel'
        ? {
          id: crypto.randomUUID(),
          type: 'carousel',
          cards: [this.createCard()],
          suggestionsOut: [],
        }
        : {
          id: crypto.randomUUID(),
          type: 'text',
          content: '',
        };

    this.config.set(next);
    this.facade.update(next);
  }

  private createCard() {
    return {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      mediaEnabled: false,
      mediaSize: 'medium',
      suggestionsIn: [],
    };
  }
  updateRichCard(card: any) {
    this.config.set(card);
    this.facade.update(card);
  }

}
