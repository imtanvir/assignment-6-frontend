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
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";

import { useDeleteComment, useEditComment } from "@/src/hooks/post.hook";
import { Comment, User } from "@/src/types";

const PostCommentCard = ({
  imageUrl,
  userName,
  comment,
  authorId,
  user,
  postId,
  commentId,
  setPostComments,
}: {
  imageUrl: string;
  userName: string;
  comment: string;
  authorId: string;
  user: User;
  postId: string;
  commentId: string;
  setPostComments: Dispatch<SetStateAction<Comment[]>>;
}) => {
  const [editComment, setEditComment] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState<string>(comment);
  const {
    mutate: editCommentHandler,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
    data: editCommentUpdateData,
  } = useEditComment();

  const {
    mutate: deleteCommentHandler,
    isPending: isDeletePending,
    isSuccess: isDeleteSuccess,
    data: deleteCommentUpdateData,
  } = useDeleteComment();

  const handleEditedComment = (data: { comment: string }) => {
    if (data?.comment) {
      setCommentValue(data?.comment);
      editCommentHandler({
        commentId: commentId,
        comment: data?.comment,
        postId: postId,
      });
    }
  };

  const handleDeleteComment = () => {
    deleteCommentHandler({
      commentId: commentId,
      userId: user?._id,
      postId: postId,
    });
  };

  useEffect(() => {
    if (isEditSuccess && editCommentUpdateData?.data?.comments) {
      setPostComments((prev) =>
        prev.map((c) =>
          c._id === commentId ? { ...c, comment: commentValue } : c
        )
      );
      setEditComment(false);
    }

    if (isDeleteSuccess && deleteCommentUpdateData?.data?.comments) {
      setPostComments((prev) => prev.filter((c) => c._id !== commentId));
    }
  }, [
    isEditSuccess,
    editCommentUpdateData,
    commentId,
    commentValue,
    isDeleteSuccess,
    deleteCommentUpdateData,
  ]);

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
            <div className={`${user?._id === authorId ? "block" : "hidden"}`}>
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
                  <DropdownItem key="delete">
                    <Button
                      className="bg-transparent w-full h-full p-0 text-start rounded"
                      disabled={isDeletePending && !isDeleteSuccess}
                      size="md"
                      variant="light"
                      onClick={handleDeleteComment}
                    >
                      {isDeletePending && !isDeleteSuccess
                        ? "Deleting..."
                        : "Delete"}
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          {editComment === false && (
            <p className="text-small tracking-tight text-default-500">
              {commentValue}
            </p>
          )}
          {editComment && (
            <FXForm onSubmit={handleEditedComment}>
              <div className="flex gap-2 flex-wrap">
                <FXInput
                  className="lg:w-[700px] md:w-[500px] w-full"
                  label=""
                  name="comment"
                  required={true}
                  size="lg"
                  type="text"
                  value={commentValue}
                />
                <Button
                  className="mt-2"
                  disabled={isEditPending && !isEditSuccess}
                  size="sm"
                  type="submit"
                >
                  {isEditPending && !isEditSuccess ? "Saving..." : "save"}
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
