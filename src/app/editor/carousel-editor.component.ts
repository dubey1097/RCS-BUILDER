import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageConfig, CarouselCard, RichCard } from '../core/models/message.model';
import { BuilderFacade } from '../store/builder.facade';
import { RichCardEditorComponent } from './rich-card-editor.component';


@Component({
  standalone: true,
  selector: 'app-carousel-editor',
  imports: [CommonModule, RichCardEditorComponent],
  template: `
    <h3>Carousel Editor</h3>

    <label>
      Number of cards:
      <select (change)="changeCardCount($any($event.target).value)">
        <option *ngFor="let n of [1,2,3,4,5]" [value]="n">
          {{ n }}
        </option>
      </select>
    </label>

    <div *ngFor="let card of config.cards; let i = index">
  <h4>Card {{ i + 1 }}</h4>

  <app-rich-card-editor
    [card]="card"
    (cardChange)="updateCard(i, $event)">
  </app-rich-card-editor>
</div>

  `,
  styles: [`
    .card-editor {
      border: 1px solid #ddd;
      padding: 8px;
      margin-top: 8px;
    }
  `]
})
export class CarouselEditorComponent {
  @Input({ required: true }) config!: MessageConfig;

  constructor(private facade: BuilderFacade) {}

//   changeCardCount(count: number) {
//     const cards: CarouselCard[] = Array.from({ length: +count }, (_, i) =>
//       this.config?.cards?.[i] ?? this.createCard()
//     );

//     this.commit({ ...this.config, cards });
//   }

//   updateCard(index: number, card: RichCard) {
//   const cards = [...this.config.cards!];
//   cards[index] = card;
//   this.facade.update({ ...this.config, cards });
// }

//   toggleMedia(index: number) {
//     const card = this.config.cards![index];
//     this.updateCard(index, 'mediaEnabled', !card.mediaEnabled);
//   }

  private commit(config: MessageConfig) {
    this.facade.update(config);
  }

  private createCard(): CarouselCard {
    return {
      id: crypto.randomUUID(),
      title: '',
      description: '',
      mediaEnabled: false,
      mediaSize: 'medium',
      suggestionsIn: [],
    };
  }
}
