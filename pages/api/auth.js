import { passport } from '@/backend/auth';
import { auths } from '@/backend/middlewares';
import { ncOpts } from '@/backend/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(passport.authenticate('local'), (req, res) => {
  //console.log(req.body.email);
  console.log('I am here');
  res.json({ user: req.user });
});

handler.delete(async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
