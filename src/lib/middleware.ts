import type { NextFunction, Request, Response } from 'express';

export function upperCaseCoid(
  req: Request<{ coid: string }>,
  res: Response,
  next: NextFunction,
) {
  req.params.coid = req.params.coid.toUpperCase();
  next();
}
