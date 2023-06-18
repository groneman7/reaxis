import { model, Schema } from 'mongoose';

export type Tag = {
    _id: string; // This will probably change to match MongoDB's ObjectId structure.
    children?: string[]; // List of tagIds
    label: string;
    owner: string;
    parent?: string; // tagId
};

const TagSchema = new Schema<Tag>({
    children: { type: Array, required: false },
    label: String,
    owner: String,
    parent: { type: Array, required: false },
});

export const TagModel = model('Tag', TagSchema, 'tags');
