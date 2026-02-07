import { Request, Response, NextFunction } from 'express'
import { UnauthorizedError } from '../errors/httpErrors'
import { userBusinessRepository } from '../features/userBusiness/userBusiness.repository'

export const userAuthorityBusiness = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const businessId = req.params.businessId || req.body.businessId

        if (!req.user) {
            return next(new UnauthorizedError('User cannot access'))
        }

        const accessBusiness =
            await userBusinessRepository.canUserAccessBusiness(
                req.user.userId,
                businessId
            )

        if (!accessBusiness) {
            return next(
                new UnauthorizedError('User cannot access given business')
            )
        }

        next()
    } catch (err) {
        next(err)
    }
}
