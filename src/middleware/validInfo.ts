import {Request, Response, NextFunction} from 'express';

module.exports = function(req: Request, res: Response, next: NextFunction) {
    const { firstname, lastname, loginemail, password } = req.body;
  
    function validEmail(loginemail: string) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginemail);
    }
  
    if (req.path === "/registro") {
      if (![firstname, lastname, loginemail, password].every(Boolean)) {
        return res.json("Completa los campos");
      } else if (!validEmail(loginemail)) {
        return res.status(401).json("Email invalido");
      }
    } else if (req.path === "/login") {
      if (![loginemail, password].every(Boolean)) {
        return res.status(401).json("Completa los campos");
      } else if (!validEmail(loginemail)) {
        return res.status(401).json("Email invalido");
      }
    }
  
    next();
  };