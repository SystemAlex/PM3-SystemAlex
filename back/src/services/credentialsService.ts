import ICredentialDto from "../dtos/ICredentialDto";
import Credential from "../entities/Credential";
import { credentialModel } from "../config/dataSource";

export const createCredential = async (credentialDto: ICredentialDto): Promise<Credential> => {
    const newCredential: Credential = await credentialModel.create(credentialDto);
    await credentialModel.save(newCredential);
    return newCredential;
}

export const validateCredential = async (credentialDto: ICredentialDto): Promise<Credential> => {
    const { username, password } = credentialDto;
    const foundCredential: Credential | null = await credentialModel.findOneBy({ username });
    if (!foundCredential) {
        throw Error("Usuario inexistente");
    } else if (foundCredential && foundCredential.password !== password) {
        throw Error("Contraseña incorrecta");
    } else {
        return foundCredential;
    }
}
