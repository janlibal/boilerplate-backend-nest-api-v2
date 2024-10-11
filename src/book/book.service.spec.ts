import { Test, TestingModule } from '@nestjs/testing'
import { BookService } from './book.service'
import { BookModel } from './model/book.model'

describe('AppController', () => {
  let bookService: BookService
  let model: BookModel

  const mockBookService = {
    create: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: 'My Book',
          useValue: mockBookService,
        },
      ],
    }).compile()

    bookService = module.get<BookService>(BookService)
    model = module.get<BookModel>('My Book')
  })

  describe('root', () => {
    it('should crate and return a book', async () => {
      const myBook = {
        title: 'My Book',
        author: 'Myself',
      }

      /*jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve('as'))*/

      const result = await bookService.create()

      expect(result).toEqual(myBook)
    })
  })
})
