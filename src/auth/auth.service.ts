import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from '../users/interface/users.interface';
import { LoginDto } from './dto/login.dto';
import { hashPassword } from '../core/hash_password';
import { ISession } from './interface/session.interface';
import { Session } from './schema/session.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Users') private usersModel: Model<IUsers>,
    @InjectModel('Session') private sessionModel: Model<ISession>,
  ) {}

  async login(loginDto: LoginDto) {
    const existUsers = await this.usersModel
      .findOne({
        email: loginDto.email,
      })
      .exec();

    if (!existUsers) {
      throw new NotFoundException('User does not exist');
    }

    const passwordHashed = await hashPassword(
      loginDto.password,
      existUsers.salt,
    );

    if (existUsers.password !== passwordHashed) {
      throw new BadRequestException('Wrong email or password');
    }

    const session = new Session();
    session.refresh_token = randomUUID();
    session.users = existUsers;
    session.status = 'active';

    const newSession = await this.sessionModel.create(session);

    const accessToken = this.jwtService.sign(
      {
        id: existUsers.id,
        session_id: newSession.id,
      },
      {
        expiresIn: '1d',
      },
    );

    return {
      access_token: accessToken,
      refresh_token: newSession.refresh_token,
    };
  }
}
