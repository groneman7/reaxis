import express from 'express';
export const collections = express.Router();
import { CollectionModel } from '../models';

const notFound = ['No collections exist.', 'A collection with the provided ID does not exist.'];

collections.get('/', async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        console.warn('An unhandled query was submitted.');
        res.send(req.query);
    } else {
        const result = await CollectionModel.find({});
        return !!result ? res.send(result) : res.status(404).send(notFound[0]);
    }
});

collections.get('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await CollectionModel.findById(id);
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});

collections.post('/', async (req, res) => {
    // Implement input validation here.
    const newData = new CollectionModel(req.body);
    res.status(201).send(await newData.save());
});

collections.put('/', async (req, res) => {
    const { match, set } = req.body;

    const result = await CollectionModel.updateMany({ ...match }, { $set: { ...set } });
    return !!result
        ? res.status(200).send(result)
        : res.status(400).send('An unknown error occured.');
});

collections.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const result = await CollectionModel.findByIdAndUpdate(
        id,
        { $set: { ...body } },
        { returnDocument: 'after' }
    );
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});

collections.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const result = await CollectionModel.findByIdAndDelete(id);
    return !!result ? res.status(200).send(result) : res.status(404).send(notFound[1]);
});
