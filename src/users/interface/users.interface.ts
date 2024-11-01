import { Document } from 'mongoose';
export interface IUsers extends Document {
  readonly email: string;
  readonly password: string;
  readonly salt: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
