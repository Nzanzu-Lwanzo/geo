import { config } from 'dotenv';
config();
import express from 'express';
import { getFileContent, getISOCodes } from './lib/helpers';
import type { City, Country } from './lib/@types';
import path = require('node:path');

const app = express();
const PORT = process.env['PORT'] || 8888;

app.use(express.json());

//#region Helpers
const getFilePath = (relPath: string) => path.join(__dirname, relPath);
//#endregion

// Get all the countries
app.get('/countries', async (req, res) => {
  const countries = await getFileContent<Country[]>(getFilePath('data/$.json'));
  res.json(countries);
});

// Get cities
app.get('/cities/:coid', async (req, res) => {
  try {
    const cities = await getFileContent<City[]>(
      getFilePath(`data/${req.params.coid.toUpperCase()}.json`),
    );
    res.json(cities);
  } catch {
    res.json({
      msg: 'Error, invalid coid parameter',
      coids: await getISOCodes('data'),
    });
  }
});

app.listen(PORT, () => console.log('The server is up 🚀'));
