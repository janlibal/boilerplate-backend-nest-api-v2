import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AppRepository } from './app.reposiroty'

@Module({
  controllers: [AppController],
  providers: [AppService, AppRepository],
  exports: [AppModule],
})
export class AppModule {}
