import mongoose from 'mongoose'
import { IUserDocument } from '../auth/interfaces/authInterface'
import { CreateUserDTO, IUserRepository, IUserService } from './user.type'
import { UnauthorizedError } from '../../errors/httpErrors'
import { sendEmail } from '../../utils/sendEmail'
import { hashPassword } from '../../utils/password'
import { createToken, hashToken } from '../../utils/token'
// import { userActivationHtml } from '../../utils/userActivationHtml'
// import { userBusinessRepository } from '../userBusiness/userBusiness.repository'
import { IUserBusinessRepository } from '../../unused'
import { TOKENS } from '../../config/tokens'
import { injectable, inject } from 'tsyringe'

@injectable()
export class UserService implements IUserService {
    constructor(
        @inject(TOKENS.USER_REPOSITORY) private repository: IUserRepository,
        @inject(TOKENS.USER_BUSINESS_REPOSITORY)
        private userBusinessRepository: IUserBusinessRepository
    ) {}

    createUser = async (
        newUser: CreateUserDTO,
        createdBy: string
    ): Promise<IUserDocument> => {
        const token = createToken()
        const session = await mongoose.startSession()

        const canUserAccess =
            await this.userBusinessRepository.canUserAccessBusiness(
                createdBy,
                newUser.businessId
            )

        if (!canUserAccess) {
            throw new UnauthorizedError(
                'User does not have right to access to the business'
            )
        }

        try {
            const createEmployee = await session.withTransaction(async () => {
                const employee = await this.repository.createUserWithSession(
                    { ...newUser, activationToken: hashToken(token) },
                    session
                )

                await this.userBusinessRepository.assignUserWithSession(
                    {
                        userId: employee.id,
                        businessId: newUser.businessId,
                        role: newUser.role,
                        createdBy,
                        userStatus: 'pending',
                    },
                    session
                )

                return employee
            })

            await sendEmail(
                newUser.email,
                'Activate your account',
                `Activate your account by clicking on this link: http://localhost:3000/api/userActivation/${newUser.businessId}/${token}`
            )

            return createEmployee!
        } finally {
            await session.endSession()
        }
    }

    activateUser = async (
        businessId: string,
        token: string,
        password: string
    ): Promise<IUserDocument | null> => {
        const session = await mongoose.startSession()
        session.startTransaction()
        try {
            const hashedToken = hashToken(token)
            console.log(hashToken)

            const updatedUser =
                await this.repository.findAndUpdateByTokenWithSession(
                    hashedToken,
                    await hashPassword(password),
                    session
                )

            if (!updatedUser) {
                console.log('Failed to update the user password')
                await session.abortTransaction()
                throw new Error('User not found')
            }

            console.log('user id after update', updatedUser)

            await this.userBusinessRepository.findAndUpdateByUserIdWithSession(
                updatedUser.id,
                updatedUser.role,
                businessId,
                session
            )

            await session.commitTransaction()

            return updatedUser
        } catch (error) {
            throw new Error(
                `Failed to create business: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        } finally {
            await session.endSession()
        }
    }
}
