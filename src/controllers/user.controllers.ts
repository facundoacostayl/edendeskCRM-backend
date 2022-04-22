import { Request, Response } from 'express';
import { User } from '../entities/User';
const bcrypt = require('bcrypt');

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const userRequest = await User.findOneBy({ email: email })

    /*CHECK THIS IF*/    if (userRequest) {
            const user = new User();
            user.firstname = firstname;
            user.lastname = lastname;
            user.email = email;

            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);


            user.password = bcryptPassword;

            await user.save();

            return res.json(user);
        } else {
            return res.status(401).send('Ya existe un usuario con ese email')
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }

}