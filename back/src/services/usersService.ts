import { userModel } from "../config/dataSource";
import IUserDto from "../dtos/IUserDto";
import User from "../entities/User";
import { createCredential } from "./credentialsService";
import Credential from "../entities/Credential";

export const getAllUsersService = async (): Promise<User[]> => {
    const users: User[] = await userModel.find();
    return users;
};

export const getUserByIdService = async (id: number): Promise<User> => {
    const foundUser: User = await userModel.findOne({ where: { id }, relations: ["appointments"] });
    if (!foundUser) throw Error("Usuario no fue encontrado");
    return foundUser;
};

export const createUserService = async (createUserDto: IUserDto): Promise<User> => {
    const newCredential: Credential = await createCredential({
        username: createUserDto.username,
        password: createUserDto.password
    });
    const newUser: User = await userModel.create(createUserDto);
    newUser.credential = newCredential;
    await userModel.save(newUser);
    return newUser;
}

export const findUser = async (credentialId: number): Promise<User> => {
    const user: User = await userModel.findOne({ where: {credential: { id: credentialId }}, relations: ["appointments"] });
    return user;
}
