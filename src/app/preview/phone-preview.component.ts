import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRendererComponent } from './message-renderer.component';
import { EditorFacade } from '../store/editor.facade';
import { ViewChild, ElementRef } from '@angular/core';
import * as htmlToImage from 'html-to-image';

@Component({
  standalone: true,
  selector: 'app-phone-preview',
  imports: [CommonModule, MessageRendererComponent],
  template: `
     <!-- PHONE PREVIEW -->
    <div class="phone" #phonePreview>
        <app-message-renderer [config]="present()"></app-message-renderer>
        <button (click)="downloadScreenshot()" class="downloadScreenshot">Download Screenshot</button>

    </div>
  `,
  styles: [`
    ..phone {
    position: relative;
    width: 300px;
    height: 550px;
    border: 2px solid #333;
    border-radius: 24px;
    padding: 12px;
    background: #f5f5f5;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}



.downloadScreenshot {
    position: absolute;
    bottom: 12px;
    left: 50%;
    transform: translateX(-50%);
    padding: 6px 12px;
    font-size: 14px;
    border: none;
    border-radius: 16px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
}`]
})
export class PhonePreviewComponent {
  constructor(public facade: EditorFacade) { }
  present = this.facade.present;
  @ViewChild('phonePreview', { static: false })
  phonePreview!: ElementRef<HTMLElement>;

  
 
  downloadScreenshot() {
    if (!this.phonePreview) return;

    htmlToImage.toPng(this.phonePreview.nativeElement)
      .then(dataUrl => {
        const link = document.createElement('a');
        link.download = 'phone-preview.png';
        link.href = dataUrl;
        link.click();
      })
      .catch(err => {
        console.error('Screenshot failed', err);
        alert('Failed to capture screenshot');
      });
  }
  
}
