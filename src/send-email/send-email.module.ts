import { Module } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { SendEmailController } from './send-email.controller';
import { SendEmailSchema } from './schema/send-email.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'SendEmail', schema: SendEmailSchema }]),
  ],
  providers: [SendEmailService],
  controllers: [SendEmailController],
})

export class SendEmailModule {}
