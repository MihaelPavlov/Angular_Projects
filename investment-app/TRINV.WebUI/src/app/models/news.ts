import { IComment } from "./comment";

export interface INews {
  id: number;
  name: string;
  description: string;
  shortDescription: string;
  timeToRead: number;
  views: number;
  upVote: number;
  downVote: number;
  imageUrl: string;
  comments: IComment[]
}