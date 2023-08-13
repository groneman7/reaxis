import { model, Schema } from 'mongoose';
import type { Note } from '../../types';

const NoteSchema = new Schema<Note>({
    back: String,
    collaborators: Array,
    details: Array,
    front: String,
    notifications: { type: Array, required: false },
    owner: String,
    parentId: { type: String, required: false },
    subscriptions: Array,
});

export const NoteModel = model('Note', NoteSchema, 'notes');
