import { model, Schema } from 'mongoose';
import type { Deck } from '../../types';

const DeckSchema = new Schema<Deck>({
    collaborators: Array,
    name: String,
    notes: Array,
    notifications: { type: Array, required: false },
    owner: String,
    parentId: { type: String, required: false },
    subscriptions: Array,
});

export const DeckModel = model('Deck', DeckSchema, 'decks');
