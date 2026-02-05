import { Component, computed, input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselMessage, MessageConfig, RichCardMessage, TextMessage } from '../core/models/message.model';
// import { RichCardPreviewComponent } from './rich-card-preview.component';



@Component({
  standalone: true,
  selector: 'app-message-renderer',
  imports: [CommonModule],
  template: `
    <ng-container [ngSwitch]="config()?.type">

            <div *ngIf="textMessage() as text" class="bubble">
                {{ text.content || 'Type a message…' }}
            </div>


            <div *ngSwitchCase="'rich-card'" class="rich-card">
                <h4>{{ richCard()?.card?.title || 'Title' }}</h4>
                <p>{{ richCard()?.card?.description || 'Description' }}</p>
                <div class="suggestion-row" *ngIf="richCard()?.card?.suggestions?.length">
                    <button class="suggestion" *ngFor="let s of richCard()?.card?.suggestions">
                        {{ s.text }}
                    </button>
                </div>
            </div>

            <div *ngSwitchCase="'carousel'" class="carousel">
                <div class="card" *ngFor="let card of carousel()?.cards">
                    <h4>{{ card.title || 'Title' }}</h4>
                    <p>{{ card.description || 'Description' }}</p>
                    <div class="suggestion-row" *ngIf="card.suggestions?.length">
                        <button class="suggestion" *ngFor="let s of card.suggestions">
                            {{ s.text }}
                        </button>
                    </div>

                </div>
            </div>
            <div class="suggestion-row" *ngIf="config()?.suggestions?.length">
                <button class="suggestion" *ngFor="let s of config()?.suggestions">
                    {{ s.text }}
                </button>
            </div>


        </ng-container>

  `,
  styles: [`
    .bubble {
    background: #e1ffc7;
    padding: 8px 12px;
    border-radius: 16px;
}

.rich-card {
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 12px;
    background: white;
    width: 94%;
}

.carousel {
    display: flex;
    gap: 8px;
    width: 100%;
    overflow-x: auto;
}

.card {
    min-width: 160px;
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 12px;
    background: white;
}

.suggestion-row {
    display: flex;
    gap: 6px;
    margin-top: 8px;
    flex-wrap: wrap;
}

.suggestion {
    border: 1px solid #ccc;
    background: white;
    border-radius: 16px;
    padding: 4px 10px;
    font-size: 12px;
}
  `]
})
export class MessageRendererComponent {
  // @Input({ required: true }) config!: MessageConfig | null;
  readonly config = input.required<MessageConfig>(); 

  readonly textMessage = computed(() => {
    return this.config && this.config.type === 'text' ? this.config as TextMessage : null;
  });
  readonly richCard = computed(() => {
    return this.config && this.config.type === 'rich-card' ? this.config as RichCardMessage : null;
  });
  readonly carousel = computed(() => {
    return this.config && this.config.type === 'carousel' ? this.config as CarouselMessage : null;
  });
  // private debounceTimer: any;

  
  // past = this.facade.past;
  // future = this.facade.future;


  // get textMessage(): TextMessage | null {
  //   const value = this.present();
  //   return value && value.type === 'text' ? value : null;
  // }

  // get richCard(): RichCardMessage | null {
  //   const value = this.present();
  //   return value && value.type === 'rich-card' ? value : null;
  // }
  // get carousel(): CarouselMessage | null {
  //   const value = this.present();
  //   return value && value.type === 'carousel' ? value : null;
  // }
}
