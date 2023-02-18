import { ClientContext } from "./ClientContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

//TYPES
import { Client } from "./types";
import { User } from "../authContext/types";
import { Status } from "../types";
import { json } from "node:stream/consumers";

export const useClient = () => {
  return useContext(ClientContext);
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ClientProvider = ({ children }: Props) => {
  const [clientList, setClientList] = useState<Client[]>([]);
  const [currentClient, setCurrentClient] = useState<Client>({} as Client);
  const [totalClientBalance, setTotalClientBalance] = useState<number>(0);
  const [clientsQuantity, setClientsQuantity] = useState<number>(0);
  const [status, setStatus] = useState<Status>(Status.init);

  const getClientList = async () => {
    const id = localStorage.getItem("userId")
    try {
      const response = await fetch(`https://localhost:4000/user${id}/clientes`);
      const parseRes = await response.json();
      parseRes && setClientList(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getClient = async (id: Client["clientid"]) => {
    const response = await fetch(`https://localhost:4000/cliente/${id}`);

    const parseRes = await response.json();

    setCurrentClient(parseRes);
  };

  const addClient = async (
    firstname: Client["nombre"],
    lastname: Client["apellido"],
    telefono: Client["telefono"]
  ) => {
    const id = localStorage.getItem("userId");
    const body = {
      nombre: firstname,
      apellido: lastname,
      telefono,
      userId: id,
    };

    try {
      const response = await fetch("https://localhost:4000/nuevo-cliente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      toast.success("Cliente añadido con exito")
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message)
      }
    }
  };

  const updateClient = async (
    clientId: Client["clientid"],
    amount: number,
    operation: string
  ) => {
    try {
      const body = { amount };
      const userId = localStorage.getItem("userId");

      const response = await fetch(
        `https://localhost:4000/user${userId}/cliente${clientId}/${operation}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      getClientList();
      toast.success("Información actualizada con exito")  
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const updateClientInfo = async (
    id: Client["clientid"],
    clientValueToEdit: string,
    newClientValue: string
  ) => {
    try {
      const body = { [clientValueToEdit]: newClientValue };

      const response = await fetch(`https://localhost:4000/cliente/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      setCurrentClient(parseRes);

      toast.success("Información actualizada con exito")
    } catch (error) {
      error instanceof Error && console.log(error.message);
    }
  };

  const deleteClient = async (clientId: Client["clientid"]) => {
    const userId = localStorage.getItem("userId");
    try {
      await fetch(`https://localhost:4000/user${userId}/cliente${clientId}`, {
        method: "DELETE",
      });
      toast.success("Cliente eliminado con exito")
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const searchClient = async (name: Client["nombre"]) => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://localhost:4000/user${id}/buscar-cliente/?name=${name}`
      );

      const parseRes = await response.json();
      setClientList(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const orderClients = async (orderType: string) => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://localhost:4000/user${id}/clientes/ordenar-por-${orderType}`
      );

      const parseRes = await response.json();
      setClientList(parseRes);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getFullClientBalance = async () => {
    const id = localStorage.getItem("userId");
    try {
      const response = await fetch(
        `https://localhost:4000/user${id}/clientes/saldo-total`
      );
      const parseRes = await response.json();
      setTotalClientBalance(parseRes.total);
    } catch (error) {
      error instanceof Error && console.error(error.message);
    }
  };

  const getClientsQuantity = async() => {
    const userId = localStorage.getItem("userId")
    try {
      const response = await fetch(`https://localhost:4000/user${userId}/clientes/cantidad-clientes`)
      const parseRes = await response.json();

      setClientsQuantity(parseRes);
    }catch(error){
      error instanceof Error && console.error(error.message);
    }
  }

  const values = {
    addClient,
    updateClient,
    updateClientInfo,
    deleteClient,
    getClientList,
    clientList,
    getClient,
    currentClient,
    searchClient,
    orderClients,
    getFullClientBalance,
    totalClientBalance,
    getClientsQuantity,
    clientsQuantity,
    status,
    setStatus,
  };

  return (
    <ClientContext.Provider value={values}>{children}</ClientContext.Provider>
  );
};
