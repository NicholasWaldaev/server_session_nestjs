import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthenticationService, LocalStrategy, LocalSerializer],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
