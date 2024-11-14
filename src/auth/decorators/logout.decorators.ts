import { applyDecorators } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";

export function logoutDecorators() {
  return applyDecorators(
  ApiOperation({
    summary: 'Logs out user',
    description: 'Returns no content when logout succeeds',
  }),
  ApiBearerAuth(),
  ApiResponse({status: 204, description: 'Success, returns no content'})
)}