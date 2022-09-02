/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/Models/userModel';
import config from '../config/config';

export interface IPayload {
  id: string,
  email: string;
}
export const createToken = (payload: IPayload) => {
  const token = jwt.sign(payload, config.SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(403).json({ message: 'Forbidden' });

    const { id } = jwt.verify(token, config.SECRET_KEY) as IPayload;

    const user = await User.findById({ _id: id });

    if (!user) return res.status(404).json({ message: 'Unauthorized' });

    return next();

  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const setCookieExpireTime = (): Date => {
  const now = new Date();
  const time = now.getTime();
  const expireTime = time + 1000 * 60 * 60 * 24;
  now.setTime(expireTime);
  return now;
};