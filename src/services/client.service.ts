import { ClientType } from "../interfaces/client.interface";
import { PaginationArgsType } from "../interfaces/pagination.interface";
import { Client } from "../config/entities/Client";
import { User } from "../config/entities/User";
import { Operation } from "../config/entities/Operation";
import { responseHandler } from "../utils/response.handle";
import { httpStatusCodes } from "../utils/httpStatusCodes";
import { AppDataSource as dataSource } from "../config/db/db";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

const getClients = async (userId: ClientType["user"]) => {
  //Find clients
  const clientList = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .getMany();

  //Verify if client list exists, otherwise returning error
  if (!clientList) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Lista no encontrada"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Lista encontrada exitosamente",
    clientList
  );
};

const getPaginationClientList = async (
  userId: PaginationArgsType["userid"],
  page: PaginationArgsType["page"],
  size: PaginationArgsType["size"],
  sortBy: PaginationArgsType["sortBy"],
  orderBy: PaginationArgsType["orderBy"]
) => {
  //Set page number to index for multiplying it * the number of values setted in size.
  const pageIndex = page - 1;

  //Multiply pageIndex * the number of values setted in size.
  const numberOfValuesToSkip = size * pageIndex;

  //Rename "created_at" to "user" in order of order based on id number (the highest number, the last value created).
  const queryOfSortBy = sortBy === "created_at" ? "clientId" : sortBy;

  //Find all clients
  const allClients = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .getCount();

  //Find clients required and sorting them
  const clientsRequired = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoin(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .take(size)
    .skip(numberOfValuesToSkip)
    .orderBy(`c.${queryOfSortBy}`, orderBy)
    .getMany();

  //Verify if clients exists, otherwise returning error
  if (!clientsRequired) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Clientes no encontrados"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Clientes encontrados exitosamente",
    {
      allValues: allClients,
      paginatedValues: clientsRequired,
    }
  );
};

const getClient = async (
  userId: ClientType["user"],
  clientId: ClientType["clientId"]
) => {
  //Find Client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.clientId = :clientId", { clientId })
    .getOne();

  //Verify if user exists, otherwise returning error
  if (!client) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "El cliente no existe"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Cliente encontrado exitosamente",
    client
  );
};

const createClient = async (
  firstName: ClientType["firstName"],
  lastName: ClientType["lastName"],
  tel: ClientType["tel"],
  userId: ClientType["user"]
) => {
  //Request in order to check if client has already been added
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.tel = :tel", { tel })
    .getOne();

  //Verify if client exists, otherwise returning error
  if (client) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "El cliente ya existe"
    );
  }

  //Create new client
  const newClient = new Client();
  newClient.firstName = firstName;
  newClient.lastName = lastName;
  newClient.tel = tel;
  newClient.balance = 0;
  newClient.lastAddDate = "No especificado";
  newClient.lastAddAmount = 0;
  newClient.lastWithdrawDate = "No especificado";
  newClient.lastWithdrawAmount = 0;
  newClient.addType = "No especificado";
  newClient.branch = "No especificado";
  newClient.user = userId;

  //Save client
  await newClient.save();

  return responseHandler(
    "Success",
    httpStatusCodes.CREATED,
    "Cliente añadido exitosamente",
    newClient
  );
};

//CHECK OPERATION FECHADECREACION ****
const addToClientBalance = async (
  userId: ClientType["clientId"],
  clientId: ClientType["user"],
  amount: number
) => {
  //Find client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.clientId = :clientId", { clientId })
    .getOne();

  //Verify if client and operation exists, otherwise returning error
  if (!client) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Cliente no encontrado"
    );
  }

  //Find operation
  const operation = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "u.id = o.user")
    .where("o.user = :userId", { userId })
    .andWhere("o.creationDay = :creationDay", {
      creationDay: new Date().getDate(),
    })
    .andWhere("o.creationMonth = :creationMonth", {
      creationMonth: new Date().getMonth() + 1,
    })
    .andWhere("o.creationYear = :creationYear", {
      creationYear: new Date().getFullYear(),
    })
    .getOne();

  //Verify if client and operation exists, otherwise returning error
  if (!operation) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Datos de operacion no encontrados"
    );
  }

  //Add to customer balance
  client.balance += amount;

  //Add date of operation
  const today = new Date();
  const todayDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  client.lastAddDate = todayDate;
  client.lastAddAmount = client.balance;

  //Add operation
  operation.userEarnings += amount;
  operation.totalSumOfBalances += amount;
  operation.dayTransactions++;
  !operation.creationDay
    ? (operation.creationDay = new Date().getDate())
    : null;

  //Save operation
  await operation.save();

  //Save client
  await client.save();

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Saldo actualizado exitosamente",
    client
  );
};

