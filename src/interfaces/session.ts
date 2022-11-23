import { Document } from 'mongoose';
import IUser from './user';

export default interface ISession extends Document {
  user: IUser['_id'];
  valid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
