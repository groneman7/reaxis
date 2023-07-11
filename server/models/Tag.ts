import { model, Schema } from 'mongoose';
import type { Tag } from '../../types';

const TagSchema = new Schema<Tag>({
    children: { type: Array, required: false },
    label: String,
    owner: String,
    parent: { type: Array, required: false },
});

export const TagModel = model('Tag', TagSchema, 'tags');
