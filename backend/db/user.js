import User from '../models/user';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import normalizeEmail from 'validator/lib/normalizeEmail';

export async function findUserWithEmailAndPassword(email, password) {
  email = normalizeEmail(email);
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }; // filtered out password
  }
  return null;
}

export async function findUserForAuth(userId) {
  return User.findOne(
    { _id: new ObjectId(userId) },
    { projection: { password: 0 } }
  ).then((user) => user || null);
}

export async function findUserById(userId) {
  return User.findOne(
    { _id: new ObjectId(userId) },
    { projection: dbProjectionUsers() }
  ).then((user) => user || null);
}

export async function findUserByUsername(username) {
  return User.findOne({ username }, { projection: dbProjectionUsers() }).then(
    (user) => user || null
  );
}

export async function findUserByEmail(email) {
  email = normalizeEmail(email);
  return User.findOne({ email }, { projection: dbProjectionUsers() }).then(
    (user) => user || null
  );
}

export async function updateUserById(id, data) {
  return User.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: data },
    { returnDocument: 'after', projection: { password: 0 } }
  ).then(({ value }) => value);
}

export async function insertUser({
  email,
  originalPassword,
  bio = '',
  name,
  profilePicture,
  username,
}) {
  const user = {
    emailVerified: false,
    profilePicture,
    email,
    name,
    username,
    bio,
  };
  const password = await bcrypt.hash(originalPassword, 10);
  const userCreate = await User.create({ ...user, password });
  user._id = userCreate._id;
  return user;
}

export function dbProjectionUsers(prefix = '') {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}
