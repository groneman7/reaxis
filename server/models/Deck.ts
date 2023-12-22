import { model, Schema } from 'mongoose';
import type { Deck } from '../../types';

const DeckSchema = new Schema<Deck>({
    collaborators: Array,
    description: String,
    name: String,
    notes: Array,
    notifications: { type: Array, required: false },
    owner: String,
    parentId: { type: String, required: false },
    subscriptions: Array,
    visibility: String,
});

export const DeckModel = model('Deck', DeckSchema, 'decks');
