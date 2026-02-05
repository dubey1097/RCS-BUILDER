export type MessageType = 'text' | 'rich-card' | 'carousel';

export interface BaseMessage {
  id: string;
  type: MessageType;
}

/* TEXT */
export interface TextMessage extends BaseMessage {
  type: 'text';
  content: string;
  suggestions?: Suggestion[];
}

/* RICH CARD */
export interface RichCard {
  id: string;
  title: string;
  description: string;
  suggestions?: Suggestion[];
}

/* RICH CARD MESSAGE */
export interface RichCardMessage extends BaseMessage {
  type: 'rich-card';
  card: RichCard;
  suggestions?: Suggestion[];
  
}

/* CAROUSEL */
export interface CarouselMessage extends BaseMessage {
  type: 'carousel';
  cards: RichCard[];
  suggestions?: Suggestion[];
}

export interface Suggestion {
  id: string;
  text: string;
}


export type MessageConfig =
  | TextMessage
  | RichCardMessage
  | CarouselMessage;
