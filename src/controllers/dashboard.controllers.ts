import {Request, Response} from 'express';
import {AppDataSource} from '../config/db/db';

interface ReqWithUser extends Request {
    user?: number
}

export const getInfo = (req: ReqWithUser, res: Response) => {
    try {
        res.json(req.user)
    }catch(error) {
        if(error instanceof Error) {
            console.error(error.message)
            res.status(500).json({error: error.message})
        }
    }
}