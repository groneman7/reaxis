import express from 'express';
import mongoose from 'mongoose';
import { Database } from './config';
import * as Routes from './routes';

// Initialize app and middleware
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Headers, Access-Control-Allow-Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
    );
    next();
});

// Connect to the database

mongoose
    .set('strictQuery', false)
    .connect(Database.mongoUri, Database?.mongoOptions)
    .then(() =>
        console.info(
            `Successfully CONNECTED to Reaxis (${Database.default}) as ${
                Database.user
            } on ${Date()}`
        )
    )
    .catch((error) => console.error(`FAILED to connect to Reaxis.\n`, error));

// Define routes
app.use('/api/decks', Routes.decks);

// Define port and listen
const port = 9000;
app.listen(port, () => console.info(`Successfully STARTED server on port ${port}.`));
