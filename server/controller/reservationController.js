//POST /reservation
import 'express-async-errors';
import * as reservationRepository from '../data/reservation.js'

export async function createReservation(req,res){
    const { rsvDate, startTime, endTime } = req.body;
    const rsvMemberId = req.memberId;
    const insertedId = await reservationRepository.create(rsvDate, startTime, endTime, rsvMemberId);

    if(insertedId<1){
        res.sendStatus(400);
    }
    else{
        res.sendStatus(201);
    }
    
}

export async function getReservation(req,res){ //getReservation without id
    let { year, month } = req.query;
    const { memberId } = req.query;
    const { reservationId } = req.params;
    // const memberId = req.memberId;
    let startMonth = "";
    let endMonth = "";
    if(year){
        month *=1;
        startMonth = year + '-'+ month + '-01';
        endMonth = year + '-' + (month+1) + '-01'
    }


    // const reservationList = await reservationRepository.getMonthly(startMonth, endMonth);

    const reservationList = await (memberId? (reservationId? reservationRepository.getById(memberId, reservationId) // /reservation/[reservationId] 
                            : reservationRepository.getByMemberId(memberId))  // /reservation?memberId=
                            : reservationRepository.getMonthly(startMonth, endMonth)); ///reservation?year=,month=



    // console.log(reservationList);

    // res.sendStatus(200);

    if(reservationList.length<1){
        res.sendStatus(204);
    }
    else{
        res.status(200).json(reservationList);
    }

}


export async function cancelReservation(req,res){
    const { reservationId } = req.params;
    
    const rsvMemberId= req.memberId;


    const isCanceled = await reservationRepository.cancel(rsvMemberId, reservationId);

    if(isCanceled<1){
        res.sendStatus(400);
    }
    else{
        res.sendStatus(204);
    }
}

export async function updateReservation(req,res){
    const { rsvDate, startTime, endTime } = req.body;
    
    const { reservationId } = req.params;

    const isUpdated = await reservationRepository.update(reservationId, rsvDate, startTime, endTime);
    
    if(isUpdated<1){
        res.sendStatus(400);
    }else{
        const updateReservationInfo = await reservationRepository.getByReservationId(reservationId);

        res.status(200).json(updateReservationInfo);
    }
}
