import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { BadRequestError, ConflictError } from "src/swagger/all.errors.decorators";
import { registerPath } from "../constants/paths";
import { badRequestSignUpErrors, conflictErrors } from "../constants/errors";

export function registerDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'Registers a new user',
      description: 'Returns no content when registration succeeds',
    }),
    ApiResponse({status: 204, description: 'Success, returns no content'}),
    BadRequestError('Bad Request', registerPath, 'Something went wrong', badRequestSignUpErrors, 'Bad request exception'),
    ConflictError('Conflict', registerPath, 'Resource already exists', conflictErrors, 'Conflict exception')
)}