import { model, Schema } from 'mongoose';

export type DetailBlock = {
    _id: string; // This will probably change to match MongoDB's ObjectId structure.
    color?: string;
    name: string;
};

const DetailBlockSchema = new Schema<DetailBlock>({
    color: { type: String, required: false },
    name: String,
});

export const DetailBlockModel = model('Detail Block', DetailBlockSchema, 'detail_blocks');
