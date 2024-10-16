import { ModuleMetadata } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'
import path from 'path'

import loggerFactory from './logger.factory'
import { GlobalModule } from 'src/global/global.module'
import redisConfig from 'src/redis/config/redis.config'
import swaggerConfig from 'src/swagger/config/swagger.config'
import authConfig from 'src/auth/config/auth.config'
import appConfig from 'src/app/config/app.config'

function loggerModuleSetup() {
  /*const imports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, swaggerConfig, redisConfig],
      envFilePath: ['.env'],
    }),
  ]

  let meda: ModuleMetadata['imports'] = [];*/

  const loggerModule = LoggerModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: loggerFactory,
  })

  //const modulesSet = process.env.MODULES_SET || 'monolith';

  /*const customModules = [
    GlobalModule,
    LoggerModule.forRootAsync({
      //imports: [ConfigModule],
      //inject: [ConfigService],
      useFactory: loggerFactory,
    })
    //loggerModule,
  ];*/

  /*switch (modulesSet) {
    case 'monolith':
      customModules = [
        GlobalModule,
        loggerModule,
      ];
      break;
    case 'api':
      customModules = [
        GlobalModule,
        loggerModule,
      ];
      break;
    default:
      console.error(`Unsupported modules set: ${modulesSet}`);
      break;
  }*/

  //return imports.concat(customModules);
  return loggerModule
}

export default loggerModuleSetup
