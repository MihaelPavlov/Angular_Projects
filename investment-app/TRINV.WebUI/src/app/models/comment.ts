export interface IComment {
  id?: number;
  newsId: number;
  comment: string;
  createdBy: number;
  upVotes: number;
  downVotes: number;
  createdOn: Date;
  updatedOn: Date;
}
