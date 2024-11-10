"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import Link from "next/link";
import { useState } from "react";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";

const PostCommentCard = ({
  imageUrl,
  userName,
  comment,
}: {
  imageUrl: string;
  userName: string;
  comment: string;
}) => {
  const [editComment, setEditComment] = useState<boolean>(false);

  return (
    <>
      <div className="flex gap-5 py-5 my-1">
        <Avatar
          isBordered
          radius="full"
          size="sm"
          src={imageUrl ? imageUrl : ""}
        />
        <div className="flex flex-col gap-1 items-start justify-center">
          <div className="flex gap-2 items-center">
            <Link
              className="text-small font-semibold leading-none text-default-600"
              href={"/"}
            >
              {userName}
            </Link>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className=" bg-transparent hover:bg-default-200 active:bg-default-200"
                  size="sm"
                >
                  ...
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="edit" onClick={() => setEditComment(true)}>
                  Edit
                </DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
          {editComment === false && (
            <p className="text-small tracking-tight text-default-500">
              {comment}
            </p>
          )}
          {editComment && (
            <FXForm onSubmit={() => {}}>
              <div className="flex gap-2 flex-wrap">
                <FXInput
                  className="w-full"
                  label=""
                  name="comment"
                  required={true}
                  size="lg"
                  type="text"
                  value={comment}
                />
                <Button className="mt-2" size="sm" type="submit">
                  save
                </Button>
                <Button
                  className="mt-2"
                  size="sm"
                  onClick={() => setEditComment(false)}
                >
                  Cancel
                </Button>
              </div>
            </FXForm>
          )}
        </div>
      </div>
    </>
  );
};

export default PostCommentCard;
