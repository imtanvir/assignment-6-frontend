import { Suspense } from "react";

import Container from "../../../../components/UI/Container";
import PostCard from "../../../../components/UI/postCard";

import PostLoadingSkeleton from "@/src/components/UI/postLoadingSkeleton";
import { singlePost } from "@/src/services/Posts";
import { IPost } from "@/src/types";

interface IProps {
  params: {
    postId: string;
  };
}
const SinglePost = async ({ params: { postId } }: IProps) => {
  const { data: post } = await singlePost(postId);

  return (
    <>
      <Container>
        {post && (
          <section>
            <h1 className=" font-light text-xl capitalize ">
              Read pet lover stories, tip and advice
            </h1>
            <Suspense fallback={<PostLoadingSkeleton />}>
              <PostCard singlePost={post as IPost} />
            </Suspense>
          </section>
        )}
      </Container>
    </>
  );
};

export default SinglePost;
