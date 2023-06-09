import { findTokenByIdAndType } from '@/backend/db';
import dbConnect from '@/backend/mongoose';
import { ForgetPasswordToken } from '@/page-components/ForgetPassword';
import Head from 'next/head';

const ResetPasswordTokenPage = ({ valid, token }) => {
  return (
    <>
      <Head>
        <title>Forget password</title>
      </Head>
      <ForgetPasswordToken valid={valid} token={token} />
    </>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();

  const tokenDoc = await findTokenByIdAndType(
    context.params.token,
    'passwordReset'
  );

  return { props: { token: context.params.token, valid: !!tokenDoc } };
}

export default ResetPasswordTokenPage;
