import { findUserById } from '@/backend/db';
import dbConnect from '@/backend/mongoose';
import { ncOpts } from '@/backend/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  await dbConnect();
  const user = await findUserById(req.query.userId);
  res.json({ user });
});

export default handler;
