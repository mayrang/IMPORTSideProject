import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import * as memberRepository from '../data/auth.js';

const AUTH_ERROR = { message: 'Authentication Error' };

export const isAuth = async (req, res, next) => {
    const authHeader = req.get('Authorization');//front -> back
    if(!(authHeader && authHeader.startsWith('Bearer '))){
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(token, config.jwt.secretKey, async(error, decoded) => {
        if (error) {
            return res.status(401).json(AUTH_ERROR);
        }
        const member = await memberRepository.findById(decoded.id);
        if(!member) {
            return res.status(401).json(AUTH_ERROR);
        }

        req.memberId = member.id;
        req.token = token;

        next();
    });
};
