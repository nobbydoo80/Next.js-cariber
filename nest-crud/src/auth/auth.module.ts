import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '../repositories'
import { AUTH_SECRET_TOKEN, AUTH_JWT_OPTIONS } from '../constants'
import { JwtStrategy } from './jwt.strategy'
import { LocalStrategy } from './local.strategy'
import { AuthService } from './auth.service'

const passportModule = PassportModule.register({ defaultStrategy: 'jwt' })

@Module({
  imports: [
    UserModule,
    passportModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        // TODO: LOAD THIS INFO FROM A CLOUD SERVICE FOR SECRETS MANAGEMENT
        secret: AUTH_SECRET_TOKEN,
        signOptions: AUTH_JWT_OPTIONS
      })
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, passportModule]
})
export class AuthModule {}
