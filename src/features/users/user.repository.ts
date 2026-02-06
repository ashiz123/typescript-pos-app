import { ClientSession } from 'mongoose'
import { CrudRepository } from '../../shared/crudRepository'
import { injectable } from 'tsyringe'
import User from '../auth/auth.model'
import { IUserDocument } from '../auth/interfaces/authInterface'
import { CreateUserDTO, IUserRepository, UpdateUserDTO } from './user.type'

@injectable()
export class UserRepository
    extends CrudRepository<IUserDocument, CreateUserDTO, UpdateUserDTO>
    implements IUserRepository
{
    constructor() {
        super(User)
    }

    async findAndUpdateByTokenWithSession(
        token: string,
        hashedPassword: string,
        session: ClientSession
    ): Promise<IUserDocument | null> {
        console.log('datas', token)
        const updatedUser = await this.model.findOneAndUpdate(
            { activationToken: token },
            {
                password: hashedPassword,
                status: 'active',
                $unset: { activationToken: '' },
            },
            { new: true, session } // <- session goes inside options
        )

        return updatedUser
    }

    async getAdmin(): Promise<IUserDocument | null> {
        return await this.model.findOne({ role: 'admin' })
    }

    async createUserWithSession(
        userData: CreateUserDTO,
        session: ClientSession
    ): Promise<IUserDocument> {
        const [employee] = await this.model.create([userData], {
            session,
        })
        return employee
    }
}

export const userRepository = new UserRepository()
