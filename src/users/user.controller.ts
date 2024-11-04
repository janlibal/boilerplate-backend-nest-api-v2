import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Delete,
  Get,
  SerializeOptions,
  Param,
} from '@nestjs/common'
import { ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger'
import { UserService } from './user.service'
import { User } from './domain/user.domain'
import { CreateUserDto } from './dto/create.user.dto'
import { NullableType } from 'src/utils/types/nullable.type'
import { SessionService } from 'src/session/session.service'
import { Session } from 'src/session/domain/session.domain'
import { ValidateUuidPipe } from 'src/pipes/validate.uuid.pipe'
import { ValidateIdPipe } from 'src/pipes/validate.id.pipe'
import { createDecorator, deleteDecorator } from './decorators/user.controller.decorator'

@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(
    private userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOneOld(
    @Param('id', ValidateUuidPipe) id: string,
  ): Promise<NullableType<User>> {
    return this.userService.findById(id)
  }

  @Get('/session/:id')
  @HttpCode(HttpStatus.OK)
  findOne(
    @Param('id', ValidateIdPipe) id: number,
  ): Promise<NullableType<Session>> {
    return this.sessionService.findById(id)
  }

  @Post()
  @SerializeOptions({
    groups: ['admin'],
  })
  @HttpCode(HttpStatus.CREATED)
  @createDecorator()  
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    return this.userService.create(createProfileDto)
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @deleteDecorator()
  remove(@Param('id') id: User['id']): Promise<void> {
    return this.userService.remove(id)
  }
}
