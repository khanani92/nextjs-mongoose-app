import { findUserById } from '@/api-lib/db';
import dbConnect from '@/api-lib/mongoose';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  await dbConnect();
  const user = await findUserById(req.query.userId);
  res.json({ user });
});

export default handler;
