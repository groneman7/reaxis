import { model, Schema } from 'mongoose';
import type { Collection } from '../../types';

const CollectionSchema = new Schema<Collection>({
    decks: Array,
    collaborators: Array,
    name: String,
    notifications: { type: Array, required: false },
    owner: String,
    subscriptions: Array,
});

export const CollectionModel = model('Collection', CollectionSchema, 'collections');
