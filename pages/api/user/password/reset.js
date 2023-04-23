import { ValidateProps } from '@/api-lib/constants';
import {
  createToken,
  findAndDeleteTokenByIdAndType,
  findUserByEmail,
  UNSAFE_updateUserPassword,
} from '@/api-lib/db';
import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';
import { validateBody } from '@/api-lib/middlewares';
import dbConnect from '@/api-lib/mongoose';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';
import normalizeEmail from 'validator/lib/normalizeEmail';

const handler = nc(ncOpts);

handler.post(
  validateBody({
    type: 'object',
    properties: {
      email: ValidateProps.user.email,
    },
    required: ['email'],
    additionalProperties: false,
  }),
  async (req, res) => {
    await dbConnect();

    const email = normalizeEmail(req.body.email);
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({
        error: { message: 'We couldn’t find that email. Please try again.' },
      });
      return;
    }

    const token = await createToken({
      creatorId: user._id,
      type: 'passwordReset',
      expireAt: new Date(Date.now() + 1000 * 60 * 20),
    });

    await sendMail({
      to: email,
      from: MAIL_CONFIG.from,
      subject: '[nextjs-mongoose-app] Reset your password.',
      html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/forget-password/${token._id}">this link</a> to reset your password.</p>
      </div>
      `,
    });

    res.status(204).end();
  }
);

handler.put(
  validateBody({
    type: 'object',
    properties: {
      password: ValidateProps.user.password,
      token: { type: 'string', minLength: 0 },
    },
    required: ['password', 'token'],
    additionalProperties: false,
  }),
  async (req, res) => {
    await dbConnect();

    const deletedToken = await findAndDeleteTokenByIdAndType(
      req.body.token,
      'passwordReset'
    );
    if (!deletedToken) {
      res.status(403).end();
      return;
    }
    await UNSAFE_updateUserPassword(deletedToken.creatorId, req.body.password);
    res.status(204).end();
  }
);

export default handler;
