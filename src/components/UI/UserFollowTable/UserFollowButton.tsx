// UserFollowButton component
import { Button } from "@nextui-org/button";
import { MutableRefObject, useEffect, useState } from "react";

import { useUser } from "@/src/context/user.provider";
import { useFollowToggler } from "@/src/hooks/post.hook";
import { IUser } from "@/src/types";

const UserFollowButton = ({
  user,
  viewer,
  tableType,
}: {
  user: IUser;
  viewer: IUser;
  actionFollowToggler: MutableRefObject<boolean>;
  tableType?: string;
}) => {
  const { setUserProfile } = useUser();

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
    data: followTogglerData,
  } = useFollowToggler();

  const handleFollowToggler = () => {
    followToggler({
      followUser: user?._id,
      actionUserId: viewer?._id as string,
    });
  };

  // If the user is unfollowed and the table type is "following", call onUserUnfollowed

  useEffect(() => {
    const unfollowingSetter = async () => {
      if (!followTogglerPending && followTogglerSuccess) {
        const unfollowing = isFollowed && tableType === "following";

        setIsFollowed(!isFollowed);

        if (unfollowing) {
          const updateFollowing = viewerFollowingOrFollower?.filter(
            (following) => following._id !== user._id
          );

          setUserProfile((prev: IUser | null) =>
            prev?.following
              ? {
                  ...prev,
                  following: updateFollowing,
                }
              : null
          );
        }
      }
    };

    unfollowingSetter();
  }, [followTogglerPending, followTogglerSuccess, followTogglerData]);

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
