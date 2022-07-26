import { db } from '../db/database.js';

export async function findByStudentId(studentId){
    return db
        .execute('SELECT * FROM member WHERE studentId=?', [studentId])//
        .then((result) => result[0][0]);//TODO: 리턴값 확인, 변경 필요?
}

export async function findById(id){
    return db
        .execute('SELECT * FROM member WHERE id=?', [id]) //
        .then((result) => result[0][0]);
}

export async function createUser(user){
    const { studentId, password, name, phoneNumber, major, email } = user;
    return db
        .execute(
            'INSERT INTO member (studentId, password, name, phoneNumber, major, email) VALUES(?, ?, ?, ?, ?, ?)',
            [studentId, password, name, phoneNumber, major, email]
        )
        .then((result) => result[0].insertId);//TODO: 리턴값 확인, 변경필요
}

// export async function revisePassword(userId, newpassword){
//     return db.execute(
//         'UPDATE user SET password=? WHERE id=?', [newpassword, userId]
//     )
//     .then(result => result[0].insertId);
// }

// export async function reviseProfile(userId, value){
//     const { name, username, website_url, biography, email, phoneNumber, gender } = value;
//     db
//     .execute('UPDATE user SET name=?, website_url=?, username=?, biography=?, email=?, phoneNumber=?, gender=? WHERE id=?',
//              [name, username, website_url, biography, email, phoneNumber, gender, userId]
//     )
//     .then(result => result[0][0]);
// }