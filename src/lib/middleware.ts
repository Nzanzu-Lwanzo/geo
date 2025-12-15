import type { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export function upperCaseCoid(
  req: Request<{ coid: string }>,
  res: Response,
  next: NextFunction,
) {
  req.params.coid = req.params.coid.toUpperCase();
  next();
}

export function validationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = validationResult(req);
  if (!result.isEmpty()) return res.json(result.array());

  (req as Request & { data: object }).data = matchedData(req, {
    includeOptionals: true,
    onlyValidData: true,
  });
  return next();
}
