import { Response, Request } from "express";
import { getFullOperationData, getTodayOperationData, getMonthOperationData } from "../services/operation.service";

export const getFullItemData = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const response = await getFullOperationData(parseInt(userid));

    if(response.responseType === "Error") {
      throw new Error(response.message)
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json(error.message);
  }
};

export const getTodayItemData = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;

    const response = await getTodayOperationData(parseInt(userid));

    return res.status(response!.statusCode).json(response);

  } catch (error) {
    error instanceof Error && res.status(500).send("Server internal error");
  }
};

export const getMonthItemData = async (req: Request, res: Response) => {
  try {
    const { userid } = req.params;
    const { month } = req.body; //YEAR SHOULD MATCH TOO

    const response = await getMonthOperationData(parseInt(userid), parseInt(month));

    return res.status(response.statusCode).json(response);
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
