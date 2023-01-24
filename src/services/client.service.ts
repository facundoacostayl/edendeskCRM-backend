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
  if (clientList === null) {
    return responseHandler("Error", 404, "Client list doesn't exist");
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

  return responseHandler(
    "Success",
    200,
    "Client found succesfully",
    client
  );
};

export { getClients, getClient };
