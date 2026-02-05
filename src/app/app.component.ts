import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './features/editor/editor.component';
import { PhonePreviewComponent } from './preview/phone-preview.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, EditorComponent, PhonePreviewComponent  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  // past = signal<MessageConfig[]>([]);
  // future = signal<MessageConfig[]>([]);

  // present = signal<MessageConfig>(this.createText());
  // showImport = false;
  

}
