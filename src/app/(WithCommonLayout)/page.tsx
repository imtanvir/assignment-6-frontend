import { Suspense } from "react";

import FeedPost from "@/src/components/modules/home/(NewsFeed)/FeedPost";
import SearchAndFilterPost from "@/src/components/modules/home/SearchAndFilterPost";
import PostLoadingSkeleton from "@/src/components/UI/postLoadingSkeleton";

export default function Home() {
  return (
    <section className="bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <SearchAndFilterPost />
      <Suspense fallback={<PostLoadingSkeleton />}>
        <FeedPost />
      </Suspense>
    </section>
  );
}
