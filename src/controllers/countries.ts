import type { Request, Response } from 'express';
import { getFileContent, getFilePath } from '../lib/helpers';
import { Country } from '../lib/@types';
import fs from 'node:fs';

export async function getCountries(req: Request, res: Response) {
  const stream = fs.createReadStream(getFilePath('data/$.json'));
  stream.on('data', (c) => res.write(c));
  stream.on('end', () => res.end());
}

export async function searchCountries(
  req: Request<
    any,
    any,
    any,
    { q: string | undefined; l: 'en' | 'fr' | undefined }
  >,
  res: Response,
) {
  if (!req.query.q || !req.query.l) return res.sendStatus(404);
  const countries = await getFileContent<Country[]>(getFilePath('data/$.json'));
  const foundCountries = countries?.filter((country) =>
    country.name[req.query.l!]
      .toLocaleLowerCase()
      .startsWith(req.query.q!.toLowerCase()),
  );

  return res.json(foundCountries);
}
