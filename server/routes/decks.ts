import express from 'express';
export const decks = express.Router();
import { DeckModel } from '../models';

const notFound = ['No decks exist.', 'A deck with the provided ID does not exist.'];

decks.get('/', async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        console.warn('An unhandled query was submitted.');
        res.send(req.query);
    } else {
        const result = await DeckModel.find({});
        return !!result ? res.send(result) : res.status(404).send(notFound[0]);
    }
});

decks.get('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await DeckModel.findById(id);
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});

decks.post('/', async (req, res) => {
    // Implement input validation here.
    const newData = new DeckModel(req.body);
    res.status(201).send(await newData.save());
});

decks.put('/', async (req, res) => {
    const { match, set } = req.body;

    const result = await DeckModel.updateMany({ ...match }, { $set: { ...set } });
    return !!result
        ? res.status(200).send(result)
        : res.status(400).send('An unknown error occured.');
});

decks.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const result = await DeckModel.findByIdAndUpdate(
        id,
        { $set: { ...body } },
        { returnDocument: 'after' }
    );
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});

decks.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await DeckModel.findByIdAndDelete(id);
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});
