export interface Card {
    // Cards will not be individually stored in the database.
    index: number;
    noteId: string;
}

export interface Collaboration {
    collaborators?: { userId: string; permission: 'editor' | 'commenter' | 'owner' }[];
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
    description: string;
    name: string;
    notes: string[];
    owner: string;
    parentId?: string;
    visibility: 'draft' | 'closed' | 'private' | 'public'; // Draft: Deck is not valid and/or has not been published for the first time; Closed: Deck is only accessible to the owner (and editors?); Private: Deck is only accessible to its collaborators and others who have specifically been granted access; Public: Deck is accessible to everyone and can be found in a general search of all Reaxis decks.
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
