"use client";
import Link from "next/link";

const SignUp = () => {
  return (
    <>
      <Link
        className=" bg-gradient-to-r from-indigo-500 dark:from-indigo-700 via-purple-500 dark:to-pink-500 to-purple-400 font-medium p-2 rounded-lg text-white hover:scale-105 transition-all duration-200 ease-in-out"
        href={"/register"}
      >
        Sign up
      </Link>
    </>
  );
};

export default SignUp;
