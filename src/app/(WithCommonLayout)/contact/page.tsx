"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import FXTextArea from "@/src/components/form/FXTextArea";
import Loading from "@/src/components/UI/Loading";
import { useUser } from "@/src/context/user.provider";
import { useContactUs } from "@/src/hooks/contact.hook";
import contactValidationSchema from "@/src/schemas/contact.schema";

const Contact = () => {
  const { setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const { mutate: handleFeedbackSend, isPending, isSuccess } = useContactUs();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleFeedbackSend(data);

    userLoading(true);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  return (
    <>
      {isPending && <Loading />}
      <section className="flex justify-center items-center h-[calc(100vh-64px)] bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800">
        <div
          className="z-[999] p-5 shadow-lg box-content md:w-1/2 w-3/4
          bg-brown-400 dark:bg-white/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-100 dark:border-gray-700"
        >
          <h1 className="text-center pb-2">Feel free to share your feedback</h1>
          <FXForm
            resolver={zodResolver(contactValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col mb-4">
              <FXInput label="Email" name="email" type="email" variant="flat" />
            </div>

            <div className="flex flex-col">
              <FXTextArea label="Feedback" name="message" variant="flat" />
            </div>
            <div className="mt-4">
              <Button
                className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-500 dark:from-slate-700 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-slate-800 w-full p-2 rounded-md text-slate-50 transition-all duration-500 ease-out"
                size="lg"
                type="submit"
              >
                Send
              </Button>
            </div>
          </FXForm>
          <div className=" flex justify-center items-center py-3 gap-2">
            <p>Want to know about us?</p>
            <Link className="text-blue-500" href={"/about"}>
              Lear more
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
