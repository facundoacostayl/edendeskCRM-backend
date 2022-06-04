import { Request, Response } from "express";
import { Client } from "../entities/Client";
import { Operation } from "../entities/Operation";

export const getClients = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const clientList = await Client.findBy({ userId: parseInt(id) });

    return res.json(clientList);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await Client.findOneBy({ clientid: parseInt(id) });

    return res.json(client);
  } catch (error) {
    error instanceof Error && res.status(500).json({ message: error.message });
  }
};

export const addClient = async (req: Request, res: Response) => {
  try {
    //Require Body
    const { nombre, apellido, telefono, userId } = req.body;

    //Check if client has already been added
    const clientRequest = await Client.findOneBy({ telefono: telefono });

    if (clientRequest === null) {
      const client = new Client();
      client.nombre = nombre;
      client.apellido = apellido;
      client.telefono = telefono;
      client.saldo = 0;
      client.fechaultcarga = "No especificado";
      client.montoultcarga = 0;
      client.fechaultretiro = "No especificado";
      client.montoultretiro = 0;
      client.tipodecarga = "No especificado";
      client.sucursal = "No especificado";
      client.userId = userId;

      await client.save();

      return res.json(client);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};

export const addToClientBalance = async (req: Request, res: Response) => {
  try {
    const { userId, clientId } = req.params;
    const { amount } = req.body;

    const client = await Client.findOneBy({ clientid: parseInt(clientId) });
    const operation = await Operation.findOneBy({
      userId: parseInt(userId),
      createdAt: new Date().getDate(),
    });

    if (!client || !operation)
      return res.status(403).json({ message: "User doesn't exists" });

    client.saldo += amount;

    const today = new Date();
    const todayDate =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    client.fechaultcarga = todayDate;
    client.montoultcarga = client.saldo;

    operation.userGain += amount;
    operation.userTotalBalance += amount;
    operation.dayTransactions++;
    !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;

    await client.save();
    await operation.save();

    return res.status(200).json("El saldo fue actualizado correctamente");
  } catch (e) {
    e instanceof Error && res.status(500).json("Internal server error");
  }
};

export const substractFromClientBalance = async (
  req: Request,
  res: Response
) => {
  try {
    const { amount } = req.body;
    const { userId, clientId } = req.params;

    const client = await Client.findOneBy({ clientid: parseInt(clientId) });
    const operation = await Operation.findOneBy({
      userId: parseInt(userId),
      createdAt: new Date().getDate(),
    });

    if (!client || !operation)
      return res.status(403).json("User doesn't exists");

    client.saldo = client.saldo - amount;
    client.montoultretiro = amount;

    const today = new Date();
    const todayDate =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    client.fechaultretiro = todayDate;

    operation.userLost += amount;
    operation.userTotalBalance = operation.userTotalBalance - amount;
    operation.dayTransactions++;
    !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;

    await client.save();
    await operation.save();

    return res.status(200).json("El saldo fue actualizado correctamente");
  } catch (error) {
    error instanceof Error && res.status(500).json("Internal server error");
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

export const getClientsQuantity = async(req: Request, res: Response) => {
  try{
    const {userId} = req.params;
    const client = await Client.findBy({userId: parseInt(userId)});

    const clientLength = client.length;
    return res.json(clientLength);
  }catch(error) {
    error instanceof Error && res.status(500).json("Internal server error");
  }
}
