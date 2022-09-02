/* eslint-disable consistent-return */
/* eslint-disable func-names */
import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';
import shortid from "short-uuid";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword: (pass: string) => Promise<boolean>;
}

const userSchema: Schema = new Schema({
  _id: { type: String, default: shortid.generate() },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (pass: string): Promise<boolean> {
  return bcrypt.compare(pass, this.password);
};

export default model<IUser>("User", userSchema);
