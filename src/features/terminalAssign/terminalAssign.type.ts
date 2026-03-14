import { TERMINAL_ASSIGN_STATUS } from './terminalAssign.constant'

export type TerminalAssignStatus =
    (typeof TERMINAL_ASSIGN_STATUS)[keyof typeof TERMINAL_ASSIGN_STATUS]
