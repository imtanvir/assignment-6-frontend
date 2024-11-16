import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  image: IImage[];
  followers: IUser[];
  following: IUser[];
}

export interface IImage {
  id: string;
  url: string;
  isRemove: boolean;
}

export interface Comment {
  author: Author;
  comment: string;
  _id: string;
}

export interface Author {
  _id: string;
  name: string;
  image: IImage[];
  followers: IUser[];
  following: IUser[];
}

export interface Vote {
  userId: string;
  voteType: string;
  _id: string;
}

export interface IPost {
  _id: string;
  user: User;
  id: string;
  premium: boolean;
  published: boolean;
  image: IImage[];
  category: string;
  upvote: number;
  downvote: number;
  post: string;
  comments: Comment[];
  votes: Vote[];
  accessedUsers: string[];
}
export type TRole = "user" | "admin";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  phone: string;
  address: string;
  followers: IUser[];
  following: IUser[];
  image: IImage[];
}

export interface IPaymentHistory {
  userId: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
  transactionId: string;
}

export type TPayment = {
  user: string;
  post: string;
  amount: number;
  currency: string;
  status: string;
  transactionId: string;
};
