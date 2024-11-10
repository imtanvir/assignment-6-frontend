"use server";

import envConfig from "@/src/config/envConfig";
import axiosInstance from "@/src/lib/AxiosInstance";

export const getPosts = async (query?: string) => {
  const option = {
    next: {
      tags: ["posts"],
    },
  };
  const res = await fetch(`${envConfig.baseApi}/post/all-post?${query}`, {
    cache: "no-store",
  });

  const posts = await res.json();

  return posts;
};

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/post/create-post", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // revalidateTag("posts");

    return data;
  } catch (error) {
    throw new Error("Post creation failed! Error occurred.");
  }
};
