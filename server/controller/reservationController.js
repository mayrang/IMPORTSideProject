//POST /reservation
import 'express-async-errors';
import * as reservationReopsitory from '../data/reservation.js'

export async function createReservation(req,res){
    const { rsvDate, startTime, endTime, rsvMemberId } = req.body;
    const insertedId = await reservationReopsitory.create(rsvDate, startTime, endTime, rsvMemberId);

    if(insertedId<1)
        res.sendStatus(400);
    else
        res.sendStatus(201);
    
}

export async function getReservation(req,res){
    let { year, month } = req.query;
    month *=1;
    let startMonth = year + '-'+ month + '-01';
    let endMonth = year + '-' + (month+1) + '-01'

    const a = await reservationReopsitory.getMonthly(startMonth, endMonth);

    console.log(startMonth);console.log(endMonth);

    console.log(a);

    res.sendStatus(200);

}
