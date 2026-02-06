import mongoose, { UpdateQuery } from 'mongoose'
import { businessRepository } from './business.repository'
import { IBusinessRepository, IBusinessService } from './business.type'
import { BusinessProps, CreateBusinessDTO } from './business.model'
import { IUserBusinessRepository } from '../userBusiness/interfaces/userBusiness.interface'
import { userBusinessRepository } from '../userBusiness/userBusiness.repository'
import { createToken, hashToken } from '../../utils/token'
import { sendEmail } from '../../utils/sendEmail'
import { IBusinessDocument } from './database/business_db_model'
import { IUserRepository } from '../users/user.type'
import { userRepository } from '../users/user.repository'
import { inject, injectable } from 'tsyringe'
import { TOKENS } from '../../config/tokens'

export type AuthUserBusinessProps = BusinessProps & { userId: string }

@injectable()
export class BusinessService implements IBusinessService<BusinessProps> {
    constructor(
        @inject(TOKENS.BUSINESS_REPOSITORY)
        private readonly businessRepo: IBusinessRepository,
        @inject(TOKENS.USER_REPOSITORY)
        private readonly userRepository: IUserRepository,
        @inject(TOKENS.USER_BUSINESS_REPOSITORY)
        private readonly userBusinessRepo: IUserBusinessRepository
    ) {}

    async getById(id: string): Promise<BusinessProps | null> {
        return this.businessRepo.findById(id)
    }

    async getAll(): Promise<BusinessProps[]> {
        return this.businessRepo.findAll()
    }

    async create(
        data: CreateBusinessDTO & {
            userId: string
            role: string
            email: string
        }
    ): Promise<IBusinessDocument> {
        const token = createToken()
        const session = await mongoose.startSession()

        const admin = await this.userRepository.getAdmin()

        if (!admin) {
            throw new Error('Admin not found to create the business')
        }

        try {
            // Use withTransaction to handle rollback + retries
            const newBusiness = await session.withTransaction(async () => {
                // Create business inside transaction
                const createdBusiness =
                    await this.businessRepo.createWithSession(
                        { ...data, activationToken: hashToken(token) },
                        session
                    )

                // Assign user to business
                await this.userBusinessRepo.assignUserWithSession(
                    {
                        userId: data.userId,
                        businessId: createdBusiness.id,
                        role: data?.role || 'owner',
                        userStatus: 'pending',
                    },
                    session
                )

                return createdBusiness
            })

            // Send email after commit
            await sendEmail(
                admin.email,
                'Activate your business',
                `Activate your account by clicking on this link: http://localhost:3000/api/businessActivation/${data.userId}/${token}`
            )

            // withTransaction guarantees newBusiness exists if no error
            return newBusiness!
        } finally {
            await session.endSession()
        }
    }

    async update(
        id: string,
        data: UpdateQuery<BusinessProps>
    ): Promise<BusinessProps | null> {
        return this.businessRepo.update(id, data)
    }

    async delete(id: string): Promise<boolean> {
        return this.businessRepo.delete(id)
    }

    async filterBusinessByAuthUser(authId: string): Promise<BusinessProps[]> {
        return this.businessRepo.filterByUserId(authId)
    }

    async filterBusinessByName(name: string): Promise<BusinessProps | null> {
        return this.businessRepo.filterByName(name)
    }

    async activateUser(
        token: string,
        userId: string,
        role: string
    ): Promise<boolean> {
        const session = await mongoose.startSession()

        try {
            let activated = false

            await session.withTransaction(async () => {
                const hashedToken = hashToken(token)
                console.log('topek', token)
                console.log('hashtoken', hashedToken)

                const activateBusiness =
                    await this.businessRepo.findAndUpdateByToken(
                        hashedToken,
                        session
                    )

                if (!activateBusiness) {
                    return
                }

                await this.userBusinessRepo.findAndUpdateByUserIdWithSession(
                    userId,
                    role,
                    activateBusiness.id,
                    session
                )

                activated = true
            })

            return activated
        } finally {
            await session.endSession()
        }
    }
}

export const businessService = new BusinessService(
    businessRepository,
    userRepository,
    userBusinessRepository
)
