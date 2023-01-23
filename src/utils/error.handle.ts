import {Response} from 'express';

export const errorHandler = (res: Response, message: string, status: number) => {
    res.status(status);
    res.send({error: message});
};

