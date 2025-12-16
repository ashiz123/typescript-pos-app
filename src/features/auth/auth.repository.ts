import { IUser } from "./interfaces/IUserProps.interface.js";
import { IAuthRepository } from "./interfaces/IAuthRepository.interface.js";
import User from "./auth.model.js";
import { isMongoDuplicateKeyError } from "../../errors/guard.js";
import { DuplicateEntry } from "../../errors/httpErrors.js";

export class AuthRepository implements IAuthRepository {
  async createUser(
    name: string,
    email: string,
    phone: string,
    password: string,
  ): Promise<IUser> {
    try {
      const newUser = await User.create({
        name,
        email,
        phone,
        password,
      });

      return newUser;
    } catch (err: unknown) {
      if (isMongoDuplicateKeyError(err)) {
        throw new DuplicateEntry();
      }
      throw err;
    }
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ email });
    return user;
  }
}
