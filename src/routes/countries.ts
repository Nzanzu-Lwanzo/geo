import { Router } from 'express';
import { getCountries, searchCountries } from '../controllers/countries';
import { validationMiddleware } from '../lib/middleware';
import {
  languageValidator,
  searchHintValidator,
} from '../lib/validators/validators';

const countriesRouter = Router();

countriesRouter.get('', getCountries);
countriesRouter.get(
  '/search',
  [languageValidator, searchHintValidator],
  validationMiddleware,
  searchCountries,
);

export default countriesRouter;
