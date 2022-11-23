import { Document, model, Schema, SchemaTypes } from 'mongoose';
import { IPost } from '../interfaces/post';

export interface IPostModel extends IPost, Document {}

export const PostModelSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const PostModel = model<IPostModel>('Posts', PostModelSchema);

export default PostModel;
