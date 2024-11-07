import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface User {
  _id: string;
  name: string;
  email: string;
  image: IImage[];
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
  title: string;
  content: string;
  comments: Comment[];
  votes: Vote[];
}
