"use client";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import { useUserEdit } from "@/src/hooks/auth.hook";
import { useUserProfile } from "@/src/hooks/user.hooks";

const EditProfile = () => {
  const { data: userProfileData } = useUserProfile();

  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([
    userProfileData?.data?.image[0]?.url as string,
  ]);

  console.log({ userProfileData }, userProfileData?.data?.image[0]?.url);
  // const searchParams = useSearchParams();
  // const redirect = searchParams.get("redirect");
  const router = useRouter();

  const { mutate: editUser, isPending, isSuccess } = useUserEdit();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const authData = {
      email: data?.email,
      password: data?.password,
      address: data?.address,
      name: data?.name,
      phone: data?.phone,
    };

    formData.append("data", JSON.stringify(authData));
    formData.append("file", imageFiles[0]);
    console.log({ formData });
    editUser(formData);
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/");
    }
  }, [isPending, isSuccess]);

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

  return (
    <>
      {isPending && <Loading />}
      <section className="flex justify-center items-center py-[100px] bg-gradient-to-l from-blue-200 to-pink-100 dark:from-slate-900 dark:to-slate-800">
        <div
          className="z-[99] p-5 shadow-lg box-content md:w-1/2 w-3/4
          bg-brown-400 dark:bg-white/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-2xl bg-opacity-40 border border-gray-100 dark:border-gray-700"
        >
          <h1 className="text-center pb-2">Update your profile</h1>
          <FormProvider {...method}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-4">
                <FXInput
                  label="Name"
                  name="name"
                  type="text"
                  value={userProfileData?.data?.name}
                  variant="flat"
                />
              </div>
              <div className="flex flex-col mb-4">
                <FXInput
                  disable={true}
                  label="Email"
                  name="email"
                  type="email"
                  value={userProfileData?.data?.email}
                  variant="flat"
                />
              </div>
              <div className="flex flex-col mb-4">
                <FXInput
                  label="Address"
                  name="address"
                  type="address"
                  value={userProfileData?.data?.address}
                  variant="flat"
                />
              </div>
              <div className="flex flex-col mb-4">
                <FXInput
                  label="Phone"
                  name="phone"
                  type="text"
                  value={userProfileData?.data?.phone}
                  variant="flat"
                />
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
              <div className="mt-4">
                <Button
                  className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-blue-500 hover:to-teal-500 dark:from-slate-700 dark:to-blue-500 dark:hover:from-blue-500 dark:hover:to-slate-800 w-full p-2 rounded-md text-slate-50 transition-all duration-500 ease-out"
                  size="lg"
                  type="submit"
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
