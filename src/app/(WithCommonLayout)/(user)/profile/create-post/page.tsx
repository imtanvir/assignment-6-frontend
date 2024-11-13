"use client";
import { Button } from "@nextui-org/button";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import Loading from "@/src/components/UI/Loading";
import {
  CategoryOptions,
  PremiumPostOptions,
} from "@/src/components/UI/Sidevar/contstants";
import FXSelect from "@/src/components/form/FXSelect";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";

// Dynamically import RichTextEditor to disable SSR
const RichTextEditor = dynamic(
  () => import("@/src/components/UI/RichTextEditor"),
  {
    ssr: false,
  }
);

const CreatePost = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();
  const router = useRouter();

  const {
    mutate: createPost,
    isPending: postCreatePending,
    isSuccess: postCreateSuccess,
  } = useCreatePost();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles([file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews([reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  const method = useForm();

  const { handleSubmit } = method;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const postData = {
      user: user?._id,
      id: user?._id,
      post: data.post,
      category: data.category.toLowerCase(),
      premium: data.premium === "Premium" ? true : false,
    };

    formData.append("data", JSON.stringify(postData));
    formData.append("file", imageFiles[0]);

    createPost(formData);
  };

  if (!postCreatePending && postCreateSuccess) {
    router.push("/");
  }

  return (
    <>
      {postCreatePending && <Loading />}
      <section>
        <h1 className="text-3xl text-center font-bold">
          Create a Post: Stories, Advice & Tips for Pet Lovers
        </h1>
        <div>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <RichTextEditor label="Post" name="post" />
              </div>

              <div className="flex flex-wrap gap-4">
                {imagePreviews.length > 0 &&
                  imagePreviews.map((imageDataUrl) => (
                    <div
                      key={imageDataUrl}
                      className="relative w-1/2 h-1/2 rounded-xl border-2 border-dashed border-default-400 p-2"
                    >
                      <img
                        alt="Card background"
                        className="h-full w-full object-cover object-center rounded"
                        src={imageDataUrl}
                      />
                    </div>
                  ))}
              </div>
              <div>
                <label
                  className="bg-default-200 cursor-pointer border-2 border-slate-400 dark:border-slate-200 border-dashed block w-1/2 p-4 h-full rounded-md mt-4"
                  htmlFor="image"
                >
                  <span className="flex items-center gap-2">
                    Add Photo{" "}
                    <svg
                      className="lucide lucide-image"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </span>
                </label>
                <input
                  className="hidden"
                  id="image"
                  multiple={false}
                  name="image"
                  type="file"
                  onChange={(e) => handleImageChange(e)}
                />
              </div>
              <div className="min-w-fit flex-1 mt-4">
                <FXSelect
                  label="Category"
                  name="category"
                  options={CategoryOptions}
                />
              </div>
              <div className="min-w-fit flex-1 mt-4">
                <FXSelect
                  label="Post type"
                  name="premium"
                  options={PremiumPostOptions}
                />
              </div>
              <div className="mt-4">
                <Button
                  color="primary"
                  disabled={
                    imagePreviews.length === 0 ||
                    !method.formState.isValid ||
                    user?.role !== "user" ||
                    method.getValues("post") === ""
                  }
                  type="submit"
                >
                  Create Post
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
};

export default CreatePost;
