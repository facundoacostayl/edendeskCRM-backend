import {UserType} from '../interfaces/user.interface';
import { User } from "../config/entities/User";
import {Operation} from '../config/entities/Operation';
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const getUser = async(id: UserType['id']) => {
    const user = await User.findOneBy({ id });

    return user;
}

export {getUser};