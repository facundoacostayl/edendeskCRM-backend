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

export const updateClientBalance = async(req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const {amount} = req.body;
  
    const client = await Client.findOneBy({clientid: parseInt(id)});
  
    if(!client) return res.sendStatus(403).json({message: "El cliente no existe"});
    
    client.saldo += amount;

    const today = new Date();
    const todayDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    client.fechaultcarga = todayDate;
    client.montoultcarga = client.saldo;
  
    client.save();
    
    return res.json(client);
  }catch(e) {
    e instanceof Error && res.status(500).json("Inernal server error");
  }
  }
  
