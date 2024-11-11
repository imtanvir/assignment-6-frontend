import PostLoadingSkeleton from "@/src/components/UI/postLoadingSkeleton";

const PostLoader = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <PostLoadingSkeleton key={index} />
      ))}
    </>
  );
};

export default PostLoader;
