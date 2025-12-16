import { Router } from 'express';
import { getCities, searchCities } from '../controllers/cities';
import { upperCaseCoid, validationMiddleware } from '../lib/middleware';
import {
  coidValidator,
  searchHintValidator,
} from '../lib/validators/validators';

const citiesRouter = Router();

citiesRouter.get(
  '/:coid/search',
  upperCaseCoid,
  [coidValidator, searchHintValidator],
  validationMiddleware,
  searchCities,
);
citiesRouter.get(
  '/:coid',
  upperCaseCoid,
  coidValidator,
  validationMiddleware,
  getCities,
);

export default citiesRouter;
