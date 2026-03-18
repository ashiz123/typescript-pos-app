import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { AuthCodeModel } from './authCode.schema'
import { AuthCodeRepository } from './authCode.repository'
import { IAuthCodeDocument, IAuthCodeRepository } from './authCode.type'
import { Model } from 'mongoose'

container.registerInstance<Model<IAuthCodeDocument>>(
    TOKENS.AUTHCODE_MODEL,
    AuthCodeModel
)
container.registerSingleton<IAuthCodeRepository>(
    TOKENS.AUTHCODE_REPOSITORY,
    AuthCodeRepository
)
