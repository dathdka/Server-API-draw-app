import jwt from 'jsonwebtoken'
import 'dotenv/config'

interface DecodeToken {
    id: string,
    email : string,
    username : string
}

export const decodeToken = (token: string): DecodeToken =>{
    const decoded = jwt.verify(token, `${process.env.SECRET_JWT}`) as DecodeToken
    return decoded;
}