import {Request, Response, NextFunction} from 'express';

const jwtoken = require('jsonwebtoken');
require('dotenv').config();

interface ReqWithUser extends Request {
    user: number
}

module.exports = async (req: ReqWithUser, res:Response, next: NextFunction) => {
    try {

        const token = req.header("token");

        if(!token) {
            return res.status(403).json(false)
        }

        if(jwtoken) {
        const payload = jwtoken.verify(token, "riverpasion")
        req.user = payload.user;
    }else{
        throw new Error("No existe jwtoken")
    }

        next();

    }catch(error) {
        if(error instanceof Error){
        console.error(error.message)
        return res.status(403).json(false)
        }
    }
}
