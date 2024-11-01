import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema()
export class SendEmail {
  @Prop({
    required: true,
  })
  email: string;
  @Prop()
  description: string;
  @Prop({
    required: true,
  })
  sendDate: Date;
  @Prop({
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    default: new Date(),
  })
  updatedAt: Date;
}
export const SendEmailSchema = SchemaFactory.createForClass(SendEmail);
