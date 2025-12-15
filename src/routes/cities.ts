import { Router } from 'express';
import { getCities, searchCities } from '../controllers/cities';
import { upperCaseCoid, validationMiddleware } from '../lib/middleware';
import { coidValidtor, searchHintValidator } from '../lib/validators';

const citiesRouter = Router();

citiesRouter.get(
  '/:coid/search',
  upperCaseCoid,
  [coidValidtor, searchHintValidator],
  validationMiddleware,
  searchCities,
);
citiesRouter.get(
  '/:coid',
  upperCaseCoid,
  coidValidtor,
  validationMiddleware,
  getCities,
);

export default citiesRouter;
