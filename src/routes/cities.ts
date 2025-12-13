import { Router } from 'express';
import { getCities, searchCities } from '../controllers/cities';
import { upperCaseCoid } from '../lib/middleware';

const citiesRouter = Router();

citiesRouter.get('/:coid/search', upperCaseCoid, searchCities);
citiesRouter.get('/:coid', upperCaseCoid, getCities);

export default citiesRouter;
