import { Request, Response } from "express";
import { PaginationArgsType } from "../interfaces/pagination.interface";
import {
  getClients,
  getPaginationClientList,
  getClient,
  createClient,
  addToClientBalance,
  substractFromClientBalance,
  searchClient,
  deleteClient,
  updateClient,
} from "../services/client.service";
import { ErrorWithStatus, throwErrorWithStatus } from "../utils/error.handle";

export const getItems = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Data request
    const response = await getClients(parseInt(userId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const getPaginationItemList = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Require query (page number and limit of clients to be returned)
    const { page, size, sortBy, orderBy } = req.query;

    //Data request
    const response = await getPaginationClientList(
      parseInt(userId),
      parseInt(page as string),
      parseInt(size as string),
      sortBy as PaginationArgsType["sortBy"],
      orderBy as PaginationArgsType["orderBy"]
    );

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId, clientId } = req.params;

    //Data request
    const response = await getClient(parseInt(userId), parseInt(clientId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userId } = req.params;

    //Require Body
    const { firstname, lastName, tel } = req.body;

    //Data request
    const response = await createClient(
      firstname,
      lastName,
      tel,
      parseInt(userId)
    );

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const addToItemBalance = async (req: Request, res: Response) => {
  try {
    //Req params
    const { userId, clientId } = req.params;

    //Req body
    const { amount } = req.body;

    //Data request
    const response = await addToClientBalance(
      parseInt(userId),
      parseInt(clientId),
      parseInt(amount)
    );

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const substractFromItemBalance = async (req: Request, res: Response) => {
  try {
    //Req body
    const { amount } = req.body;

    //Req params
    const { userId, clientId } = req.params;

    //Data request
    const response = await substractFromClientBalance(
      parseInt(userId),
      parseInt(clientId),
      parseInt(amount)
    );

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ error: error.message });
  }
};

export const searchItem = async (req: Request, res: Response) => {
  try {
    //Req params
    const { userId } = req.params;

    //Req query
    const { nameSearch } = req.query;

    //Early return if search input is empty.
    if (!nameSearch || nameSearch.toString().length <= 0) return;

    //Data request
    const response = await searchClient(
      parseInt(userId),
      nameSearch.toString()
    );

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    //Req params
    const { userId, clientId } = req.params;

    //Data request
    const response = await deleteClient(parseInt(userId), parseInt(clientId));

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(response.statusCode).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json(error.message);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    //Req params
    const { userId, clientId } = req.params;
    //Req body
    const { body } = req;

    //Data request
    const response = await updateClient(
      parseInt(userId),
      parseInt(clientId),
      body
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    error instanceof Error && res.status(500).json("Internal server error");
  }
};
