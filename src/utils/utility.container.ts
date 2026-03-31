import { container } from 'tsyringe'
import { TOKENS } from '../config/tokens'
import { comparePassword } from './password'

container.registerInstance(TOKENS.COMPARE_PASSWORD, comparePassword)
