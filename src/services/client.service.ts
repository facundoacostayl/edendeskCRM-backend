import { ClientType } from "../interfaces/client.interface";
import { Client } from "../config/entities/Client";
import { Operation } from "../config/entities/Operation";
import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";

const getClients = async (userId: ClientType["userId"]) => {
  //FIX userId x userid <---

  //Find clients
  const clientList = await Client.findBy({ userId });

  //Verify if client list exists, otherwise returning error
  if (clientList.length <= 0) {
    return responseHandler("Error", 404, "Client list not found");
  }

  return responseHandler(
    "Success",
    200,
    "Client list found succesfully",
    clientList!
  );
};

const getClient = async (clientid: ClientType["clientid"]) => {
  //Find Client
  const client = await Client.findOneBy({ clientid });

  //Verify if user exists, otherwise returning error
  if (client === null) {
    return responseHandler("Error", 404, "Client doesn't exist");
  }

  return responseHandler("Success", 200, "Client found succesfully", client);
};

const createClient = async (
  nombre: ClientType["nombre"],
  apellido: ClientType["apellido"],
  telefono: ClientType["telefono"],
  userId: ClientType["userId"]
) => {

  //Check if client has already been added
  const client = await Client.findOneBy({ telefono: telefono });

    if(client) {
      return responseHandler('Error', 404, 'Client already exists')
    }

    const newClient = new Client();
    newClient.nombre = nombre;
    newClient.apellido = apellido;
    newClient.telefono = telefono;
    newClient.saldo = 0;
    newClient.fechaultcarga = "No especificado";
    newClient.montoultcarga = 0;
    newClient.fechaultretiro = "No especificado";
    newClient.montoultretiro = 0;
    newClient.tipodecarga = "No especificado";
    newClient.sucursal = "No especificado";
    newClient.userId = userId;

    await newClient.save();

    return responseHandler('Success', 200, 'Client added succesfully', newClient);
};

export { getClients, getClient, createClient };
