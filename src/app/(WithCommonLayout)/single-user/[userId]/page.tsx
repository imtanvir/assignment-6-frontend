"use client";
import UserProfile from "@/src/components/UI/UserProfile";

const page = ({ params }: { params: { userId: string } }) => {
  console.log(params);

  return (
    <>
      <UserProfile />
    </>
  );
};

export default page;
