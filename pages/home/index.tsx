import { GetServerSidePropsContext } from 'next';
import { Session, unstable_getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { authOptions } from '../api/auth/[...nextauth]';
export default function Home() {
   const { data: session } = useSession();
  console.log(session)
  // return <div>none</div>;
  if (session) {
    return (
      <div className={styles.container}>
        index
      </div>
    )
  }
  return <div>Access Denied</div>
}
export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await unstable_getServerSession(
        context.req,
        context.res,
        authOptions
      ),
    },
  }
}
