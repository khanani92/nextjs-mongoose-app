import { ValidateProps } from '@/backend/constants';
import { findUserByUsername, updateUserById } from '@/backend/db';
import { auths, validateBody } from '@/backend/middlewares';
import dbConnect from '@/backend/mongoose';
import { ncOpts } from '@/backend/nc';
import { slugUsername } from '@/lib/user';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';
import { isAuth } from '@/backend/middlewares/authMiddleware';

const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(...auths);

handler.get(isAuth, async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

handler.patch(
  isAuth,
  upload.single('profilePicture'),
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      bio: ValidateProps.user.bio,
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    await dbConnect();

    let profilePicture;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      profilePicture = image.secure_url;
    }
    const { name, bio } = req.body;

    let username;

    if (req.body.username) {
      username = slugUsername(req.body.username);
      if (
        username !== req.user.username &&
        (await findUserByUsername(username))
      ) {
        res
          .status(403)
          .json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(req.user._id, {
      ...(username && { username }),
      ...(name && { name }),
      ...(typeof bio === 'string' && { bio }),
      ...(profilePicture && { profilePicture }),
    });

    res.json({ user });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
