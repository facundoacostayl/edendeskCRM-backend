interface Client {
  clientid: number;
  nombre: string;
  apellido: string;
  saldo: number;
  telefono: string;
  fechaultcarga: string;
  montoultcarga: number;
  tipodecarga: string;
  fechaultretiro: string;
  montoultretiro: number;
  sucursal: string;
  user: number;
}

export {Client as ClientType}