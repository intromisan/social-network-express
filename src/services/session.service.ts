import { get } from 'lodash';
import { FilterQuery, UpdateQuery } from 'mongoose';
import ISession from '../interfaces/session';
import SessionModel from '../models/session.model';
import { signJwt, verifyJwt } from '../utils/jwt';
import { findUser } from './user.service';
import config from '../config/default';

export async function createSession(userId: string) {
  const session = await SessionModel.create({ user: userId });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<ISession>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(query: FilterQuery<ISession>, update: UpdateQuery<ISession>) {
  return SessionModel.updateOne(query, update);
}

export async function reIssueAccessToken({ refreshToken }: { refreshToken: string }) {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    {
      ...user,
      session: session._id
    },
    { expiresIn: config.accessTokenTtl as string } // 15 minutes
  );

  return accessToken;
}
