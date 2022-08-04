import { db } from '../db/database.js';

const getQuery = `select member.id as memberId, member.name, reservation.id as reservationId, 
rsvDate, startTime, endTime from member LEFT JOIN reservation ON member.id = reservation.rsvMemberId`;

export async function create(rsvDate, startTime, endTime, rsvMemberId){
    return db
        .execute(`INSERT INTO reservation(rsvDate, startTime, endTime, rsvMemberId) 
        SELECT ?, ?, ? ,?
        FROM DUAL WHERE (SELECT COUNT(*) cnt
				FROM reservation
				WHERE startTime < ?
				AND endTime > ?
                )<1
        `, [rsvDate, startTime, endTime, rsvMemberId, endTime, startTime ])
        .then((result) => result[0].insertId);
}

export async function getMonthly(startDate, endDate){
    return db
        .execute(`${getQuery} WHERE rsvDate >= ? AND rsvDate < ?`, 
        [startDate, endDate])
        .then((result) => result[0]);
}

export async function getByMemberId(memberId){
    return db
        .execute(`${getQuery} WHERE rsvMemberId = ?`, 
        [memberId])
        .then((result) => result[0]);
}


export async function getById(memberId, reservationId){
    return db
        .execute(`${getQuery} WHERE rsvMemberId = ? AND reservation.id = ?`, 
        [memberId, reservationId])
        .then((result) => result[0][0]);
}

export async function cancel(rsvMemberId, rsvId){
    return db
        .execute(`DELETE FROM reservation WHERE rsvMemberId = ? and id = ?;`, 
        [rsvMemberId, rsvId])
        .then((result) => result[0].affectedRows);
}

export async function update(reservationId, rsvMemberId, rsvDate, startTime, endTime){
    return db
        .execute(`UPDATE reservation
        SET rsvDate = ?, startTime = ?, endTime = ?
        WHERE id = ? and rsvMemberId = ?`, 
        [rsvDate, startTime, endTime, reservationId,rsvMemberId])
        .then((result) => result[0].affectedRows);
}

export async function getByReservationId(reservationId){
    return db
        .execute(`${getQuery} WHERE reservation.id = ?`, 
        [reservationId])
        .then((result) => result[0][0]);
}