import { model, SchemaTypes, Schema } from 'mongoose';
import ISession from '../interfaces/session';

const sessionSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: 'User'
    },
    valid: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const SessionModel = model<ISession>('Session', sessionSchema);
export default SessionModel;
