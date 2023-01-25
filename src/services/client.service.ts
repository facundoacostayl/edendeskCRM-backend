import { ClientType } from "../interfaces/client.interface";
import { Client } from "../config/entities/Client";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";
import {AppDataSource} from '../config/db/db';

//DataSource renamed
const dataSource = AppDataSource;

const getClients = async (userId: ClientType["user"]) => {
  //FIX userId x userid <---

  //Find clients
  const clientList = await Client.findBy({user: userId});
  
  //Verify if client list exists, otherwise returning error
  if (clientList.length <= 0) {
    return responseHandler("Error", 404, "Client list not found");
  }

  return responseHandler(
    "Success",
    200,
    "Client list found succesfully",
    clientList
  );
};

const getClient = async (clientid: ClientType["clientid"]) => {
  //Find Client
  const client = await User.findOneBy({ id: clientid });

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
  userId: ClientType["user"]
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
    newClient.user = userId;

    await newClient.save();

    return responseHandler('Success', 200, 'Client added succesfully', newClient);
};

const addToClientBalance = async(clientid: ClientType['clientid'], userId: ClientType['user'], amount: number) => {
  const client = await Client.findOneBy({ clientid });
    const operation = await Operation.findOneBy({
      userId
      //createdAt: new Date().getDate(),
    });

    if (!client || !operation){
      return responseHandler('Error', 404, "Client not found");
    }

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

    return responseHandler('Success', 200, `Balance updated succesfully. Client ${client.nombre + " " + client.apellido} balance is $${client.saldo}`);
}

const substractFromClientBalance = async(clientid: ClientType['clientid'], userId: ClientType['user'], amount: number) => {
  const client = await Client.findOneBy({ clientid });
    const operation = await Operation.findOneBy({
      userId,
      createdAt: new Date().getDate(),
    });

    if (!client || !operation){
      return responseHandler('Error', 404, "Client not found")
    }

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

    return responseHandler('Success', 200, `Balance updated succesfully. Client ${client.nombre + " " + client.apellido} balance is $${client.saldo}`);
}

export { getClients, getClient, createClient, addToClientBalance, substractFromClientBalance };
