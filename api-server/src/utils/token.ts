import jwt from 'jsonwebtoken';
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

