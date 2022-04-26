import { Request, Response } from "express";
import { Client } from "../entities/Client";

export const addClient = (req: Request, res: Response) => {
  //Require Body
  const { nombre, apellido, telefono } = req.body;

  try {
    //Check if client has already been added
    const clientRequest = Client.findOneBy({ telefono: telefono });

    if (clientRequest === null) {
      const client = new Client();
      client.nombre = nombre;
      client.apellido = apellido;
      client.telefono = telefono;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ error: error.message });
    }
  }
};
