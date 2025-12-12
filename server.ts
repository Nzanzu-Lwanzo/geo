import express from 'express';
import { getFileContent, getISOCodes } from './lib/helpers.ts';
import type { City, Country } from './lib/@types.ts';

const app = express();
app.use(express.json());

// Get all the countries
app.get('/countries', async (req, res) => {
  const countries = await getFileContent<Country[]>('data/$.json');
  res.json(countries);
});

// Get cities
app.get('/cities/:coid', async (req, res) => {
  try {
    const cities = await getFileContent<City[]>(
      `data/${req.params.coid.toUpperCase()}.json`,
    );
    res.json(cities);
  } catch {
    res.json({
      msg: 'Error, invalid coid parameter',
      coids: await getISOCodes('data'),
    });
  }
});

app.listen(8888, () => console.log('Server is up and running'));
