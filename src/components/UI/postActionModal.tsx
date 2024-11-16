"use client";
import {
  Avatar,
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import Image from "next/image";
import { useEffect, useState } from "react";

import FXForm from "../form/FXForm";
import FXInput from "../form/FXInput";

import Styles from "./Post.module.css";
import PostCommentCard from "./postCommentCard";

import { useUser } from "@/src/context/user.provider";
import { useCommentOnPost } from "@/src/hooks/post.hook";
import { Comment, User } from "@/src/types";

export default function PostActionModal({
  isOpen,
  postId,
  onOpenChange,
  user,
  post,
  comments,
  image,
}: {
  isOpen: boolean;
  postId: string;
  onOpenChange: (isOpen: boolean) => void;
  user: User;
  post: string;
  comments: Comment[];
  image: string;
}) {
  const { user: currentUser } = useUser();
  const [postComments, setPostComments] = useState<Comment[] | []>(comments);
  const {
    mutate: commentOnPost,
    data,
    isPending,
    isSuccess,
  } = useCommentOnPost();

  const handleCommentSubmit = (data: { comment: string }) => {
    if (currentUser?.role === "user" && currentUser?.email) {
      const commentData = {
        userId: currentUser?._id,
        comment: data?.comment,
        postId,
      };

      commentOnPost(commentData);
    }
  };

  const [lastComments, setLastComments] = useState<Comment | null>(null);

  useEffect(() => {
    if (data?.success && data?.data) {
      const lastComment = data?.data?.allComments?.comments[
        data?.data?.allComments?.comments.length - 1
      ] as Comment;

      setPostComments((prev) => [...prev, lastComment]);
      setLastComments(lastComment);
    }
  }, [data]);
  // const truncatedHtml = truncate(post, 50);

  return (
    <>
      <Modal
        className="z-[999] tanvir2"
        isOpen={isOpen}
        scrollBehavior="inside"
        size={"5xl"}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="z-[999] tanvir">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {`${user?.name}'s post`}
                <Divider className="my-2" />
              </ModalHeader>
              <ModalBody>
                <section>
                  <div className="p-5">
                    <div
                      dangerouslySetInnerHTML={{ __html: post }}
                      className={Styles.Output}
                    />
                  </div>
                  <div className="relative w-full md:h-[300px] h-[200px] overflow-hidden">
                    <Image
                      fill
                      alt="Blog post image"
                      className="rounded-lg object-center object-cover"
                      sizes=" ( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
                      src={image ? image : ""}
                    />
                  </div>
                  {/* comments here */}
                  <Divider className="my-4" />
                  <p>Comments</p>
                  <div className="py-5">
                    {/* {comments.map((comment) => (
                      <PostCommentCard
                        key={comment._id}
                        comment={comment?.comment}
                        imageUrl={comment?.author?.image[0]?.url}
                        userName={comment?.author?.name}
                      />
                    ))} */}

                    {postComments?.map((comment) => (
                      <PostCommentCard
                        key={comment._id}
                        authorId={comment?.author?._id}
                        comment={comment?.comment}
                        commentId={comment?._id}
                        imageUrl={
                          comment?.author?.image[0]?.url
                            ? comment?.author?.image[0]?.url
                            : ""
                        }
                        postId={postId}
                        setPostComments={setPostComments}
                        user={currentUser as User}
                        userName={comment?.author?.name}
                      />
                    ))}

                    {postComments?.length === 0 && (
                      <p className="text-center my-5">
                        No comments on this post
                      </p>
                    )}
                    {/* {lastComments?.author ? (
                      <PostCommentCard
                        comment={lastComments.comment}
                        imageUrl={
                          lastComments?.author?.image?.[0]?.url
                            ? lastComments?.author?.image?.[0]?.url
                            : ""
                        }
                        userName={lastComments.author.name}
                      />
                    ) : null} */}
                  </div>
                </section>
              </ModalBody>
              <ModalFooter className="block">
                <Divider className="my-2" />
                <div>
                  <FXForm onSubmit={handleCommentSubmit}>
                    <div className="flex gap-4 items-center">
                      <Avatar
                        isBordered
                        radius="full"
                        size="sm"
                        src={user?.image?.[0]?.url || ""}
                      />
                      <FXInput
                        className="w-full"
                        label=""
                        name="comment"
                        placeholder="Comment on this post"
                        size="lg"
                        type="text"
                        value=""
                        variant={"faded"}
                      />
                      <Button
                        isIconOnly
                        className=""
                        disabled={isPending === true && isSuccess === false}
                        size="sm"
                        title="Send"
                        type="submit"
                        variant="light"
                      >
                        <svg
                          className="size-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Button>
                    </div>
                  </FXForm>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
