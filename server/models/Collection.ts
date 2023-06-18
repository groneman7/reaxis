import { model, Schema } from 'mongoose';

export type Collection = {
    _id: string; // This will probably change to match MongoDB's ObjectId structure.
    collaborators: string[]; // userIds
    decks: string[]; // deckIds
    isCopy: boolean;
    name: string;
    notifications: string[] | null; // List of notifications. This will probably also change to be an object of some sort.
    owner: string; // userId
    parentId?: string; // _id of original collection IF isCopy === true
    subscriptions: string[]; // userIds
};

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
