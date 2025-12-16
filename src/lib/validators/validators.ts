import { param, query } from 'express-validator';

export const coidValidtor = param('coid')
  .escape()
  .notEmpty({ ignore_whitespace: false })
  .withMessage('coid param is required!')
  .isISO31661Alpha2()
  .withMessage('this ISO code is invalid');

export const searchHintValidator = query('q')
  .notEmpty({ ignore_whitespace: false })
  .withMessage('You must provide q (search hint)!')
  .isString()
  .withMessage('q(search hint) must be a string!');

export const languageValidator = query('l')
  .notEmpty({
    ignore_whitespace: false,
  })
  .withMessage('You must provide l (language)!')
  .isIn(['fr', 'en'])
  .withMessage('l(language) is either fr or en!');

