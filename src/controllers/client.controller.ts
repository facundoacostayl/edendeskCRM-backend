import { Request, Response } from "express";
import { Client } from "../config/entities/Client";
import { Operation } from "../config/entities/Operation";
import {
  getClients,
  getClient,
  createClient,
  addToClientBalance,
  substractFromClientBalance
} from "../services/client.service";

export const getItems = async (req: Request, res: Response) => {
  try {
    //Require params
    const { id } = req.params;

    //Data request
    const clientList = await getClients(parseInt(id));

    //Checking if data type is "Error", otherwise throwing error
    if (clientList.responseType === "Error") {
      throw new Error(clientList.message);
    }

    return res.json(clientList);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    //Require params
    const { id } = req.params;

    //Data request
    const client = await getClient(parseInt(id));

    //Checking if data type is "Error", otherwise throwing error
    if (client.responseType === "Error") {
      throw new Error(client.message);
    }

    return res.json(client);
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

//SQL JOIN
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

    return res.status(200).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

//SQL JOIN
export const substractFromItemBalance = async (
  req: Request,
  res: Response
) => {
  try {
    const { amount } = req.body;
    const { userId, clientId } = req.params;

    const response = await substractFromClientBalance(parseInt(userId), parseInt(clientId), parseInt(amount))

    if(response.responseType === "Error") {
      throw new Error(response.message);
    }

    return res.status(200).json(response);
  } catch (error) {
    error instanceof Error && res.status(500).json({error: error.message});
  }
};

export const searchClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.query;

    const clients = await Client.query(
      "SELECT * FROM clients WHERE \"userId\" = $1 AND nombre || ' ' || apellido ILIKE $2",
      [id, `%${name}%`]
    );

    return res.json(clients);
  } catch (error) {
    error instanceof Error && res.status(500).json("Server internal error");
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

export const deleteClient = async (req: Request, res: Response) => {
  const { userId, clientId } = req.params;

  const client = await Client.findOneBy({ clientid: parseInt(clientId) });
  const operation = await Operation.findOneBy({
    userId: parseInt(userId),
    createdAt: new Date().getDate(),
  });

  if (!client || !operation)
    return res.status(403).json({ message: "Client not found" });

  operation.userLost += client.saldo;
  operation.userTotalBalance = operation.userTotalBalance - client.saldo;
  await operation.save();

  await Client.delete({ clientid: parseInt(clientId) });

  return res.status(200).json({ message: "Client deleted successfully" });
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const queryBuilder = () => {
      if (Object.keys(body).length === 0) return null;
      let query = `UPDATE clients SET `;
      query += Object.keys(body)
        .map((key) => {
          const valueToSet =
            typeof body[key] === "string"
              ? `'${body[key]}'`
              : parseInt(body[key]);
          return `${key}=${valueToSet}`;
        })
        .join(", ");
      return query + ` WHERE clientid=${id};`;
    };

    await Client.query(queryBuilder()!);

    const client = await Client.findOneBy({ clientid: parseInt(id) });

    return res.json(client);
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