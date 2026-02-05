import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichCard } from '../core/models/message.model';

@Component({
  standalone: true,
  selector: 'app-rich-card-editor',
  imports: [CommonModule],
  template: `
    <div class="card-editor">
      <input
        placeholder="Title"
        [value]="card.title"
        (input)="update('title', $any($event.target).value)"
      />

      <textarea
        placeholder="Description"
        (input)="update('description', $any($event.target).value)">
        {{ card.description }}
      </textarea>

      <label>
        <input
          type="checkbox"
          [checked]="card.mediaEnabled"
          (change)="toggleMedia()"
        />
        Media enabled
      </label>

      <select
        [value]="card.mediaSize"
        (change)="update('mediaSize', $any($event.target).value)">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </div>
  `,
  styles: [`
    .card-editor {
      border: 1px solid #ddd;
      padding: 8px;
      border-radius: 6px;
    }
  `]
})
export class RichCardEditorComponent {
  @Input({ required: true }) card!: RichCard;
  @Output() cardChange = new EventEmitter<RichCard>();

  update(key: keyof RichCard, value: any) {
    this.cardChange.emit({ ...this.card, [key]: value });
  }

  toggleMedia() {
    this.cardChange.emit({
      ...this.card,
      mediaEnabled: !this.card.mediaEnabled
    });
  }
}
