import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichCard } from '../core/models/message.model';

@Component({
  standalone: true,
  selector: 'app-rich-card-preview',
  imports: [CommonModule],
  template: `
    <div class="rich-card">
      <div class="media" *ngIf="card.mediaEnabled">
        Media ({{ card.mediaSize }})
      </div>

      <h4>{{ card.title || 'Title' }}</h4>
      <p>{{ card.description || 'Description' }}</p>
    </div>
  `,
  styles: [`
    .rich-card {
      border: 1px solid #ccc;
      padding: 8px;
      border-radius: 8px;
      min-width: 160px;
    }

    .media {
      background: #eee;
      text-align: center;
      margin-bottom: 6px;
    }
  `]
})
export class RichCardPreviewComponent {
  @Input({ required: true }) card!: RichCard;
}
