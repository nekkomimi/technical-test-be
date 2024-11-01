import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { SendEmailService } from './send-email.service';
import { CreateSendEmailDto } from './dto/create-send-email.dto';

@Controller('send-email')
export class SendEmailController {
  constructor(private readonly service: SendEmailService) {}

  @Post()
  async create(@Body() payload: CreateSendEmailDto) {
    return {
      data: await this.service.create(payload),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async getAll() {
    return {
      data: await this.service.getAll(),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
