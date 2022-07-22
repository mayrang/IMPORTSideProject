import { db } from '../db/database.js';

export async function findByEmail(email){
    return db
        .execute('SELECT * FROM user WHERE email=?', [email])//
        .then((result) => result[0][0]);
}

export async function findById(id){
    return db
        .execute('SELECT * FROM user WHERE id=?', [id]) //
        .then((result) => result[0][0]);
}

export async function createUser(user){
    const { email, password, username, name, phoneNumber} = user;
    return db
        .execute(
            'INSERT INTO user (email, password, username, name, phoneNumber) VALUES(?, ?, ?, ?, ?)',
            [email, password, username, name, phoneNumber]
        )
        .then((result) => result[0].insertId);
}

export async function revisePassword(userId, newpassword){
    return db.execute(
        'UPDATE user SET password=? WHERE id=?', [newpassword, userId]
    )
    .then(result => result[0].insertId);
}

export async function reviseProfile(userId, value){
    const { name, username, website_url, biography, email, phoneNumber, gender } = value;
    db
    .execute('UPDATE user SET name=?, website_url=?, username=?, biography=?, email=?, phoneNumber=?, gender=? WHERE id=?',
             [name, username, website_url, biography, email, phoneNumber, gender, userId]
    )
    .then(result => result[0][0]);
}