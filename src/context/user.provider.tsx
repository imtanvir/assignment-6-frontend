"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { getCurrentUser } from "../services/AuthService";
import { getUserProfile } from "../services/User";
import { IUser } from "../types";

interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: (user: IUser | null) => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  userProfile: IUser | null;
  setUserProfile: Dispatch<SetStateAction<IUser | null>>;
}
const UserContext = createContext<IUserProviderValues | undefined>(undefined);
const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUser = async () => {
    const user = await getCurrentUser();

    setUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data }: { data: IUser } = await getUserProfile();

        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    handleUser();
  }, [isLoading]);

  return (
    <UserContext.Provider
      value={{
        user,
        userProfile,
        setUserProfile,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context!");
  }

  return context;
};
export default UserProvider;
