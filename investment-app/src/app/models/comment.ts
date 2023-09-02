export interface IComment {
  id: number
  newsId: number
  comment: string
  userId?: number
  likes: number
}
