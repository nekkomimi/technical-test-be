/* eslint-disable linebreak-style */
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtStrategy } from '../core/jwt.strategy';
import { JwtAuthGuard } from '../core/jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { SessionSchema } from './schema/session.schema';
import { UsersSchema } from '../users/schema/users.schema';
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_PUBLIC_KEY,
      signOptions: {
        expiresIn: '7d',
      },
    }),
    MongooseModule.forFeature([
      {
        name: 'Session',
        schema: SessionSchema,
      },
      {
        name: 'Users',
        schema: UsersSchema,
      },
    ]),
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
