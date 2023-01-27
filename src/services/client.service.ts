import { ClientType } from "../interfaces/client.interface";
import { Client } from "../config/entities/Client";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { UserType } from "../interfaces/user.interface";
import { responseHandler } from "../utils/response.handle";
import { AppDataSource } from "../config/db/db";

//DataSource renamed
const dataSource = AppDataSource;

const getClients = async (userId: ClientType["user"]) => {
  //FIX userId x userid <---

  //Find clients
  const clientList = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :id", { id: userId })
    .getMany();

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

const getClient = async (
  userid: ClientType["user"],
  clientid: ClientType["clientid"]
) => {
  //Find Client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userid", { userid })
    .andWhere("c.clientid = :clientid", { clientid })
    .getOne();

  //Verify if user exists, otherwise returning error
  if (!client) {
    return responseHandler("Error", 404, "Client doesn't exist");
  }

  return responseHandler("Success", 200, "Client found succesfully", client);
};

const createClient = async (
  nombre: ClientType["nombre"],
  apellido: ClientType["apellido"],
  telefono: ClientType["telefono"],
  userid: ClientType["user"]
) => {
  //Request in order to check if client has already been added
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userid", { userid })
    .andWhere("c.telefono = :telefono", { telefono })
    .getOne();

  //Verify if client exists, otherwise returning error
  if (client) {
    return responseHandler("Error", 404, "Client already exists");
  }

  //Create new client
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
  newClient.user = userid;

  //Save client
  await newClient.save();

  return responseHandler("Success", 200, "Client added succesfully", newClient);
};

const addToClientBalance = async (
  userId: ClientType["clientid"],
  clientid: ClientType["user"],
  amount: number
) => {
  //Find client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.clientid = :clientid", { clientid })
    .getOne();

  //Find operation
  const operation = await Operation.findOneBy({
    userId,
    createdAt: new Date().getDate(),
  });

  //Verify if client and operation exists, otherwise returning error
  if (!client) {
    return responseHandler("Error", 404, "Client not found");
  }

  //Add to customer balance
  client.saldo += amount;

  //Add date of operation
  const today = new Date();
  const todayDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  client.fechaultcarga = todayDate;
  client.montoultcarga = client.saldo;

  if (operation) {
    //Add operation
    operation.userGain += amount;
    operation.userTotalBalance += amount;
    operation.dayTransactions++;
    !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;

    //Save operation
    await operation.save();
  }

  //Save client
  await client.save();

  return responseHandler(
    "Success",
    200,
    `Balance updated succesfully. Client ${
      client.nombre + " " + client.apellido
    } balance is $${client.saldo}`
  );
};

const substractFromClientBalance = async (
  userId: ClientType["clientid"],
  clientid: ClientType["user"],
  amount: number
) => {
  //Find client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.clientid = :clientid", { clientid })
    .getOne();

  //Find operation
  const operation = await Operation.findOneBy({
    userId,
    createdAt: new Date().getDate(),
  });

  //Verify if client and operation exists, otherwise returning error
  if (!client) {
    return responseHandler("Error", 404, "Client not found");
  }

  //Substract from customer balance
  client.saldo = client.saldo - amount;

  //Add last withdrawal amount
  client.montoultretiro = amount;

  //Add date of operation
  const today = new Date();
  const todayDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  client.fechaultretiro = todayDate;

  if (operation) {
    //Add operation
    operation.userLost += amount;
    operation.userTotalBalance = operation.userTotalBalance - amount;
    operation.dayTransactions++;
    !operation.createdAt ? (operation.createdAt = new Date().getDate()) : null;

    //Save operation
    await operation.save();
  }

  //Save client
  await client.save();

  return responseHandler(
    "Success",
    200,
    `Balance updated succesfully. Client ${
      client.nombre + " " + client.apellido
    } balance is $${client.saldo}`,
    client
  );
};

const searchClient = async (
  userId: ClientType["user"],
  nameSearch: ClientType["nombre"]
) => {
  //Find clients
  const clients = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .where("c.user = :userId", { userId })
    .andWhere("c.nombre ILIKE :nameSearch OR c.apellido ILIKE :nameSearch", {
      nameSearch: `%${nameSearch}%`,
    })
    .getMany();

  //Verify there are clients, otherwise returning error
  if (!clients) {
    return responseHandler("Error", 404, "Client/s not found");
  }

  return responseHandler("Success", 200, "Client/s found", clients);
};

const deleteClient = async (
  userid: ClientType["user"],
  clientid: ClientType["clientid"]
) => {
  //Find client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userid", { userid })
    .andWhere("c.clientid = :clientid", { clientid })
    .getOne();

  //Find operation
  const operation = await Operation.findOneBy({
    userId: userid,
    createdAt: new Date().getDate(),
  });

  //Verify if client exists, otherwise returning error
  if (!client) {
    return responseHandler("Error", 404, "Client not found");
  }

  //Save operation data
  if (operation) {
    operation.userLost += client.saldo;
    operation.userTotalBalance = operation.userTotalBalance - client.saldo;

    await operation.save();
  }

  //Save deleting client request
  await Client.delete({ clientid });

  return responseHandler("Success", 201, `Client ${client.nombre} deleted succesfully`);

};

export {
  getClients,
  getClient,
  createClient,
  addToClientBalance,
  substractFromClientBalance,
  searchClient,
  deleteClient
};
