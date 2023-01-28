import { Request, Response } from "express";
import { Client } from "../config/entities/Client";
import { Operation } from "../config/entities/Operation";
import {
  getClients,
  getClient,
  createClient,
  addToClientBalance,
  substractFromClientBalance,
  searchClient,
  deleteClient,
  updateClient
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

    return res.json(response);
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

    return res.json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    //Require Body
    const { nombre, apellido, telefono, userId } = req.body;

    //Data request
    const response = await createClient(nombre, apellido, telefono, userId);

    //Checking if data type is "Error", otherwise throwing error
    if (response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.json(response);
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

    return res.json(response);
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

    return res.json(response);
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

    return res.json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ error: error.message });
  }
};

export const orderByClientNameAsc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const clientsSorted = await Client.query(
      'SELECT * FROM clients WHERE "userId" = $1 ORDER BY nombre ASC',
      [id]
    );

    return res.json(clientsSorted);
  } catch (error) {
    error instanceof Error && res.status(500).json("Server internal error");
  }
};

export const orderByClientNameDesc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const clients = await Client.query(
      'SELECT * FROM clients WHERE "userId" = $1 ORDER BY nombre DESC',
      [id]
    );

    return res.json(clients);
  } catch (error) {
    error instanceof Error && res.status(500).json("Server internal error");
  }
};

export const orderByClientBalanceAsc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const clients = await Client.query(
      'SELECT * FROM clients WHERE "userId" = $1 ORDER BY saldo ASC',
      [id]
    );

    return res.json(clients);
  } catch (error) {
    error instanceof Error && res.status(500).json("Server internal error");
  }
};

export const orderByClientBalanceDesc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clients = await Client.query(
      'SELECT * FROM clients WHERE "userId" = $1 ORDER BY saldo DESC',
      [id]
    );

    return res.json(clients);
  } catch (error) {
    error instanceof Error && res.status(500).json("Server internal error");
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

    return res.json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json(error.message);
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { userid, clientid } = req.params;
    const { body } = req;

    const response = await updateClient(parseInt(userid), parseInt(clientid), body);

    return res.status(response.statusCode).json(response);
  } catch (error) {
    console.error(error);
    error instanceof Error && res.status(500).json("Internal server error");
  }
};

export const getClientsQuantity = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const client = await Client.findBy({ user: parseInt(userId) });

    const clientLength = client.length;
    return res.json(clientLength);
  } catch (error) {
    error instanceof Error && res.status(500).json("Internal server error");
  }
};
