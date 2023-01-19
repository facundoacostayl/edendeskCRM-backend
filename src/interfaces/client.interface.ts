interface Client {
  clientId: number;
  nombre: string;
  apellido: string;
  saldo: number;
  telefono: string;
  fechaultcarga: string;
  montoultcarga: number;
  tipodecarga: string;
  fechaultretiro: string;
  montoultretiro: string;
  sucursal: string;
  userid: number;
}

export {Client as ClientType}