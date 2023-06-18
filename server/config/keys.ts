import { ConnectOptions } from 'mongoose';

type Keys = {
    project: string;
    user: string;
    password: string;
    default: string;
    mongoOptions: ConnectOptions;
};

type MongoUri = string;

const keys: Keys = {
    project: 'main.us6psyp.mongodb.net',
    user: 'admin',
    password: 'OeifDUpq9r6twWtA',
    default: 'flashcards',
    mongoOptions: {},
};

const mongoUri: MongoUri = `mongodb+srv://${keys.user}:${keys.password}@${keys.project}/${keys.default}?retryWrites=true&w=majority`;
// mongodb+srv://admin:OeifDUpq9r6twWtA@main.us6psyp.mongodb.net/flashcards?retryWrites=true&w=majority

export const Database = {
    mongoUri,
    ...keys,
};
