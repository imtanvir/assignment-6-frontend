"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Checkout from "./Checkout";

import Loading from "@/src/components/UI/Loading";
import envConfig from "@/src/config/envConfig";
import { useUser } from "@/src/context/user.provider";
import { useGetSinglePost } from "@/src/hooks/post.hook";

const stripePromise = loadStripe(envConfig.stripePK as string);

const Payment = ({ params }: { params: { postId: string } }) => {
  const { user: currentUser } = useUser();
  const {
    mutate: getSinglePost,
    data: postData,
    isPending: isPostLoading,
    isSuccess: isPostSuccess,
    isError: isPostError,
  } = useGetSinglePost();

  const [isInValidPost, setIsInValidPost] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getSinglePost(params.postId as string);
  }, [params.postId, getSinglePost]);

  // Handle post validation
  useEffect(() => {
    if (isPostLoading) return;

    if (
      (postData === undefined &&
        isPostLoading === false &&
        isPostSuccess === false &&
        isPostError) ||
      (postData?.data && postData?.data._id !== params.postId) ||
      (postData?.data && postData?.data?.premium !== true)
    ) {
      setIsInValidPost(true);

      return;
    }
  }, [postData, isPostLoading, params.postId]);

  if (isPostLoading && !isPostSuccess) {
    return <Loading value="Loading" />;
  }

  const handleReturnHome = () => router.push("/");

  return (
    <section className="h-[calc(100vh-64px)] mt-32">
      <h1 className="text-center py-10 md:text-2xl text-xl font-mono font-semibold pt-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
        Make your payment to access this post
      </h1>
      <Elements stripe={stripePromise}>
        <Checkout
          payAmount={10}
          postId={params.postId as string}
          userId={currentUser?._id as string}
        />
      </Elements>
      <Modal
        backdrop={"blur"}
        className="z-[900]"
        isOpen={isInValidPost}
        onClose={() => handleReturnHome()}
      >
        <ModalContent className="z-[999]">
          <ModalHeader className="flex flex-col justify-center items-center gap-1">
            <Spinner size="lg" />
            <h3 className="text-center pt-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Invalid post selection or not a premium post!
            </h3>
            <Link
              className=" w-1/3 text-center text-sm whitespace-nowrap bg-gradient-to-r from-indigo-500 dark:from-indigo-700 via-purple-500 dark:to-pink-500 to-purple-400 font-medium p-2 rounded-lg text-white hover:scale-105 transition-all duration-200 ease-in-out"
              href="/"
            >
              Back to home
            </Link>
          </ModalHeader>
          <ModalBody />
          <ModalFooter />
        </ModalContent>
      </Modal>
    </section>
  );
};

export default Payment;
