import { Controller, Get, Post, UseInterceptors } from '@nestjs/common'
import { BookService } from './book.service'

@Controller()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/book')
  async create() {
    return await this.bookService.create()
  }
}
