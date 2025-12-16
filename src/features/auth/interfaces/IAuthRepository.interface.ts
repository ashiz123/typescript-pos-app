import { IUser } from "./IUserProps.interface.js";

export interface IAuthRepository {
  createUser(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<IUser>;
  // findById(id: string): Promise<IUser | null>;

  findByEmail(email: string): Promise<IUser | null>;
}
