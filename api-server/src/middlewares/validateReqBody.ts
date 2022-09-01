import { NextFunction, Request, Response } from "express";
import Joi from "joi";


const validateRequestBody = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const value = schema.validate(req.body, { abortEarly: false });
    const { error } = value;
    if (error) {
      return res.status(422).json({
        message: 'The request validation failed.',
        details: error.details
      });
    }
    return next();
  };
};

export default validateRequestBody;