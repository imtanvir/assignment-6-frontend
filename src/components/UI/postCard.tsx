"use client";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import truncate from "html-truncate";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Styles from "./Post.module.css";
import PostActionModal from "./postActionModal";

import { useUser } from "@/src/context/user.provider";
import { useFollowToggler, useVoteOnPost } from "@/src/hooks/post.hook";
import { IPost, IUser } from "@/src/types";
export type IVote = {
  userId: string;
  postId: string;
  action: string;
};

const PostCard = ({
  singlePost,
  viewer,
  allUser,
}: {
  singlePost: IPost;
  viewer?: IUser;
  allUser?: IUser[];
}) => {
  const [backdrop, setBackdrop] = useState("opaque");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { user: currentUser } = useUser();
  const isViewerHasAccess = singlePost?.accessedUsers?.includes(
    currentUser?._id as string
  );
  const router = useRouter();
  const {
    mutate: voteOnPost,
    isPending: voteOnPostPending,
    isSuccess: voteOnPostSuccess,
  } = useVoteOnPost();

  const {
    mutate: followToggler,
    isPending: followTogglerPending,
    isSuccess: followTogglerSuccess,
  } = useFollowToggler();

  const {
    _id,
    user,
    premium,
    image,
    category,
    upvote,
    downvote,
    post,
    comments,
    votes,
  } = singlePost;

  const vote = votes.find((vote) => vote.userId === currentUser?._id);
  const [isUpvoted, setIsUpvoted] = useState(vote?.voteType === "upvote");
  const [isDownvoted, setIsDownvoted] = useState(vote?.voteType === "downvote");
  const [upVoteCount, setUpVoteCount] = useState(upvote);
  const [downVoteCount, setDownVoteCount] = useState(downvote);
  const { setUserProfile } = useUser();
  const viewerFollowing = viewer?.following;

  const isFollowing = viewerFollowing?.find((follower) => {
    return follower._id === user?._id;
  });

  const [isFollowed, setIsFollowed] = useState(
    isFollowing && isFollowing?.name && isFollowing?._id ? true : false
  );

  const handleVote = (action: string) => {
    const data: IVote = {
      postId: singlePost._id,
      userId: currentUser?._id as string,
      action: "",
    };

    if (action === "upvote" && isUpvoted === false) {
      data["action"] = "upvote";
      setIsUpvoted(true);
      setIsDownvoted(false);
      setUpVoteCount(upVoteCount + 1);
      setDownVoteCount(downVoteCount !== 0 ? downVoteCount - 1 : downVoteCount);
    }
    if (action === "downvote" && isDownvoted === false) {
      data["action"] = "downvote";
      setIsUpvoted(false);
      setIsDownvoted(true);
      setUpVoteCount(upVoteCount !== 0 ? upVoteCount - 1 : upVoteCount);
      setDownVoteCount(downVoteCount + 1);
    }

    if (action === "upvote" && isUpvoted === true) {
      data["action"] = "upvote";
      setIsUpvoted(false);
      setUpVoteCount(upVoteCount !== 0 ? upVoteCount - 1 : upVoteCount);
    }

    if (action === "downvote" && isDownvoted === true) {
      data["action"] = "downvote";
      setIsDownvoted(false);
      setDownVoteCount(downVoteCount !== 0 ? downVoteCount - 1 : downVoteCount);
    }

    voteOnPost(data);
  };

  const handleFollowToggler = () => {
    if (
      (currentUser?.role !== "user" && !currentUser?.email) ||
      currentUser?.role === "admin"
    ) {
      setBackdrop("blur");
      setHidePremium(true);
      onOpenChange();

      return;
    }
    setIsFollowed(!isFollowed);
    followToggler({
      followUser: user?._id,
      actionUserId: viewer?._id as string,
    });

    const targetUser = allUser?.find(
      (eachUser: IUser) => eachUser._id === user?._id
    );

    setUserProfile((prev) => {
      if (prev?.following) {
        return {
          ...prev,
          following: [...prev.following, targetUser! as IUser],
        } as IUser;
      } else {
        return {
          ...prev,
          following: [targetUser! as IUser],
        } as IUser;
      }
    });
  };
  const handleOpen = (backdrop: string) => {
    if (
      (currentUser?.role !== "user" && !currentUser?.email) ||
      currentUser?.role === "admin"
    ) {
      setBackdrop(backdrop);
      onOpen();
    }
  };
  const [hidePremium, setHidePremium] = useState(false);
  const [seePostToggle, setSeePostToggle] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      // Update the state when the modal closes
      setHidePremium(false);
    }
  }, [isOpen]);

  const handlePremium = () => {
    if (
      (currentUser?.role !== "user" && !currentUser?.email) ||
      currentUser?.role === "admin"
    ) {
      onOpenChange();
      setHidePremium(true);
    } else {
      router.push(`/payment/${_id}`);
    }
  };

  const truncatedHtml = truncate(post, 40);

  return (
    <section className="py-5">
      <Card className="relative text-default-900  from-default-200 transition-all bg-gradient-to-l hover:bg-gradient-to-l">
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              isBordered
              radius="full"
              size="md"
              src={user?.image[0]?.url ? user?.image[0]?.url : ""}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <div className="flex gap-2 items-center">
                <Link
                  className="text-small font-semibold leading-none text-default-600"
                  href={"/"}
                >
                  {user?.name}
                </Link>
                <Button
                  className={`px-2 ${
                    isFollowed
                      ? "bg-transparent text-foreground border-default-200"
                      : ""
                  } ${currentUser?._id === user?._id ? "hidden" : ""}`}
                  color="primary"
                  disabled={
                    viewer?._id === user?._id ||
                    (followTogglerPending && !followTogglerSuccess) ||
                    !currentUser?.role
                  }
                  radius="full"
                  size="sm"
                  variant={isFollowed ? "bordered" : "solid"}
                  onPress={() => handleFollowToggler()}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </div>
              <h5 className="text-small tracking-tight text-default-400">
                @{user?.name.toLowerCase().replace(/\s+/g, "")}
              </h5>
            </div>
          </div>
          <div className="flex items-center flex-row-reverse">
            {isViewerHasAccess === false && (
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 me-4 font-bold text-lg cursor-default ${premium !== true ? "hidden" : "block"}`}
              >
                $10
              </span>
            )}

            <Button
              isIconOnly
              className={`hover:bg-transparent bg-transparent me-4 cursor-default ${premium !== true ? "hidden" : "block"}`}
              size="sm"
              title="Premium post"
              // variant={"light"}
            >
              <svg
                fill="#ffbd2e"
                stroke="#ffbd2e"
                transform="rotate(0)"
                viewBox="0 -5.47 56.254 56.254"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M494.211,354.161l1.174-1.366H482.552L469.8,367.5h12.94Zm-8.4,13.336H510.05l-6.589-7.664-5.528-6.429-8.354,9.713Zm-15.856,2.329,24.1,25.356L482.53,369.826Zm40.824,0h-2.1l-8.829,0H485.083l12.774,28.1.082.178,12.17-26.8Zm-8.94,25.322,24.057-25.32H513.337Zm24.215-27.65L513.3,352.8H500.478l12.642,14.7Z"
                    data-name="diamond premium"
                    id="diamond_premium"
                    transform="translate(-469.802 -352.795)"
                  />{" "}
                </g>
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-600">
          <div className="p-5">
            <div
              dangerouslySetInnerHTML={{
                __html: seePostToggle ? post : truncatedHtml,
              }}
              className={Styles.Output}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            />
            <button
              className="cursor-pointer text-blue-400"
              onClick={() => setSeePostToggle(!seePostToggle)}
            >
              {seePostToggle ? "see less" : "see more"}
            </button>
          </div>

          <div className="relative w-full md:h-[300px] h-[200px] overflow-hidden">
            <Image
              fill
              alt="Blog post image"
              className="rounded-lg object-center object-cover"
              sizes=" ( max-width: 768px ) 100vw, ( max-width: 1200px ) 50vw, 33vw"
              src={image[0]?.url ? image[0]?.url : ""}
            />
          </div>
        </CardBody>
        <CardFooter className="gap-3">
          <div className="flex space-x-2">
            <Button
              isIconOnly
              className="flex items-center space-x-1 bg-transparent hover:bg-transparent disabled:bg-transparent"
              disabled={
                voteOnPostPending ||
                (currentUser?.role !== "user" && !currentUser?.email) ||
                currentUser?.role === "admin"
              }
              size="sm"
              title="Upvote"
              onClick={() => handleVote("upvote")}
              onPress={() => handleOpen("blur")}
            >
              <svg
                className="size-6"
                fill={isUpvoted ? "#3B82F6" : "none"}
                stroke={isUpvoted ? "#3B82F6" : "currentColor"}
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="sr-only">Upvote</span>
            </Button>
            <div className="flex space-x-2">
              <span aria-live="polite">{upVoteCount}</span>
            </div>
            <Button
              isIconOnly
              className="flex items-center space-x-1 bg-transparent hover:bg-transparent disabled:bg-transparent"
              disabled={
                voteOnPostPending ||
                (currentUser?.role !== "user" && !currentUser?.email) ||
                currentUser?.role === "admin"
              }
              size="sm"
              title="Downvote"
              onClick={() => handleVote("downvote")}
              onPress={() => handleOpen("blur")}
            >
              <svg
                className="size-6"
                fill={isDownvoted ? "#3B82F6" : "none"}
                stroke={isDownvoted ? "#3B82F6" : "currentColor"}
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="sr-only">Downvote</span>
            </Button>
            <div className="flex space-x-2">
              <span aria-live="polite">{downVoteCount}</span>
            </div>

            <Button
              isIconOnly
              className="tanvir3 flex items-center space-x-1 bg-transparent hover:bg-transparent disabled:bg-transparent"
              size="sm"
              title="Comment"
              onPress={() => {
                handleOpen("blur");
                currentUser?.role === "user" && onOpen();
              }}
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
                  d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <PostActionModal
                comments={comments}
                image={image[0]?.url}
                isOpen={
                  (currentUser?.role !== "user" && !currentUser?.email) ||
                  currentUser?.role === "admin"
                    ? false
                    : isOpen
                }
                post={post}
                postId={_id}
                user={user}
                onOpenChange={onOpenChange}
              />
            </Button>
          </div>
        </CardFooter>
        <div
          className={`${premium && isViewerHasAccess === false ? "absolute" : "hidden"} ${viewer?._id === user?._id ? "hidden" : ""} ${hidePremium ? "hidden" : "absolute"} bottom-0 w-full h-[90%] text-default-900 flex flex-col justify-center items-center rounded-md from-default-100  opacity-95 via-default-50   p-2 transition-all bg-gradient-to-t  `}
        >
          <Button
            className="bg-gradient-to-r from-indigo-500 dark:from-indigo-700 via-purple-500 dark:to-pink-500 to-purple-400 font-medium p-2 rounded-lg text-white hover:scale-105 transition-all duration-200 ease-in-out"
            color="warning"
            disabled={
              (currentUser?.role !== "user" && !currentUser?.email) ||
              currentUser?.role === "admin"
            }
            size="md"
            onPress={() => handlePremium()}
          >
            {" "}
            Premium
          </Button>
          <p className="text-base mt-5 italic">
            Purchase to access and view the post{" "}
          </p>
        </div>
      </Card>
      <Modal
        backdrop={"blur"}
        className="z-[900]"
        isOpen={
          (currentUser?.role !== "user" && !currentUser?.email) ||
          currentUser?.role === "admin"
            ? isOpen
            : false
        }
        onClose={onClose}
      >
        <ModalContent className="z-[999]" onClick={() => setHidePremium(true)}>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3 className="text-center pt-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                  {currentUser?.role !== "user" && currentUser?.role !== "admin"
                    ? "Please Sign In to action on this post!"
                    : currentUser?.role === "admin"
                      ? "User only can action on post!"
                      : ""}
                </h3>
                {currentUser?.role === "admin" ? (
                  <></>
                ) : (
                  <Button className="mt-4" color="primary">
                    <Link href="/login">Sign In</Link>
                  </Button>
                )}
              </ModalHeader>
              <ModalBody />
              <ModalFooter />
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
};

export default PostCard;
