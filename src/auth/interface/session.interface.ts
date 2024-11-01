import { Document } from 'mongoose';
import { Users } from '../../users/schema/users.schema';
export interface ISession extends Document {
  readonly refresh_token: string;
  readonly users: Users;
  readonly status: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
