import { findAndDeleteTokenByIdAndType, updateUserById } from '@/backend/db';
import dbConnect from '@/backend/mongoose';
import { VerifyEmail } from '@/page-components/VerifyEmail';
import Head from 'next/head';

export default function EmailVerifyPage({ valid }) {
  return (
    <>
      <Head>
        <title>Email verification</title>
      </Head>
      <VerifyEmail valid={valid} />
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();

  const { token } = context.params;

  const deletedToken = await findAndDeleteTokenByIdAndType(
    token,
    'emailVerify'
  );

  if (!deletedToken) return { props: { valid: false } };

  await updateUserById(deletedToken.creatorId, {
    emailVerified: true,
  });

  return { props: { valid: true } };
}
