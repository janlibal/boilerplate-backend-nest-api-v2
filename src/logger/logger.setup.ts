import { ConfigModule, ConfigService } from '@nestjs/config'
import loggerFactory from './logger.factory'

export const loggerSetuo = {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: loggerFactory,
}
