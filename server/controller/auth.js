import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';

// POST/auth/signup
export async function signup(req, res){
    const { email, password, username, name, phoneNumber } = req.body;
    const found = await userRepository.findByEmail(email);
    if(found){
        return res.status(409).json({ message: `${username} already exists` });
    }
    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const userId = await userRepository.createUser({
        email,
        password: hashed,
        username,
        name,
        phoneNumber
    });
    const token = createJWTToken(userId);
    res.status(201).json({ token, email });
}

// POST/auth/login
export async function login(req, res) {
    const { email, password } = req.body;
    const user = await userRepository.findByEmail(email);
    if(!user){
        return res.status(401).json({ message: 'Invalid user or password'});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid user or password '});
    }
    const token = createJWTToken(user.id);
    res.status(200).json({ token, email });
}

// GET/auth/me
export async function me(req, res, next){
    const user = await userRepository.findById(req.userId);
    if(!user){
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ token: req.token, email: user.email });
}

// POST/auth/newpassword
export async function newpassword(req, res, next){
    const { password, newpassword } = req.body;
    const user = await userRepository.findById(req.userId);
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        return res.status(401).json({ message: 'Invalid password' });
    }
    const hashed = await bcrypt.hash(newpassword, config.bcrypt.saltRounds);
    const userId = await userRepository.revisePassword(req.userId, hashed);
    const token = createJWTToken(userId);
    res.status(201).json({ token });
}

// PUT/auth/setprofile
export async function setprofile(req, res, next){
    await userRepository.reviseProfile(req.userId, req.body);
    res.sendStatus(201);
}

function createJWTToken(id){
    return jwt.sign(
        { id }, 
        config.jwt.secretKey, 
        {
        expiresIn: config.jwt.expiresInSec,
        }
    );
}