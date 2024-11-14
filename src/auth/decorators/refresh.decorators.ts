import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { BadRequestError, InternalError, SuccessResponse, UnauthorizedError, UnprocessableEntityError } from "src/swagger/all.errors.decorators";
import { LoginResponseDto } from "../dto/login.response.dto";
import { loginPath } from "../constants/paths";
import { badRequestSignInErrors, unprocessableErrors } from "../constants/errors";

export function refreshDecorators() {
  return applyDecorators(
  ApiOperation({
    summary: 'Issues a refres token',
    description: 'Issues a refresh token based on originally issued token',
  }),
  ApiBearerAuth()
)}