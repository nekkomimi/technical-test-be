import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUsers } from '../users/interface/users.interface';
import { UsersSeeder } from './users-seeder';
import { Users } from '../users/schema/users.schema';
import { randomUUID } from 'crypto';
import { hashPassword } from '../core/hash_password';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(@InjectModel('Users') private usersModel: Model<IUsers>) {}
  async onApplicationBootstrap() {
    await this.startSeedingRepository();
  }

  async startSeedingRepository() {
    await Promise.all([this.createUsers()]);
  }

  private async createUsers() {
    const dataExist = await this.usersModel.find({}).exec();
    const dataNotExists =
      UsersSeeder?.filter((it) => {
        return !dataExist.some((it2) => it2.email === it.email);
      }) || [];
    for await (const seed of dataNotExists) {
      const salt = randomUUID();
      const users = new Users();
      users.email = seed.email;
      users.salt = salt;
      users.password = await hashPassword(seed.password, salt);
      await this.usersModel.create(users);
    }
  }
}
