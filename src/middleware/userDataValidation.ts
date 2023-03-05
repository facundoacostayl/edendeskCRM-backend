import { Request, Response, NextFunction } from "express";

const validAuthUserInfo = (req: Request, res: Response, next: NextFunction) => {
  //Req body
  const { firstName, loginEmail, password } = req.body;

  //Function for validating loginEmail with regex
  const validEmail = (loginemail: string) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
  };

  //Function for validating firstName with regex
  const validName = (name: string) => {
    // eslint-disable-next-line
    return /[^a-zA-Z\s]/g.test(name);
  };

  //Requiring paths and validating body data
  if (req.path === "/register") {
    if (![firstName, loginEmail, password].every(Boolean)) {
      return res.json("Completa los campos");
    } else if (validName(firstName)) {
      return res.status(401).json("Nombre invalido");
    } else if (!validEmail(loginEmail)) {
      return res.status(401).json("Email invalido");
    }
  }

  if (req.path === "/login") {
    if (![loginEmail, password].every(Boolean)) {
      return res.status(401).json("Completa los campos");
    } else if (!validEmail(loginEmail)) {
      return res.status(401).json("Email invalido");
    }
  }

  next();
};

const validUpdateUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Req body
  const { loginEmail } = req.body;

  //Function for validating loginEmail with regex
  const validEmail = (loginemail: string) => {
    // eslint-disable-next-line
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
  };

  //Requiring paths and validating body data
  if (loginEmail) {
    if (validEmail(loginEmail)) {
      return res.status(401).json("Email invalido");
    }
  }

  next();
};

export { validAuthUserInfo, validUpdateUserInfo };
