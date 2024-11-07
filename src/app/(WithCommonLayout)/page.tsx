import { Suspense } from "react";

import FeedPost from "@/src/components/modules/home/(NewsFeed)/FeedPost";
import SearchAndFilterPost from "@/src/components/modules/home/SearchAndFilterPost";
import PostLoadingSkeleton from "@/src/components/UI/postLoadingSkeleton";

export default function Home() {
  return (
    <>
      <SearchAndFilterPost />
      <Suspense fallback={<PostLoadingSkeleton />}>
        <FeedPost />
      </Suspense>
    </>
  );
}
