import type { Request, Response } from 'express';
import { CountryCities } from '../lib/@types';
import { getFileContent, getFilePath, getISOCodes } from '../lib/helpers';
import fs from 'node:fs';

export async function getCities(req: Request<{ coid: string }>, res: Response) {
  try {
    const stream = fs.createReadStream(
      getFilePath(`data/${req.params.coid}.json`),
    );

    stream.on('data', (c) => res.write(c));
    stream.on('end', () => res.end());
  } catch {
    res.json({
      msg: 'Error, invalid coid parameter',
      coids: await getISOCodes('data'),
    });
  }
}

export async function searchCities(
  req: Request<{ coid: string }, any, any, { q: string | undefined }>,
  res: Response,
) {
  if (!req.query.q || !req.params.coid) return res.sendStatus(404);
  const country = await getFileContent<CountryCities>(
    getFilePath(`data/${req.params.coid}.json`),
  );
  if (!country) return res.sendStatus(404);

  const cities = country.cities.filter((city) =>
    city.name
      .trim()
      .toLowerCase()
      .startsWith(req.query.q!.trim().toLowerCase()),
  );

  return res.json(cities);
}
