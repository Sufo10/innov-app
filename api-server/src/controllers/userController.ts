import {
  NextFunction, Request, RequestHandler, Response,
} from 'express';
import User, { IUser } from '../database/Models/userModel';
import { createToken, setCookieExpireTime } from '../utils/utilFunctions';

export const register: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password }: IUser = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) return res.status(409).json({ message: 'User already exists' });

    const user = await User.create({
      name, email, password,
    });

    return res.status(201).json({ message: 'Registration Successful', user });
  } catch (error: any) {
    return res.status(500).json({ error: error });
  }
};

export const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: IUser = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');

    if (!user) return res.status(404).json({ message: 'Email not found' });

    const condition = await user.comparePassword(password);

    if (!condition) return res.status(401).json({ message: 'Password is incorrect' });

    const token = createToken({ id: user._id, email });
    return res.status(200).cookie('token', token, { httpOnly: true, expires: setCookieExpireTime() })
      .json({ message: 'Login Successful', token });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

export const updateUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const user = await User.findById({ _id: id });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, { new: true });

    return res.json({ user: updatedUser, message: 'Update Successful' }).status(200);
  } catch (error: any) {
    return res.status(500).json({ error: error });
  }
};

export const deleteUser: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const user = await User.findById({ _id: id });
    console.log(user);

    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.findByIdAndDelete({ _id: id });

    return res.json({ message: 'User Deleted Successfully' }).status(200);
  } catch (error: any) {
    return res.status(500).json({ error: error });
  }
};

export const getAllUsers: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    return res.json({ users }).status(200);

  } catch (error: any) {
    return res.status(500).json({ error: error });
  }
};
