import { createQueryBuilder, getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as jwt from "jsonwebtoken";
import config from "../config/jwt";
import * as crypto from "./aescrypto";

class AuthController {
    static login = async (req: Request, res: Response) => {
        const { username, password } = req.body;
        //console.log('usuario Encryptado: ' + username);
        let usuarioDe = crypto.decrypt(username);
        let passwordDe = crypto.decrypt(password);
        //console.log('usuario Desencryptado: ' + usuarioDe);

        if (!(username && password)) {
            return res.status(400).json({
                message: 'Username & Password necesarios!'
            })
        }
        const userRepository = getRepository(User);

        let user: User;
        let userB: any
        let empresaid: number

        try {
            user = await userRepository
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.empresa", "empresa")
                .where("user.username = :name", { name: usuarioDe })
                .getOne();
            empresaid = user.empresa.id;

        } catch (error) {
            return res.status(400).json({
                message: ' Username Or Password incorrectos! ',
                data: error
            })

        }

        if (!user.checkPassword(passwordDe)) {
            return res.status(400).json({
                message: 'Username Or Password incorrectos! '
            })
        }

        const usuario = jwt.sign({ 
            userId: user.id, 
            username: user.username, 
            role: user.role, 
            idempresa: empresaid }, config.jwtSecret, { expiresIn: '1h' })

        res.status(200).json({
            message: 'Correcto',
            data: usuario,
            userid: user.id
        });

    }
}

export default AuthController;