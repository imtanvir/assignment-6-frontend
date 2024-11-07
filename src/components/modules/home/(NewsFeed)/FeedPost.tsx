import Container from "../../../UI/Container";

import PostCard from "@/src/components/UI/postCard";
import { getPosts } from "@/src/services/Posts";
import { IPost } from "@/src/types";

const FeedPost = async () => {
  const { data: posts } = await getPosts();

  return (
    <Container>
      <section>
        {posts.map((post: IPost) => (
          <div key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </section>
    </Container>
  );
};

export default FeedPost;
