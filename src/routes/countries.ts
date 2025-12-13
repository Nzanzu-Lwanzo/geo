import { Router } from 'express';
import { getCountries, searchCountries } from '../controllers/countries';

const countriesRouter = Router();

countriesRouter.get('', getCountries);
countriesRouter.get('/search', searchCountries);

export default countriesRouter;
