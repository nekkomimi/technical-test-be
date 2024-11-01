import { Document } from 'mongoose';
export interface ISendEmail extends Document {
  readonly email: string;
  readonly description: string;
  readonly sendDate: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
