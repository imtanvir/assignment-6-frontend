"use client";
import { Input } from "@nextui-org/input";
import truncate from "html-truncate";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { SearchIcon } from "../../icons";
import Container from "../../UI/Container";

import Styles from "./Post.module.css";

import useDebounce from "@/src/hooks/debounce.hook";
import { useSearchPosts } from "@/src/hooks/post.hook";
import { IPost } from "@/src/types";

const SearchAndFilterPost = () => {
  const { register, handleSubmit, watch } = useForm();
  const { mutate: handleSearch, data, isPending, isSuccess } = useSearchPosts();
  const [searchResults, setSearchResults] = useState<IPost[] | []>([]);
  const searchTerm = useDebounce(watch("search"));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log({ data });
    return;
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([]);
    }
    if (!isPending && isSuccess && data && searchTerm) {
      setSearchResults(data?.data ?? []);
    }
  }, [isPending, isSuccess, data, searchTerm]);

  const truncatedHtml = (post: string) => {
    return truncate(post, 30);
  };

  return (
    <Container>
      <div className="py-10 max-w-xl flex-1 mx-auto">
        <h1 className="text-center md:text-4xl text-2xl font-extralight pb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          Explore the Best Tips & Advice for a Healthier, Happier Pet!
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("search")}
            aria-label="Search"
            classNames={{
              inputWrapper: "dark:bg-default-200",
              input: "text-sm",
            }}
            placeholder="Search tips or story..."
            size="lg"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
            }
            type="text"
          />
          {/* <PostFilter /> */}
        </form>
        {searchResults.length > 0 && (
          <div className="mt-2 rounded-xl bg-default-100 p-3 h-[300px] overflow-auto">
            <div className="space-y-3">
              {searchResults.map((post: IPost, index) => (
                <Link
                  key={index}
                  className="text-default-900 block rounded-md from-default-200 hover:from-default-300 p-2 transition-all bg-gradient-to-l hover:bg-gradient-to-l overflow-hidden"
                  href={`/single-post/${post?._id}`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        alt="item"
                        className="h-20 w-20 rounded-md"
                        src={post?.image[0]?.url ? post?.image[0]?.url : ""}
                      />
                      <div className="p-5">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: truncatedHtml(post?.post),
                          }}
                          className={Styles.Output}
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default SearchAndFilterPost;
