export interface Card {
    // Cards will not be individually stored in the database.
    index: number;
    noteId: string;
}

export interface Collaboration {
    collaborators?: string[];
    notifications?: string[];
    subscriptions?: string[]; // List of users who will receive notifications.
}

export interface Collection extends Collaboration {
    _id: string;
    decks: string[];
    name: string;
    owner: string;
}

export interface Deck extends Collaboration {
    _id: string;
    name: string;
    notes: string[];
    owner: string;
    parentId?: string;
}

export interface DetailBlock {
    _id: string;
    color?: string;
    name: string;
}

export type Ease = 1 | 2 | 3 | 4;

export interface Note extends Collaboration {
    _id: string;
    back: string;
    details: DetailBlock[];
    front: string;
    owner: string;
    parentId?: string;
}

export interface Tag {
    _id: string;
    children?: string[];
    label: string;
    owner: string;
    parent?: string;
}

export interface UserCardInfo extends Card {
    active: boolean;
    dueTime: string;
    history: {
        sessionDate: string;
        duration: number;
        ease: Ease;
    }[];
}
