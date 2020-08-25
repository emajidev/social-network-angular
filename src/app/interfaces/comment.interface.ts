export interface Comment {
  id_comment: number;
  content: string;
  id_article?: number;
  id_user: number;
  number_comment?: string;
  username: string;
}