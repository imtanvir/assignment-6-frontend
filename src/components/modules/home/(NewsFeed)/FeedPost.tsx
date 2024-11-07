import Container from "../../../UI/Container";

import { getPosts } from "@/src/services/Posts";

const FeedPost = async () => {
  const { data: post } = await getPosts();

  return (
    <Container>
      <div>FeedPost</div>
      {post.map((post: any) => (
        <div key={post._id}>
          <h1>{post?.user?.name}</h1>
        </div>
      ))}
    </Container>
  );
};

export default FeedPost;
