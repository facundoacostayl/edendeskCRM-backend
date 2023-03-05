import { Request, Response, NextFunction } from "express";

const validNewClientInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Req body
  const { firstName, lastName, tel } = req.body;

  //Function for validating firstName and lastName with regex
  const validName = (name: string) => {
    // eslint-disable-next-line
    return /[^a-zA-Z\s]/g.test(name);
  };

  //Requiring paths and validating body data
  if (![firstName, lastName, tel].every(Boolean)) {
    return res.json("Completa los campos");
  } else if (validName(firstName) || validName(lastName)) {
    return res.status(401).json({ message: "Nombre o apellido inválido" });
  }

  next();
};

const validUpdateClientInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Req body
  const { firstName, lastName, addType } = req.body;

  //Function for validating firstName and lastName with regex
  const validName = (name: string) => {
    // eslint-disable-next-line
    return /[^a-zA-Z\s]/g.test(name);
  };

  if (validName(firstName) || validName(lastName) || validName(addType)) {
    return res.status(401).json({ message: "Datos no validos" });
  }

  next();
};

export { validNewClientInfo, validUpdateClientInfo };
