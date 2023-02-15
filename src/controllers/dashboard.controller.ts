import { Response } from "express";
import { RequestExt } from "../interfaces/requestExt.interface";

export const getInfo = (req: RequestExt, res: Response) => {
  try {
    res.json(req.user);
    console.log("Welcome!");
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
