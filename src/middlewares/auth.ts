import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { config as authConfig } from '../config/jwt'
import {Request, Response, NextFunction} from 'express';

export default async (req:Request, res:Response, next:NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret) as
     {id: string};

    res.header('userId', decoded.id); 

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};