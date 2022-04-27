import { Request, Response } from "express";
import { Client } from "../entities/Client";

export const addClient = async (req: Request, res: Response) => {
  try {
    //Require Body
    const { nombre, apellido, telefono } = req.body;

    //Check if client has already been added
    const clientRequest = await Client.findOneBy({ telefono: telefono });

    if (clientRequest === null) {
      const client = new Client();
      client.nombre = nombre;
      client.apellido = apellido;
      client.telefono = telefono;

      await client.save();

      return res.json(client)
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
  }
};
