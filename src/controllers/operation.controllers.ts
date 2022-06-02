import { Response, Request } from "express";
import { Operation } from "../entities/Operation";

export const getOperationData = async(req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const operation = await Operation.findOneBy({ userId: parseInt(id) });
    if (!operation) throw new Error("Todavía no hay operaciones");

    return res.json(operation);
  } catch (error) {
    error instanceof Error && res.status(500).send("Server internal error");
  }
};
