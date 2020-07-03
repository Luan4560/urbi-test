import bcrypt from 'bcrypt';
import {Request, Response } from 'express';
import {uuid} from 'uuidv4';
import jwt from 'jsonwebtoken';
import {config} from '../config/jwt';

interface IUser {
  id: string,
  name: string,
  email: string,
  password: string
}

const users:IUser[] = [];

class AuthController {
  public async register(req:Request, res: Response) {
    const {name, email, password} = req.body;
    if((!name && !email && !password)) return res.status(400).json({error: "All fields must be provided"});  
    
    const userEmail = users.find(user => user.email === email);

    if(userEmail) return res.status(400).json({error: "Email already exists"});

    const hash = await bcrypt.hash(password, 8);

    const user = {
      id: uuid(),
      name,
      email,
      password: hash,
    }
  
    users.push(user);
    return res.status(200).json({id: user.id, name, email});
  }
  
  public async signIn(req:Request, res: Response) {
    const { email, password} = req.body;
    if((!email && !password)) return res.status(400).json({error: "All fields must be provided"});  
    
    const user = users.find(user => user.email === email);
    
    if(!user) return res.status(404).json({error: "Email doesn't exists"})

    if(await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: '2d'
      });
      return res.status(200).json({user, token});
    }
    return res.status(401).json({error: "Incorrect password"});
  }
}

export default new AuthController();