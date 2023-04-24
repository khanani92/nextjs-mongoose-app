import { ValidateProps } from '@/backend/constants';
import { updateUserPasswordByOldPassword } from '@/backend/db';
import { auths, validateBody } from '@/backend/middlewares';
import dbConnect from '@/backend/mongoose';
import { ncOpts } from '@/backend/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);
handler.use(...auths);

handler.put(
  validateBody({
    type: 'object',
    properties: {
      oldPassword: ValidateProps.user.password,
      newPassword: ValidateProps.user.password,
    },
    required: ['oldPassword', 'newPassword'],
    additionalProperties: false,
  }),
  async (req, res) => {
    if (!req.user) {
      res.json(401).end();
      return;
    }

    await dbConnect();

    const { oldPassword, newPassword } = req.body;

    const success = await updateUserPasswordByOldPassword(
      req.user._id,
      oldPassword,
      newPassword
    );

    if (!success) {
      res.status(401).json({
        error: { message: 'The old password you entered is incorrect.' },
      });
      return;
    }

    res.status(204).end();
  }
);

export default handler;
