import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger'

export class BookModel {
  @ApiProperty({
    type: String,
    example: 'The Falling Angels',
  })
  title: string | null

  @ApiProperty({
    type: String,
    example: 'John Brutton',
  })
  author: string | null
}
