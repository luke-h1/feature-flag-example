import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@frontend/styles/Home.module.css";
import Layout, { siteTitle } from "@frontend/components/Layout";
import clsx from "clsx";
import utilStyles from "../styles/utils.module.css";
import { Post, getSortedPosts } from "../util/posts";
import { GetStaticProps } from "next";
import Link from "next/link";
import Date from "@frontend/components/Date";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  posts: Post[];
}

export default function Home({ posts }: Props) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={clsx(utilStyles.headingMd, utilStyles.padding1px)}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts &&
            posts.map((post) => (
              <li className={utilStyles.listItem} key={post.id}>
                <Link href={`/posts/${post.id}`}>{post.title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={post.date as unknown as string} />
                </small>
              </li>
            ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPosts = getSortedPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};
