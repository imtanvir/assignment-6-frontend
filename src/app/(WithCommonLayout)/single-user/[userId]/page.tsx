"use client";
import UserProfile from "@/src/components/UI/UserProfile";

const page = ({ params }: { params: { userId: string } }) => {
  return (
    <>
      <UserProfile />
    </>
  );
};

export default page;
