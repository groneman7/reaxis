import { model, Schema } from 'mongoose';
import { DetailBlock } from './DetailBlock';

export type Note = {
    _id: string; // This will probably change to match MongoDB's ObjectId structure.
    back: string;
    collaborators: string[]; // userIds
    details: DetailBlock[];
    front: string;
    isCopy: boolean;
    notifications: string[] | null; // List of notifications. This will probably also change to be an object of some sort.
    owner: string; // userId
    parentId?: string; // _id of original collection IF isCopy === true
    subscriptions: string[]; // userIds
};

const NoteSchema = new Schema<Note>({
    back: String,
    collaborators: Array,
    details: Array,
    front: String,
    isCopy: Boolean,
    notifications: { type: Array, required: false },
    owner: String,
    parentId: { type: String, required: false },
    subscriptions: Array,
});

export const NoteModel = model('Note', NoteSchema, 'notes');
