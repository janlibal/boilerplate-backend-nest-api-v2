import { RequestMethod } from "@nestjs/common"
import { RouteInfo } from "@nestjs/common/interfaces"

export const publicRoutes: Array<RouteInfo> = [
  { path: `/auth/email/login`, method: RequestMethod.POST },
  { path: `/auth/email/register`, method: RequestMethod.POST },
  { path: `/app/info`, method: RequestMethod.GET },
]