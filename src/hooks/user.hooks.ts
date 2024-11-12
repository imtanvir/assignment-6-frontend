import { useQuery } from "@tanstack/react-query";

import { getAllUser } from "../services/AuthService";
import { getUserProfile } from "../services/User";

export const useUserProfile = () => {
  return useQuery<any, Error, any>({
    queryKey: ["USER_PROFILE"],
    queryFn: async () => await getUserProfile(),
  });
};

export const useGetAllUser = () => {
  return useQuery<any, Error, any>({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUser(),
  });
};
