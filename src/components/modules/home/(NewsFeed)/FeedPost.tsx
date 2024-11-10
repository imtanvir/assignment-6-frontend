"use client";
import { Spinner } from "@nextui-org/react";
import { useCallback, useEffect, useRef, useState } from "react";

import Container from "../../../UI/Container";

import PostCard from "@/src/components/UI/postCard";
import { getPosts } from "@/src/services/Posts";
import { IPost } from "@/src/types";

const productPerPage = 5;

const FeedPost = () => {
  const [products, setProducts] = useState<IPost[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchMoreData = useCallback(async () => {
    if (loading) return; // Avoid duplicate calls
    setLoading(true);

    const { data: posts } = await getPosts(
      `limit=${productPerPage}&skip=${page * productPerPage}`
    );

    if (posts.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...posts]);
      setPage((prevPage) => prevPage + 1);
    }
    setLoading(false);
  }, [page, loading]);

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

  return (
    <Container>
      <section>
        {products.map((post: IPost) => (
          <div key={post._id}>
            <PostCard singlePost={post} />
          </div>
        ))}
        {hasMore && (
          <div
            ref={loaderRef}
            className="flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="flex items-center gap-2 mb-4">
                <span>Loading...</span>
                <Spinner size="md" />
              </div>
            ) : null}
          </div>
        )}
      </section>
    </Container>
  );
};

export default FeedPost;
