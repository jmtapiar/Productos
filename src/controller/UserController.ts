import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";


export class UserController {

    // Nuevos Metodos
    static getAll = async (req: Request, res: Response) => {
        try {
            const userRepository = getRepository(User);
            const users = await userRepository.findAndCount({where:{estado:1}});

            if (users.length > 0) {
                res.status(200).json({
                    message: 'Correcto',
                    data: users
                })
            } else {
                res.status(404).json({
                    message: 'No existe usuario!'
                })

            }
        } catch (error) {
            res.status(404).json({
                message: 'Error',
                data: error
            })
        }



    }

    static getById = async (req: Request, res: Response) => {

        const { id } = req.params;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail(id);
            res.status(200).json({
                message: 'Correcto',
                data: user
            })
        } catch (error) {
            res.status(404).json({
                message: 'No existe usuario!'
            })
        }
    }

    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body;
        const user = new User();
        user.username = username;
        user.password = password;
        user.role = role;


        //Validate
        const errores = await validate(user);
        if (errores.length > 0) {
            return res.status(400).json({
                message: 'Error no cumple Validaciones!',
                data: errores.toString()
            })
        }

        //TODO: Hash para el pass
        const userRepository = getRepository(User);
        try {
            user.hashPassword();
            await userRepository.save(user);

        } catch (error) {
            res.status(404).json({
                message: 'No se pudo crear el usuario!',
                data: error
            });
        }
        // All ok
        res.status(200).json({
            message: 'Correcto'
        })

    }

    static editUser = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params;
        const { username, role } = req.body;

        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }
        user.username = username;
        user.role = role;

        const errors = await validate(user);
        if (errors.length > 0) {
            return res.status(404).json({
                message: 'Error',
                data: errors.toString()
            })
        };


        // Try to save user
        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({
                message: 'Error',
                data: error
            })
        }
        res.status(201).json({
            message: 'Usuario modificado'
        })

    }

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);

        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
            user.estado = false;
            await userRepository.save(user);
        } catch (error) {
            return res.status(404).json({
                message: 'Error',
                data: error
            })
        }

        //Eliminar Usuario
       
        res.status(201).json({
            message: 'Eliminado'
        })


    }
    
}

export default UserController;