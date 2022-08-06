import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'express-async-errors';
import * as userRepository from '../data/auth.js';
import { config } from '../config.js';
import * as reservationRepository from '../data/reservation.js'

// POST/auth/signup
export async function signup(req, res){
    const { studentId, password, name, phoneNumber, major, email } = req.body;
    const foundStudentId = await userRepository.findByStudentId(studentId);
    const foundPhoneNumber = await userRepository.findByPhoneNumber(phoneNumber);
    const foundEmail = await userRepository.findByEmail(email);

    if(found){
        return res.status(409).json({ message: `${studentId} already exists` });//오류코드
    }



    const hashed = await bcrypt.hash(password, config.bcrypt.saltRounds);
    const memberId = await userRepository.createUser({
        studentId,
        password: hashed,
        name,
        phoneNumber,
        major,
        email
    });
    const token = createJWTToken(memberId);

    const returnValue  = 
    {
        "jwtToken" : `${token}`,
        "myInfo" : {
            "id": `${memberId}`,
            "name": `${name}`,
            "Posts" : []
        }
    };
    JSON.stringify(returnValue);

    res.status(201).json(returnValue);
}

// POST/auth/login
export async function login(req, res) {
    const { studentId, password } = req.body;
    const member = await userRepository.findByStudentId(studentId);
    if(!member){
        console.log("iderr");
        return res.status(401).json({ message: 'Invalid member or password'});
    }
    const isValidPassword = await bcrypt.compare(password, member.password);
    if (!isValidPassword) {
        console.log("passerr");
        return res.status(401).json({ message: 'Invalid member or password '});
    }
    const token = createJWTToken(member.id);

    console.log(await reservationRepository.getByMemberId(member.id));

    const returnValue  = 
    {
        "jwtToken" : `${token}`,
        "myInfo" : {
            "id": `${member.id}`,
            "name": `${member.name}`,
            "Posts" : await reservationRepository.getByMemberId(member.id)
        }
    };
    JSON.stringify(returnValue);

    res.status(200).json(returnValue);
}

// // GET/auth/me -- check valid member by id
export async function me(req, res, next){
    const member = await userRepository.findById(req.memberId);
    if(!member){
        return res.status(404).json({ message: 'member not found' });
    }

    console.log(member);

    const returnValue  = 
    {
        "jwtToken" : `${req.token}`,
        "myInfo" : {
            "id": `${member.id}`,
            "name": `${member.name}`,
            "Posts" : await reservationRepository.getByMemberId(member.id)
        }
    };
    JSON.stringify(returnValue);

    res.status(200).json(returnValue);
}

// // POST/auth/newpassword
// export async function newpassword(req, res, next){
//     const { password, newpassword } = req.body;
//     const user = await userRepository.findById(req.userId);
//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if(!isValidPassword){
//         return res.status(401).json({ message: 'Invalid password' });
//     }
//     const hashed = await bcrypt.hash(newpassword, config.bcrypt.saltRounds);
//     const userId = await userRepository.revisePassword(req.userId, hashed);
//     const token = createJWTToken(userId);
//     res.status(201).json({ token });
// }

// // PUT/auth/setprofile
// export async function setprofile(req, res, next){
//     await userRepository.reviseProfile(req.userId, req.body);
//     res.sendStatus(201);
// }

function createJWTToken(id){
    return jwt.sign(
        { id }, 
        config.jwt.secretKey, 
        {
        expiresIn: config.jwt.expiresInSec,
        }
    );
}