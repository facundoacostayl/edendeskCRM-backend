import { Request, Response } from "express";
import { Client } from "../config/entities/Client";
import { Operation } from "../config/entities/Operation";
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

export const getItems = async (req: Request, res: Response) => {
  try {
    //Require params
    const { userid } = req.params;

    //Data request
    const response = await getClients(parseInt(userid));

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
    const { userid } = req.params;

    //Require query (page number and limit of clients to be returned)
    const { page, size, sortBy, orderBy } = req.query;

    //Data request
    const response = await getPaginationClientList(parseInt(userid), parseInt(page as string), parseInt(size as string), sortBy as PaginationArgsType['sortBy'], orderBy as PaginationArgsType['orderBy'],);

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
    const { userid, clientid } = req.params;

    //Data request
    const response = await getClient(parseInt(userid), parseInt(clientid));

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
    //Require Body
    const { nombre, apellido, telefono, userid } = req.body;

    //Data request
    const response = await createClient(nombre, apellido, telefono, userid);

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
    const { userid, clientId } = req.params;

    //Req body
    const { amount } = req.body;

    //Data request
    const response = await addToClientBalance(
      parseInt(userid),
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
    const { userid, clientId } = req.params;

    //Data request
    const response = await substractFromClientBalance(
      parseInt(userid),
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
    const { userid } = req.params;

    //Req query
    const { nameSearch } = req.query;

    //Early return if search input is empty.
    if (nameSearch!.toString().length <= 0) return;

    //Data request
    const response = await searchClient(
      parseInt(userid),
      nameSearch!.toString()
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
    const { userid, clientid } = req.params;

    //Data request
    const response = await deleteClient(parseInt(userid), parseInt(clientid));

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
    const { userid, clientid } = req.params;
    //Req body
    const { body } = req;

    //Data request
    const response = await updateClient(
      parseInt(userid),
      parseInt(clientid),
      body
    );

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    error instanceof Error && res.status(500).json("Internal server error");
  }
};
