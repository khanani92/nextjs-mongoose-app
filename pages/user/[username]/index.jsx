import { findUserByUsername } from '@/api-lib/db';
import dbConnect from '@/api-lib/mongoose';
import { User } from '@/page-components/User';
import Head from 'next/head';

export default function UserPage({ user }) {
  return (
    <>
      <Head>
        <title>
          {user.name} (@{user.username})
        </title>
      </Head>
      <User user={user} />
    </>
  );
}

export async function getServerSideProps(context) {
  await dbConnect();
  const user = await findUserByUsername(context.params.username);
  if (!user) {
    return {
      notFound: true,
    };
  }
  //user._doc._id = String(user._id);
  let userId = String(user._doc._id);
  delete user._doc._id;
  user._doc._id = userId;
  return { props: { user: user._doc } };
}
