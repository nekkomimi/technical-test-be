import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SendEmailModule } from './send-email/send-email.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27018', {
      dbName: 'technical-test',
    }),
    SendEmailModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
