import { Request, Response, NextFunction } from 'express'
import { ForbiddenError } from '../errors/httpErrors'
import { Roles, ROLE_PERMISSIONS } from '../utils/userPermission'

/**
 * STEPS PERFORMED:
 * 1. Get the permission (via function parameter)
 * 2. Get the roles assigned to user (from req.user)
 * 3. Get all the permissions of that role mapped in ROLE_PERMISSIONS
 * 4. Check if the permission exists in the retrieved permission list
 * 5. If exists, go to next line of code; else, throw forbidden error
 */
export const hasPermission = (permissionName: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(req.user)
        const userRole = req.user?.role

        if (!userRole) {
            return next(
                new ForbiddenError(
                    'Authentication required to check permission first.'
                )
            )
        }

        //admin can access everything
        if (userRole === 'admin') {
            return next()
        }

        //other user type need permission
        const allowPermissions = ROLE_PERMISSIONS[userRole as Roles]

        if (allowPermissions && allowPermissions.includes(permissionName)) {
            return next()
        }

        next(new ForbiddenError('Unauthorized user'))
    }
}
