import { Request, Response } from "express";

export const getInfo = (req: Request, res: Response) => {
  try {
    res.json(req.user);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
