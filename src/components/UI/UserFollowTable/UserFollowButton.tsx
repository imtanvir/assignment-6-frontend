// UserFollowButton component
import { Button } from "@nextui-org/button";
import { Dispatch, SetStateAction, useState } from "react";

import { useFollowToggler } from "@/src/hooks/post.hook";
import { IUser } from "@/src/types";

const UserFollowButton = ({
  user,
  viewer,
  setAction,
  tableType,
  setMainUser,
  onUserUnfollowed, // NEW PROP
}: {
  user: IUser;
  viewer: IUser;
  setAction: Dispatch<SetStateAction<boolean>>;
  tableType?: string;
  setMainUser: Dispatch<SetStateAction<IUser[]>>;
  onUserUnfollowed: (userId: string) => void; // NEW PROP TYPE
}) => {
  let viewerFollowingOrFollower =
    tableType === "following" ? viewer?.following : viewer?.followers;

  const isFollowing = viewerFollowingOrFollower?.find(
    (follower) => follower._id === user?._id
  );
  const [isFollowed, setIsFollowed] = useState(isFollowing ? true : false);

  const {
    mutate: followToggler,
    isPending: followTogglerPending,
    isSuccess: followTogglerSuccess,
  } = useFollowToggler();

  const handleFollowToggler = () => {
    const unfollowing = isFollowed && tableType === "following";

    setIsFollowed(!isFollowed);

    followToggler({
      followUser: user?._id,
      actionUserId: viewer?._id as string,
    });

    setAction(true);

    // If the user is unfollowed and the table type is "following", call onUserUnfollowed
    if (unfollowing) {
      onUserUnfollowed(user._id);
    }
  };

  return (
    <>
      <Button
        className={`px-2 ${
          isFollowed
            ? "bg-transparent text-foreground border-default-200"
            : tableType === "followers"
              ? "bg-primary-50"
              : ""
        }`}
        color="primary"
        disabled={
          (followTogglerPending && !followTogglerSuccess) ||
          (isFollowed && tableType === "followers")
        }
        radius="full"
        size="sm"
        variant={isFollowed && tableType === "following" ? "bordered" : "solid"}
        onPress={handleFollowToggler}
      >
        {isFollowed && tableType === "following"
          ? "Unfollow"
          : isFollowed && tableType === "followers"
            ? "Follower"
            : ""}
      </Button>
    </>
  );
};

export default UserFollowButton;
