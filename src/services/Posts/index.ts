import envConfig from "@/src/config/envConfig";
import { delay } from "@/src/utils/delay";

export const getPosts = async () => {
  const res = await fetch(`${envConfig.baseApi}/post/all-post`, {
    cache: "no-store",
  });

  const posts = await res.json();

  await delay(5000);

  return posts;
};
