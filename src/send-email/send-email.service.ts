import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISendEmail } from './interface/send-email.interface';
import { Model } from 'mongoose';
import { CreateSendEmailDto } from './dto/create-send-email.dto';

@Injectable()
export class SendEmailService {
  constructor(
    @InjectModel('SendEmail') private sendEmailModel: Model<ISendEmail>,
  ) {}

  async create(payload: CreateSendEmailDto) {
    const newStudent = await new this.sendEmailModel(payload);
    return newStudent.save();
  }

  async getAll() {
    const [count, data] = await Promise.all([
      this.sendEmailModel.countDocuments(),
      this.sendEmailModel.find({}),
    ]);

    return {
      count,
      data,
    };
  }
}
