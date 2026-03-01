import express from 'express'
import { container } from 'tsyringe'
import { ITerminalController } from './terminal.type'
import { TOKENS } from '../../config/tokens'
import { authWithBusinessHandler } from '../../middlewares/authWithBusinessHandler'
import { hasPermission } from '../../middlewares/hasPermission'

const terminalController = container.resolve<ITerminalController>(
    TOKENS.TERMINAL_CONTROLLER
)

const router = express.Router()

router.post(
    '/create',
    authWithBusinessHandler,
    hasPermission('create_terminal'),
    terminalController.createTerminal
)

router.post(
    '/approve',
    authWithBusinessHandler,
    hasPermission('approve_terminal'),
    terminalController.approveTerminal
)

export default router
