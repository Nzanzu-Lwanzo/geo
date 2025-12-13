import { config } from 'dotenv';
config();
import express from 'express';
import countriesRouter from './routes/countries';
import citiesRouter from './routes/cities';
import './lib/redis-client';

const app = express();
const PORT = process.env['PORT'] || 8888;

app.set('trust proxy', true);
app.use(express.json());

// Routes
app.use('/countries', countriesRouter);
app.use('/cities', citiesRouter);

app.listen(PORT, () => console.log('The server is up 🚀'));
