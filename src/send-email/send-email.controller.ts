import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from '@nestjs/common';
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

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    return {
      data: await this.service.deleteById(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    }
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() payload: CreateSendEmailDto) {
    return {
      data: await this.service.update(id, payload),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
