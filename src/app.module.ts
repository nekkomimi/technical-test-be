import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SendEmailModule } from './send-email/send-email.module';
import { UsersModule } from './users/users.module';
import { SeederModule } from './seeder/seeder.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        DATABASE_URL: Joi.string(),
        JWT_PUBLIC_KEY: Joi.string(),
      }),
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: process.env.DB_NAME,
    }),
    SendEmailModule,
    UsersModule,
    AuthModule,
    SeederModule,
    CoreModule,
  ],
})
export class AppModule {}
