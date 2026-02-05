import { Component, signal } from '@angular/core';
import {
    MessageConfig,
    TextMessage,
    RichCardMessage,
    RichCard,
    CarouselMessage
} from '../../core/models/message.model';
import { CommonModule } from '@angular/common';
import { ViewChild, ElementRef } from '@angular/core';
import * as htmlToImage from 'html-to-image';
import { EditorFacade } from '../../store/editor.facade';

@Component({
    standalone: true,
    selector: 'app-editor',
    imports: [CommonModule],
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})

export class EditorComponent {
    showImport = false;
    @ViewChild('phonePreview', { static: false })
    phonePreview!: ElementRef<HTMLElement>;

    private debounceTimer: any;

    constructor(public facade: EditorFacade) { }
    present = this.facade.present;
    past = this.facade.past;
    future = this.facade.future;

    get textMessage(): TextMessage | null {
        const value = this.present();
        return value && value.type === 'text' ? value : null;
    }

    get richCard(): RichCardMessage | null {
        const value = this.present();
        return value && value.type === 'rich-card' ? value : null;
    }
    get carousel(): CarouselMessage | null {
        const value = this.present();
        return value && value.type === 'carousel' ? value : null;
    }

    /* ---------- FACTORIES ---------- */
    createText(): TextMessage {
        return {
            id: crypto.randomUUID(),
            type: 'text',
            content: '',
        };
    }

    createRichCard(): RichCardMessage {
        return {
            id: crypto.randomUUID(),
            type: 'rich-card',
            card: {
                id: crypto.randomUUID(),
                title: '',
                description: '',
            }

        };
    }
    createCard(): RichCard {
        return {
            id: crypto.randomUUID(),
            title: '',
            description: ''
        };
    }

    createCarousel(): CarouselMessage {
        return {
            id: crypto.randomUUID(),
            type: 'carousel',
            cards: [this.createCard()]
        };
    }

    /* ---------- SWITCH ---------- */
    switchType(type: 'text' | 'rich-card' | 'carousel') {
        this.commit();

        if (type === 'text') {
            this.facade.set(this.createText());
        } else if (type === 'rich-card') {
            this.facade.set({
                id: crypto.randomUUID(),
                type: 'rich-card',
                card: this.createCard()
            });
        } else {
            this.facade.set(this.createCarousel());
        }
    }

    /* ---------- EDITING ---------- */
    onTextInput(value: string) {
        // this.present.update(c => ({ ...c, content: value } as TextMessage));
        const current = this.present() as TextMessage;
        this.facade.set({ ...current, content: value });
        this.debounceCommit();
    }

    onRichCardChange(key: 'title' | 'description', value: string) {
        const current = this.present() as RichCardMessage;
        this.facade.set({ ...current, card: { ...current.card, [key]: value } });
        // this.present.update(c => ({ ...c, card: { ...c.card, [key]: value } } as RichCardMessage));
        this.debounceCommit();
    }

    updateCarouselCard(
        index: number,
        key: 'title' | 'description',
        value: string
    ) {
        const current = this.present() as CarouselMessage;
        const cards = [...current.cards];
        cards[index] = { ...cards[index], [key]: value };

        this.facade.set({ ...current, cards });
        this.debounceCommit();
    }

    /* ---------- HISTORY ---------- */
    debounceCommit() {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => this.commit(), 400);
    }

    commit() {
        this.facade.commit();
        // this.past.update(p => [...p, this.present()]);
        // this.future.set([]);
    }

    undo() {
        this.facade.undo();
        // const prev = this.past().at(-1);
        // if (!prev) return;

        // this.past.update(p => p.slice(0, -1));
        // this.future.update(f => [this.present(), ...f]);
        // this.facade.set(prev);
    }

    redo() {
        this.facade.redo();
        // const next = this.future()[0];
        // if (!next) return;

        // this.future.update(f => f.slice(1));
        // this.past.update(p => [...p, this.present()]);
        // this.facade.set(next);
    }

    addCard() {
        const current = this.present() as CarouselMessage;
        this.facade.set({
            ...current,
            cards: [...current.cards, this.createCard()]
        });
        this.commit();
    }
    createSuggestion(): { id: string; text: string } {
        return {
            id: crypto.randomUUID(),
            text: 'Suggestion'
        };
    }
    addSuggestion() {
        const current = this.present();
        if (!current) return;
        const suggestions = [...(current.suggestions ?? []), this.createSuggestion()];

        this.facade.set({ ...current, suggestions });
        this.commit();
    }

    updateSuggestion(index: number, value: string) {
        const current = this.present();
        if (!current) return;
        const suggestions = [...(current.suggestions ?? [])];
        suggestions[index] = { ...suggestions[index], text: value };

        this.facade.set({ ...current, suggestions });
        this.debounceCommit();
    }
    exportJson() {
        const json = JSON.stringify(this.present(), null, 2);

        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'message-config.json';
        a.click();

        URL.revokeObjectURL(url);
    }
    importJson(value: string) {
        try {
            const parsed = JSON.parse(value);

            // minimal sanity check
            if (!parsed.type || !parsed.id) {
                alert('Invalid message config');
                return;
            }

            this.commit();
            this.facade.set(parsed);
            this.showImport = false;
        } catch {
            alert('Invalid JSON');
        }
    }
    addCardSuggestion(cardIndex: number) {
        const current = this.present() as CarouselMessage;

        const cards = [...current.cards];
        const card = cards[cardIndex];

        const suggestions = [...(card.suggestions ?? []), this.createSuggestion()];
        cards[cardIndex] = { ...card, suggestions };

        this.facade.set({ ...current, cards });
        this.commit();
    }
    addRichCardSuggestion() {
        const current = this.present() as RichCardMessage;
        this.facade.set({ ...current, card: { ...current.card, suggestions: [...(current.card.suggestions ?? []), this.createSuggestion()] } });
        this.commit();
    }
    updateCardSuggestion(
        cardIndex: number,
        suggestionIndex: number,
        value: string
    ) {
        const current = this.present() as CarouselMessage;

        const cards = [...current.cards];
        const card = cards[cardIndex];
        const suggestions = [...(card.suggestions ?? [])];

        suggestions[suggestionIndex] = {
            ...suggestions[suggestionIndex],
            text: value
        };

        cards[cardIndex] = { ...card, suggestions };
        this.facade.set({ ...current, cards });
        this.debounceCommit();
    }
}