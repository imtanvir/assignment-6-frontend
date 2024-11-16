"use client";
import { useCallback, useEffect, useRef, useState } from "react";

import Container from "../../../UI/Container";

import PostCard from "@/src/components/UI/postCard";
import PostLoadingSkeleton from "@/src/components/UI/postLoadingSkeleton";
import { useUser } from "@/src/context/user.provider";
import { useGetAllUser, useUserProfile } from "@/src/hooks/user.hooks";
import { getPosts } from "@/src/services/Posts";
import { IPost } from "@/src/types";
import { delay } from "@/src/utils/delay";

const productPerPage = 5;

const FeedPost = () => {
  const { user: currentUser } = useUser();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { data: allUser } = useGetAllUser();

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    await delay(1500);

    const { data: posts } = await getPosts(
      `limit=${productPerPage}&skip=${(page - 1) * productPerPage}`
    );

    if (posts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prevProducts) => [...prevProducts, ...posts]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    const onIntersect = (entries: IntersectionObserverEntry[]) => {
      const loaderItem = entries[0];

      if (loaderItem.isIntersecting && hasMore && !loading) {
        fetchMoreData();
      }
    };

    const observer = new IntersectionObserver(onIntersect);

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchMoreData, hasMore, loading]);

  const { data: userProfileData } = useUserProfile();

  const viewer =
    currentUser?.role === "user" && currentUser?.email
      ? userProfileData?.data
      : {};

  return (
    <Container>
      <section>
        {posts.map((post: IPost) => (
          <div key={post._id}>
            <PostCard
              allUser={allUser?.data}
              singlePost={post}
              viewer={viewer}
            />
          </div>
        ))}
        {hasMore && posts && (
          <div ref={loaderRef} className="flex items-center justify-center">
            {/* {loading ? (
              <div className="flex items-center mb-4">
                <Spinner size="lg" />
              </div>
            ) : null} */}
            <PostLoadingSkeleton />
          </div>
        )}
        {/* {posts && !posts && <PostLoadingSkeleton item={itemts} />} */}
      </section>
    </Container>
  );
};

export default FeedPost;