const substractFromClientBalance = async (
  userId: ClientType["clientId"],
  clientId: ClientType["user"],
  amount: number
) => {
  //Find client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.clientId = :clientId", { clientId })
    .getOne();

  //Verify if client and operation exists, otherwise returning error
  if (!client) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Cliente no encontrado"
    );
  }

  //Find operation
  const operation = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "u.id = o.user")
    .where("o.user = :userId", { userId })
    .andWhere("o.creationDay = :creationDay", {
      creationDay: new Date().getDate(),
    })
    .andWhere("o.creationMonth = :creationMonth", {
      creationMonth: new Date().getMonth() + 1,
    })
    .andWhere("o.creationYear = :creationYear", {
      creationYear: new Date().getFullYear(),
    })
    .getOne();

  //Verify if client and operation exists, otherwise returning error
  if (!operation) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Datos de operacion no encontrados"
    );
  }

  //Substract from customer balance
  client.balance = client.balance - amount;

  //Add last withdrawal amount
  client.lastAddAmount = amount;

  //Add date of operation
  const today = new Date();
  const todayDate =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  client.lastWithdrawDate = todayDate;

  //Add operation
  operation.userLosses += amount;
  operation.totalSumOfBalances = operation.totalSumOfBalances - amount;
  operation.dayTransactions++;
  !operation.creationDay
    ? (operation.creationDay = new Date().getDate())
    : null;

  //Save operation
  await operation.save();

  //Save client
  await client.save();

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Saldo actualizado exitosamente",
    client
  );
};

const searchClient = async (
  userId: ClientType["user"],
  nameSearch: ClientType["firstName"]
) => {
  //Find clients
  const clients = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .where("c.user = :userId", { userId })
    .andWhere("c.firstName ILIKE :nameSearch OR c.lastName ILIKE :nameSearch", {
      nameSearch: `%${nameSearch}%`,
    })
    .getMany();

  //Verify there are clients, otherwise returning error
  if (!clients) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Cliente/s no encontrado"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Cliente/s encontrado exitosamente",
    clients
  );
};

const deleteClient = async (
  userId: ClientType["user"],
  clientId: ClientType["clientId"]
) => {
  //Find client
  const client = await dataSource
    .getRepository(Client)
    .createQueryBuilder("c")
    .innerJoinAndSelect(User, "u", "u.id = c.user")
    .where("c.user = :userId", { userId })
    .andWhere("c.clientId = :clientId", { clientId })
    .getOne();

  //Verify if client exists, otherwise returning error
  if (!client) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Cliente encontrado"
    );
  }

  //Find operation
  const operation = await dataSource
    .getRepository(Operation)
    .createQueryBuilder("o")
    .innerJoinAndSelect(User, "u", "u.id = o.user")
    .where("o.user = :userId", { userId })
    .andWhere("o.creationDay = :creationDay", {
      creationDay: new Date().getDate(),
    })
    .andWhere("o.creationMonth = :creationMonth", {
      creationMonth: new Date().getMonth() + 1,
    })
    .andWhere("o.creationYear = :creationYear", {
      creationYear: new Date().getFullYear(),
    })
    .getOne();

  //Verify if client and operation exists, otherwise returning error
  if (!operation) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Datos de operacion no encontrados"
    );
  }

  //Add deleted client balance to the day's user losses
  operation.userLosses += client.balance;

  //Substract deleted client balance from the total sum of all balances
  operation.totalSumOfBalances = operation.totalSumOfBalances - client.balance;

  //Save operation data
  await operation.save();

  //Save deleting client request
  await Client.delete({ clientId });

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    `El cliente ${client.firstName} fue eliminado exitosamente`,
    client
  );
};

const updateClient = async (
  userId: ClientType["user"],
  clientId: ClientType["clientId"],
  clientData: ClientType[]
) => {
  //Verify if data exists, otherwise returning error
  if (!Object.keys(clientData).length) {
    return responseHandler("Error", 404, "No hay datos para actualizar");
  }

  //Execute update query
  const updateClient = await dataSource
    .createQueryBuilder()
    .update(Client)
    .set(clientData as QueryDeepPartialEntity<Client>)
    .where("user = :userId", { userId })
    .andWhere("clientId = :clientId", { clientId })
    .execute();

  //Find client
  const client = await Client.findOneBy({ clientId });

  //Verify if client exists, otherwise returning error
  if (!updateClient || !client) {
    return responseHandler(
      "Error",
      httpStatusCodes.NOT_FOUND,
      "Usuario no encontrado"
    );
  }

  return responseHandler(
    "Success",
    httpStatusCodes.OK,
    "Cliente actualizado correctamente",
    client
  );
};

export {
  getClients,
  getPaginationClientList,
  getClient,
  createClient,
  addToClientBalance,
  substractFromClientBalance,
  searchClient,
  deleteClient,
  updateClient,
};
