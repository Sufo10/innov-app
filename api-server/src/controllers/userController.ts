import bcrypt from 'bcrypt';
import { NextFunction, Request, RequestHandler, Response } from "express";
import User, { IUser } from "../database/Models/userModel";
import { createToken } from '../utils/token';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password }: IUser = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(409).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashPass });
    await user.save();
    return res.status(201).json({ user });
  } catch (error: any) {
    return res.json({ error });
  }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found' });

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) return res.status(401).json({ message: 'Password is incorrect' });

    const token = createToken({ id: user._id, email });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24
    });
    return res.json({ name: user.name, token }).status(200);
  } catch (error: any) {
    return res.json({ error });
  }
};