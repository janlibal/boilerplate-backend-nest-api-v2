import { HttpException, HttpStatus } from '@nestjs/common'

export class NewBadRequestError extends HttpException {
  constructor(messages: string | string[]) {
    if (typeof messages === 'string') {
      messages = [messages]
    }
    super(
      {
        //'A. title': 'New Bad request Erro',
        '4. name': 'NewBadRequest',
        '5. type': 'NEW_BAD_REQUEST',
        //'D. status': HttpStatus.BAD_REQUEST || 400,
        '6. detail': 'Error: ' + messages.map((m) => m),
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class NewResourceNotFound extends HttpException {
  constructor(resource: string) {
    super(
      {
        '4. name': 'NewResourceNotFound',
        '5. type': 'NEW_RESOURCE_NOT_FOUND',
        '6. detail': `Error: Resource ${resource} could not be found.`,
      },
      HttpStatus.NOT_FOUND,
    )
  }
}

export class NewNotFoundError extends HttpException {
  constructor(resource: string, identitier: number) {
    super(
      {
        '4. name': 'NewNotFound',
        '5. type': 'NEW_NOT_FOUND',
        '6. detail': `Error: Resource ${resource} with identifier ${identitier} could not be found.`,
      },
      HttpStatus.NO_CONTENT,
    )
  }
}

export class NotFoundError extends HttpException {
  constructor(resource: string, identifier: number) {
    super(
      {
        title: 'Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: 'The resource you requested could not be found.',
        errors: `${resource} with identifier ${identifier} was not found`,
        /*errors: [
          {
            message: `${resource} with identifier '${identifier}' was not found`,
          },
        ],*/
      },
      HttpStatus.NOT_FOUND,
    )
  }
}

/*export class BadRequestError extends HttpException {
  constructor(messages: string | string[]) {
    if (typeof messages === 'string') {
      messages = [messages]
    }
    super(
      {
        title: 'Bad Request',
        status: HttpStatus.BAD_REQUEST,
        detail:
          'The request could not be processed due to semantic errors. Please check your input and try again.',
        errors: messages.map((message) => ({ message })),
      },
      HttpStatus.BAD_REQUEST,
    )
  }
}*/

export class OldResourceNotFound extends HttpException {
  constructor(resource: string) {
    super(
      {
        title: 'Resource Not Found',
        status: HttpStatus.NOT_FOUND,
        detail: 'The resource you requested could not be found.',
        errors: `${resource} was not found`,
        /*errors: [
          {
            message: `${resource} was not found`,
          },
        ],*/
      },
      HttpStatus.NOT_FOUND,
    )
  }
}
