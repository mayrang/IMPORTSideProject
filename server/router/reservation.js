import express from 'express'
import 'express-async-errors'
import { isAuth } from '../middleware/auth.js';
import * as reservationController from '../controller/reservationController.js'


const router = express.Router();

router.post('/',reservationController.createReservation); 

router.get('/',reservationController.getReservation);

export default router;