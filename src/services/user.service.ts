import {UserType} from '../interfaces/user.interface';
import { User } from "../config/entities/User";
import {Operation} from '../config/entities/Operation';
import {errorHandler} from '../utils/error.handle';
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const getUser = async(id: UserType['id']) => {
    const user = await User.findOneBy({ id });

    return user;
};

const createUser = async(firstname: UserType['firstname'], loginemail: UserType['loginemail'], password: UserType['password']) => {

      //Verify if user is already authenticated
      const userRequest = await User.findOneBy({ loginemail });

      if(userRequest !== null) {
        return {type: "Error", statusCode: 400, message: "Ya existe un usuario con ese correo"};
      };

        const user = new User();
        user.firstname = firstname as string;
        user.loginemail = loginemail as string;
  
        //Bcrypt password
  
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        user.password = bcryptPassword;
  
        //Saving User in database
        await user.save();
  
        //Creating operation column
        const operation = new Operation();
        operation.userId = user.id;
        operation.year = new Date().getFullYear();
        operation.month = new Date().getMonth() + 1;
  
        await operation.save();
  
        //Generating JWT Token
        const token = jwtGenerator(user, user.id);

        return {type: "Success", statusCode: 200, message: "Usuario creado exitosamente"};
}


export {getUser, createUser};