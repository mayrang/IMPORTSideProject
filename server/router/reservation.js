import express from 'express'
import 'express-async-errors'
import { isAuth } from '../middleware/auth.js';
import * as reservationController from '../controller/reservationController.js'


const router = express.Router();

router.post('/',isAuth, reservationController.createReservation); 

router.get('/:reservationId',isAuth, reservationController.getReservation);
router.get('/',reservationController.getReservation);

router.put('/:reservationId',isAuth, reservationController.updateReservation);

router.delete('/:reservationId',isAuth,reservationController.cancelReservation); 



export default router;