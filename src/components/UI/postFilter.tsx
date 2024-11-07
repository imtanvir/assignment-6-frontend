"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useState } from "react";

const PostFilter = () => {
  const [filter, setFilter] = useState("all");

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly variant="bordered">
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="all" onClick={() => setFilter("all")}>
          All
        </DropdownItem>
        <DropdownItem key="tips" onClick={() => setFilter("tips")}>
          Tips
        </DropdownItem>
        <DropdownItem key="story" onClick={() => setFilter("story")}>
          Story
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PostFilter;
