import FeedPost from "@/src/components/modules/home/(NewsFeed)/FeedPost";
import SearchAndFilterPost from "@/src/components/modules/home/SearchAndFilterPost";

export default function Home() {
  return (
    <section className="bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800">
      <SearchAndFilterPost />
      <FeedPost />
    </section>
  );
}
