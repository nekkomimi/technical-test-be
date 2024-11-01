import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Users } from '../../users/schema/users.schema';
import mongoose from 'mongoose';
@Schema()
export class Session {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  })
  users: Users;
  @Prop()
  status: string;
  @Prop({
    required: true,
  })
  refresh_token: string;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    default: new Date(),
  })
  updatedAt: Date;
}
export const SessionSchema = SchemaFactory.createForClass(Session);
