import { container } from 'tsyringe'
import { TOKENS } from '../../config/tokens'
import { CounterRepository, ICounterRepository } from './counter.repository'

container.registerSingleton<ICounterRepository>(
    TOKENS.COUNTER_REPOSITORY,
    CounterRepository
)
