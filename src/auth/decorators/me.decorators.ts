import { applyDecorators, HttpStatus, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { BadRequestError, InternalError, SuccessResponse, UnauthorizedError, UnprocessableEntityError } from "src/swagger/all.errors.decorators";
import { LoginResponseDto } from "../dto/login.response.dto";
import { loginPath, mePath } from "../constants/paths";
import { badRequestSignInErrors, unprocessableErrors } from "../constants/errors";
import { User } from "src/users/domain/user.domain";
import { AccessTokenGuard } from "src/guards/acccess.token.guard";

export function meDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'User profile',
      description: 'Returns brief data of the user',
    }),
    ApiBearerAuth(),
    SuccessResponse(User, 'object', mePath, HttpStatus.OK, 'Returns user object when logged in')
)}