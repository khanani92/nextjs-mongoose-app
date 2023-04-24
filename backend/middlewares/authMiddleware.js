import { StatusCodes } from 'http-status-codes';

export async function isAuth(req, res, next) {
  const { user } = req;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'You must be authorized.' });
  }

  return next();
}

export async function isSuperAdmin(req, res, next) {
  const { user } = req;

  if (!user) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error: 'You must be authorized.' });
  }

  if (user.role != 'superAdmin') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: 'You do not have permission. Only Super Admin has permission',
    });
  }

  return next();
}

export async function isGuest(req, res, next) {
  const { user } = req;

  if (user) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'You have already authorized.' });
  }

  return next();
}

export async function isVerified(req, res, next) {
  const {
    context: {
      user: {
        account: {
          verification: { verified },
        },
      },
    },
  } = req;

  if (!verified) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'You must be verified.' });
  }

  return next();
}

export async function isUnverfied(req, res, next) {
  const {
    context: {
      user: {
        account: {
          verification: { verified },
        },
      },
    },
  } = req;

  if (verified) {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: 'You have already verified.' });
  }

  return next();
}
