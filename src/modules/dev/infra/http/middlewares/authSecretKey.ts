import { Request, Response, NextFunction } from 'express';

import { LocaleError } from '@shared/errors/LocaleError';
import { generateSecretKey } from '@shared/utils';

type FuncType = (fileName: string, secret: string) => boolean;

const validateSecretKey: FuncType = (fileName, secret) => {
  const rawFile = fileName.split('-')[0];
  const limit = 1000 * 60 * 5;

  const timestamp = Number(
    rawFile
      .split('')
      .filter(n => !isNaN(Number(n)))
      .join(''),
  );

  const expired = timestamp + limit < Date.now();

  const rawSecret = generateSecretKey(timestamp);

  return rawSecret === secret && !expired;
};

export default async function authSecretKey(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  const { filename } = request.query;
  const { secret } = request.params;

  const valid = validateSecretKey(filename as string, secret);

  if (!valid) throw new LocaleError('tokenExpired');

  return next();
}
