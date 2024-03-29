import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import Date from "../../components/date";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
    const params = getAllPostIds();
    return {
        paths: params,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const id = params.id;
    const data = await getPostData(id);
    return {
        props: {
            postData: data,
        },
    };
}

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}
