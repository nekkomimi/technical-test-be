import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersSchema } from '../users/schema/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Users',
        schema: UsersSchema,
      },
    ]),
  ],
  providers: [SeederService],
})
export class SeederModule {}
