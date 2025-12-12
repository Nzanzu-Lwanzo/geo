import express from 'express';
import { getFileContent } from './lib/helpers.ts';
import type { Country } from './lib/@types.ts';

const app = express();
app.use(express.json());

// Get all the countries
app.get('/countries', async (req, res) => {
  const countries = await getFileContent<Country[]>('data/$.json');
  res.json(countries);
});

app.listen(8888, () => console.log('Server is up and running'));
