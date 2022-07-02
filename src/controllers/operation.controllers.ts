import { Response, Request } from "express";
import { Operation } from "../entities/Operation";

export const getFullOperationData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const response = await Operation.findBy({ userId: parseInt(id) });

    return res.json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json("Internal server error");
  }
};

export const getTodayOperationData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let operation = await Operation.findOneBy({
      userId: parseInt(id),
      createdAt: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });

    let yesterdayOperation = await Operation.findOneBy({
      userId: parseInt(id),
      createdAt: new Date().getDate() - 1,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    });

    if (!operation) {
      operation = new Operation();
      operation.year = new Date().getFullYear();
      operation.month = new Date().getMonth() + 1;
      operation.createdAt = new Date().getDate();
      operation.userId = parseInt(id);
      operation.userTotalBalance = yesterdayOperation
        ? yesterdayOperation.userTotalBalance
        : 0;

      await operation.save();

      return res.json(operation);
    }

    return res.json(operation);
  } catch (error) {
    error instanceof Error && res.status(500).send("Server internal error");
  }
};

export const getMonthOperationData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { year } = req.body;

    const operation = await Operation.findBy({
      userId: parseInt(id),
      year: year,
    });

    let incomes: number = 0;
    operation.forEach((op) => (incomes += op.userGain));

    let outcomes: number = 0;
    operation.forEach((op) => (outcomes += op.userLost));

    return res.json({
      userGain: incomes,
      userLost: outcomes,
    });
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
