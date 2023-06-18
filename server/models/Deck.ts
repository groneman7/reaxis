import { model, Schema } from 'mongoose';

export type Deck = {
    _id: string; // This will probably change to match MongoDB's ObjectId structure.
    collaborators: string[]; // userIds
    isCopy: boolean;
    name: string;
    notes: string[]; // noteIds
    notifications: string[] | null; // List of notifications. This will probably also change to be an object of some sort.
    owner: string; // userId
    parentId?: string; // _id of original deck IF isCopy === true
    subscriptions: string[]; // userIds
};

const DeckSchema = new Schema<Deck>({
    collaborators: Array,
    isCopy: Boolean,
    name: String,
    notes: Array,
    notifications: { type: Array, required: false },
    owner: String,
    parentId: { type: String, required: false },
    subscriptions: Array,
});

export const DeckModel = model('Deck', DeckSchema, 'decks');
