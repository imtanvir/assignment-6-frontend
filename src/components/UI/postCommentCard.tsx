import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";

const PostCommentCard = ({
  imageUrl,
  userName,
  comment,
}: {
  imageUrl: string;
  userName: string;
  comment: string;
}) => {
  console.log({ userName });

  return (
    <>
      <div className="flex gap-5 py-5">
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
          </div>
          <p className="text-small tracking-tight text-default-500">
            {comment}
          </p>
        </div>
      </div>
    </>
  );
};

export default PostCommentCard;
