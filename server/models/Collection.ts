import { model, Schema } from 'mongoose';
import type { Collection } from '../../types';

const CollectionSchema = new Schema<Collection>({
    decks: Array,
    collaborators: Array,
    isCopy: Boolean,
    name: String,
    notifications: { type: Array, required: false },
    owner: String,
    parentId: { type: String, required: false },
    subscriptions: Array,
});

export const CollectionModel = model('Collection', CollectionSchema, 'collections');
