import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";


class AuthController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).json({
                menssage: 'Username & Password necesarios!'
            })
        }
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail({ where: { username } })
        } catch (error) {
            return res.status(400).json({
                menssage: ' Username Or Password incorrectos! ',
                data: error
            })

        }
        res.status(200).json({
            message: 'Correcto',
            data: user
        });

    }
}

export default AuthController;