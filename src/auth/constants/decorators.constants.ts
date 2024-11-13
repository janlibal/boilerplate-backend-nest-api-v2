import { getSchemaPath } from "@nestjs/swagger"
import { LoginResponseDto } from "../dto/login.response.dto"

export const loginPath = '/api/v1/auth/email/login'

export const registerPath = '/api/v1/auth/email/register'
export const mePath = '/api/v1/auth/me'

export const badRequestSignInErrors = [{ "message": "Email must be in proper format"},{"message": "Email must be a string"},{"message": "Email cannot be empty"},{"message": "Password cannot be empty"}]

export const unprocessableErrors = [{ "message": "hasToLoginViaProvider:apple"},{"message": "missingPassword"},{"message": "roleIdMissing"},{"message": "statusIdMissing"}]

export const badRequestSignUpErrors = [{"message": "Firstname has to be defined"},{"message": "Firstname must be longer than 1 char"},{"message": "Firstname must be a string"},{"message": "Firstname cannot be empty"},{"message": "Lastname has to be defined"},{"message": "Lastname must be longer than 1 char"},{"message": "Lastname must be a string"},{"message": "Lastname cannot be empty"},{"message": "Email must be in proper format"},{"message": "Email must be a string"},{"message": "Email cannot be empty"},{"message": "Password has to be defined"},{"message": "Password is too weak"},{"message": "Password can contain 20 characters at the most"},{"message": "Password must contain at least 6 characters"},{"message": "Password must be a string"}]

export const conflictErrors = [{'message':'fake@email.com already exists'}, {$ref: getSchemaPath(LoginResponseDto)}]