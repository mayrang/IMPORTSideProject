import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

const validateCredential = [
    body('studentId')
        .trim()
        .notEmpty()
        .withMessage('invalid studentId'),
    body('password')
        .trim()
        .isLength({ min: 5 })//TODO:아이디에 대소문자 등등에따라 제약조건 변경
        .withMessage('password should be at least 5 characters'),
    validate,
];

const validateSignup = [
    body('name').trim().notEmpty().withMessage('name is missing'),
    body('phoneNumber').trim().notEmpty().withMessage('phoneNumber is missing'),
    body('major').trim().notEmpty().withMessage('major is missing'),
    body('email').trim().notEmpty().isEmail().normalizeEmail().withMessage('email is missing'),
    validate,
];

// POST/auth/signup
router.post('/signup', validateCredential, validateSignup, authController.signup);


// POST/auth/login
router.post('/login', validateCredential, authController.login);

// GET/auth/me
// router.get('/me', isAuth, authController.me);

// POST/auth/newpassword
// router.post('/newpassword', isAuth, body('newpassword').trim().isLength({ min: 5 }).withMessage('password should be at least 5 characters'), authController.newpassword);

// PUT/auth/setprofile
// router.put('/setprofile', isAuth, validateSignup, authController.setprofile);

export default router;