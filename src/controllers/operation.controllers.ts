import { Response, Request } from "express";
import { Operation } from "../entities/Operation";

export const getOperationData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let operation = await Operation.findOneBy({
      userId: parseInt(id),
      createdAt: new Date().getDate(),
    });

    if (!operation) {
      operation = new Operation();
      operation.year = new Date().getFullYear();
      operation.month = new Date().getMonth() + 1;
      operation.userGain = 0;
      operation.userLost = 0;
      operation.createdAt = new Date().getDate();
      operation.userId = parseInt(id);

      await operation.save();

      return res.json(operation);
    }

    return res.json(operation);
  } catch (error) {
    error instanceof Error && res.status(500).send("Server internal error");
  }
};
