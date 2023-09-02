import {IComment} from "./comment";

export interface INews{
  id: number
  name: string
  views: number
  timeToRead :number
  smallDescription: string
  description: string
  imageUrl : string
  comments: IComment[]
}
