import { db } from '../db/database.js';


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
        .execute(`select * from reservation where rsvDate >= ? AND rsvDate < ?`, 
        [startDate, endDate])
        .then((result) => result[0]);
}