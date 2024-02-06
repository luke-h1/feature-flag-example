import Head from "next/head";
import { useFlags } from "launchdarkly-react-client-sdk";
import { GetStaticPaths, GetStaticProps } from "next";
import { Post, getPostData } from "@frontend/util/posts";
import Layout from "@frontend/components/Layout";
import utilStyles from "../../styles/utils.module.css";
import Date from "@frontend/components/Date";
import { getClient } from "@frontend/util/ld";

interface Props {
  post: Post;
}

const PostPage = ({ post }: Props) => {
  const { newBlogDesign } = useFlags();
  console.log("newBlogDesign", newBlogDesign);
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.date as unknown as string} />
          {` `}&mdash;{` `}
          <span>
            <code>new blog design</code> feature flag is{" "}
            {newBlogDesign ? "on" : "off"}
          </span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
};
export default PostPage;

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostData(params?.id as unknown as string);
  const client = await getClient();

  console.log("flags", flags);
  return {
    props: {
      post,
    },
  };
};
