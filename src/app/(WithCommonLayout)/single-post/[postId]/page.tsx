import { Suspense } from "react";

import Container from "../../../../components/UI/Container";
import PostCard from "../../../../components/UI/postCard";

import PostLoadingSkeleton from "@/src/components/UI/postLoadingSkeleton";
import { singlePost } from "@/src/services/Posts";
import { IPost } from "@/src/types";
export const dynamic = "force-dynamic";
interface IProps {
  params: {
    postId: string;
  };
}
const SinglePost = async ({ params: { postId } }: IProps) => {
  const { data: post } = await singlePost(postId);

  return (
    <section className="bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <Container>
        {post && (
          <section>
            <h1 className=" font-light text-xl capitalize ">
              Read pet lover stories, tip & advice
            </h1>
            <Suspense fallback={<PostLoadingSkeleton />}>
              <PostCard singlePost={post as IPost} />
            </Suspense>
          </section>
        )}
      </Container>
    </section>
  );
};

export default SinglePost;
