import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from '../core/jwt.strategy';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/schema/users.schema';
import { SessionSchema } from './schema/session.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UsersSchema,
      },
      {
        name: 'Session',
        schema: SessionSchema,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_PUBLIC_KEY,
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [JwtStrategy],
})
export class AuthModule {}
