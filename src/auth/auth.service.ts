import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { hashPassword } from '../core/hash_password';
import { randomUUID } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { ISession } from './interface/session.interface';
import { Model } from 'mongoose';
import { IUsers } from '../users/interface/users.interface';
import { SessionStatus } from './schema/session.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('Session') private sessionModel: Model<ISession>,
    @InjectModel('Users') private usersModel: Model<IUsers>,
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

    const newRefreshToken = randomUUID();

    const session = await new this.sessionModel({
      refresh_token: newRefreshToken,
      status: SessionStatus.active,
      users: existUsers,
    }).save();

    const accessToken = this.jwtService.sign(
      {
        id: existUsers.id,
        sessionId: session.id,
      },
      {
        expiresIn: '1d',
      },
    );

    const refresh_token = newRefreshToken;

    return {
      access_token: accessToken,
      refresh_token,
    };
  }

  // async logout(id: string) {
  //   const session = await this.prisma.sessions.findFirst({
  //     where: {
  //       id,
  //     },
  //   });
  //
  //   if (!session) {
  //     throw new NotFoundException('Session does not exist');
  //   }
  //
  //   await this.prisma.sessions.updateMany({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       status: 'INACTIVE',
  //     },
  //   });
  // }
  //
  // async refreshToken(dataRefreshToken: string) {
  //   const session = await this.prisma.sessions.findFirst({
  //     where: {
  //       refresh_token: {
  //         equals: dataRefreshToken,
  //       },
  //       status: 'ACTIVE',
  //     },
  //     include: {
  //       users: true,
  //     },
  //   });
  //
  //   if (!session) {
  //     throw new HttpException(
  //       {
  //         statusCode: HttpStatus.NOT_FOUND,
  //         error: 'refresh token not found',
  //       },
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
  //
  //   const accessToken = this.jwtService.sign(
  //     {
  //       id: session.users.id,
  //       session_id: session.id,
  //       role: session.users.role,
  //     },
  //     {
  //       expiresIn: '7d',
  //     },
  //   );
  //
  //   return {
  //     access_token: accessToken,
  //   };
  // }
}
