import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined){
    const value = process.env[key] || defaultValue;
    if(value == null){
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}

export const config = {
    jwt: {
        secretKey: required('JWT_SECRET', 'SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
    },
    bcrypt:{
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080)),
    },
    db: {
        host: required('DB_HOST', ''),
        user: required('DB_USER', ''),
        database: required('DB_DATABASE', ''),
        password: required('DB_PASSWORD', ''),
    },
    port: parseInt(required('PORT', 8080)),
    openapi:{
        url: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?_type=json&ServiceKey=Niwi7%2B0aHsdTk6Ee1rHwCWVCzC4wSGpiSShsVLL2%2FHFtQI1l00G3Q6%2FvtolM14t5GdIbYxt32o6GY13rAy4yCA%3D%3D',
        year: '&solYear=',
        month: '&solMonth='
    }
}