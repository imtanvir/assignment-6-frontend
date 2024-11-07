import { Input } from "@nextui-org/input";

import { SearchIcon } from "../../icons";
import PostFilter from "../../UI/postFilter";

const SearchAndFilterPost = () => {
  return (
    <>
      <div className="py-10 max-w-xl flex-1 mx-auto">
        <h1 className="text-center text-4xl font-medium pb-4">
          Explore the Best Tips & Advice for a Healthier, Happier Pet!
        </h1>
        <form className="flex gap-4">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-200",
              input: "text-sm",
            }}
            placeholder="Search tips or story..."
            size="lg"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
            }
          />
          <PostFilter />
        </form>
      </div>
    </>
  );
};

export default SearchAndFilterPost;
