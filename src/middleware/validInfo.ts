import {Request, Response, NextFunction} from 'express';

module.exports = function(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastnName, loginEmail, password } = req.body;
  
    function validEmail(loginemail: string) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
    }
  
    if (req.path === "/registro") {
      if (![firstName, loginEmail, password].every(Boolean)) {
        return res.json("Completa los campos");
      } else if (!validEmail(loginEmail)) {
        return res.status(401).json("Email invalido");
      }
    } else if (req.path === "/login") {
      if (![loginEmail, password].every(Boolean)) {
        return res.status(401).json("Completa los campos");
      } else if (!validEmail(loginEmail)) {
        return res.status(401).json("Email invalido");
      }
    }
  
    next();
  };