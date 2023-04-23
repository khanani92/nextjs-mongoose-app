import { nanoid } from 'nanoid';
import Token from '../models/token';

export function findTokenByIdAndType(id, type) {
  return Token.findOne({
    _id: id,
    type,
  });
}

export function findAndDeleteTokenByIdAndType(id, type) {
  return Token.findOneAndDelete({ _id: id, type }).then(({ value }) => value);
}

export async function createToken({ creatorId, type, expireAt }) {
  const securedTokenId = nanoid(32);
  const token = {
    _id: securedTokenId,
    creatorId,
    type,
    expireAt,
  };
  await Token.insertOne(token);
  return token;
}
