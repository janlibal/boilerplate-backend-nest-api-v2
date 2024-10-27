import { Injectable, Logger } from '@nestjs/common'
import { BookModel } from './model/book.model'

@Injectable()
export class BookService {
  async create(): Promise<BookModel> {
    const book = {
      title: 'My Book',
      author: 'Myself',
    }
    return book
  }
}
