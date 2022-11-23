import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import PostModel, { IPostModel } from '../models/post.model';

export async function createPost(input: DocumentDefinition<Omit<IPostModel, 'createdAt' | 'updatedAt'>>) {
  return PostModel.create(input);
}

export async function findAllPosts(query: FilterQuery<IPostModel>, options: QueryOptions = { lean: true }) {
  return PostModel.find(query, {}, options);
}

export async function findPost(query: FilterQuery<IPostModel>, options: QueryOptions = { lean: true }) {
  return PostModel.findOne(query, {}, options);
}
export async function findAndUpdatePost(query: FilterQuery<IPostModel>, update: UpdateQuery<IPostModel>, options: QueryOptions = { lean: true }) {
  return PostModel.findOneAndUpdate(query, update, options);
}
export async function findAndDeletePost(query: FilterQuery<IPostModel>) {
  return PostModel.findOneAndDelete(query);
}
