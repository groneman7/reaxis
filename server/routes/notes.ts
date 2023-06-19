import express from 'express';
export const notes = express.Router();
import { DeckModel, NoteModel } from '../models';

const notFound = ['No notes exist.', 'A note with the provided ID does not exist.'];

notes.get('/', async (req, res) => {
    if ((Object.keys(req.query).length = 0)) {
        console.warn('No query was submitted.');
        res.status(400).send('No query was submitted.');
    } else {
        if (req.query.deckId) {
            const result = await DeckModel.find({ _id: req.query.deckId });
            return !!result ? res.send(result) : res.status(404).send(notFound[0]);
        }
    }
});

notes.get('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await NoteModel.findById(id);
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});

notes.post('/', async (req, res) => {
    // Implement input validation here.
    const newData = new NoteModel(req.body);
    res.status(201).send(await newData.save());
});

notes.put('/', async (req, res) => {
    const { match, set } = req.body;

    const result = await NoteModel.updateMany({ ...match }, { $set: { ...set } });
    return !!result
        ? res.status(200).send(result)
        : res.status(400).send('An unknown error occured.');
});

notes.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const result = await NoteModel.findByIdAndUpdate(
        id,
        { $set: { ...body } },
        { returnDocument: 'after' }
    );
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});

notes.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await NoteModel.findByIdAndDelete(id);
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});
