import { model, Schema } from 'mongoose';
import type { DetailBlock } from '../../types';

const DetailBlockSchema = new Schema<DetailBlock>({
    color: { type: String, required: false },
    name: String,
});

export const DetailBlockModel = model('Detail Block', DetailBlockSchema, 'detail_blocks');
