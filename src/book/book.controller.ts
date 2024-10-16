import { Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { BookService } from './book.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Books')
@Controller({
  path: 'book',
  version: '1',
})
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create() {
    return await this.bookService.create()
  }
}
