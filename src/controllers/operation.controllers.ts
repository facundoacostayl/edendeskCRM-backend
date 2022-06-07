import { Response, Request } from "express";
import { Operation } from "../entities/Operation";

export const getFullOperationData = async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const response = await Operation.findBy({userId: parseInt(id)});

    return res.json(response);

  }catch(error){
    error instanceof Error && res.status(500).json("Internal server error");
  }
};

export const getTodayOperationData = async (req: Request, res: Response) => {
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

export const getFullClientBalance = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const operation = await Operation.findBy({ userId: parseInt(id) });
    let totalBalance: number = 0;
    operation.forEach((op) => {
      totalBalance += op.userTotalBalance;
    });

    return res.json({ total: totalBalance });
  } catch (error) {
    error instanceof Error && res.status(500).json("Internal server error");
  }
};
