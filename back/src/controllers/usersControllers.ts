import { Request,Response  } from "express";
import { createUserService, getAllUsersService, getUserByIdService } from "../services/usersService";
import IUserDto from "../dtos/IUserDto";
import User from "../entities/User";
import Credential from "../entities/Credential";
import { validateCredential } from "../services/credentialsService";

export const getAllUsers = async (req: Request,res: Response) =>  {
    try{
        const users: User[] = await getAllUsersService();
        res.status(200).json(users);
    }catch(error:any ){ 
        res.status(400).json({error: error.message});
    }
}

export const getUserById = async (req: Request,res: Response) =>  {
    try{
        const {id} =req.params;
        const user: User = await getUserByIdService(Number(id));
        res.status(200).json(user);
    }catch(error:any ){ 
        res.status(400).json({error: error.message});
    }
}

export const register = async (req: Request,res: Response) =>  {
    try{
      const {name,email,username,password,birthdate,nDni}:IUserDto = req.body;
      const newUser:User= await createUserService({
        name,email,username,password,birthdate ,nDni
      });
      res.status(200).json(newUser);
    }catch(error:any ){ 
        res.status(400).json({error: error.message});
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {username,password} = req.body;
        const credential:Credential = await validateCredential({username,password});
        const user = await getUserByIdService(credential.id);
        res.status(200).json({user})
    } catch (error:any) {
        res.status(400).send({error:error.message});
    }
 }