import { ConfigService } from '@nestjs/config';
import { RefreshToken } from './../strategy/refresh_token';
import { AccessToken } from './../strategy/access_token';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule} from '@nestjs/jwt'

@Module({
  imports:[JwtModule.register({})],
  providers: [AuthService, AccessToken, RefreshToken, ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
