import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class Users {
  @Prop({
    required: true,
  })
  email: string;
  @Prop({
    required: true,
  })
  password: string;
  @Prop({
    required: true,
  })
  salt: string;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    default: new Date(),
  })
  updatedAt: Date;
}
export const UsersSchema = SchemaFactory.createForClass(Users);
