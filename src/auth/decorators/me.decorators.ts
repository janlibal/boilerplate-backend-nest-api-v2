import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { SuccessResponse } from "src/swagger/all.errors.decorators";
import { mePath } from "../constants/paths";
import { User } from "src/users/domain/user.domain";

export function meDecorators() {
  return applyDecorators(
    ApiOperation({
      summary: 'User profile',
      description: 'Returns brief data of the user',
    }),
    ApiBearerAuth(),
    SuccessResponse(User, 'object', mePath, HttpStatus.OK, 'Returns user object when logged in')
)}