import { applyDecorators } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

export function loginDecorators() {
  return applyDecorators(
  ApiOperation({
    summary: 'Logs in User',
    description: 'Returns user data with token, refresh token and expiration',
  })
)
}