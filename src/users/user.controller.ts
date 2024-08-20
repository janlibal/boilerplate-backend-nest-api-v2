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
import { ValidateIdPipe } from 'src/pipes/validate.id.pipe'
import { SessionService } from 'src/session/session.service'
import { Session } from 'src/session/domain/session.domain'

@ApiTags('Users')
@Controller('/users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOneOld(
    @Param('id', ValidateIdPipe) id: string,
  ): Promise<NullableType<User>> {
    return this.userService.findById(id)
  }

  @Get('/session/:id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<NullableType<Session>> {
    return this.sessionService.findById(id)
  }

  @ApiCreatedResponse({
    type: User,
  })
  @SerializeOptions({
    groups: ['admin'],
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto): Promise<User> {
    return this.userService.create(createProfileDto)
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: User['id']): Promise<void> {
    return this.userService.remove(id)
  }
}
