import { Document } from 'mongoose';
import { SessionStatus } from '../schema/session.schema';
import { Users } from '../../users/schema/users.schema';
export interface ISession extends Document {
  readonly refreshToken: string;
  readonly status: SessionStatus;
  readonly users: Users;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
