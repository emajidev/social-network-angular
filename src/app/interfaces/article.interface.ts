export interface Article {
  id_article: number;
  title: string;
  size: string;
  image: string;
  details?: string;
  description?: string;
  hashtags?: string;
  hashValues?: String[];
  id_user: number;
  username?: string;
  number_article:number;
  likes:number;
  isLiked?: boolean;
  isFavorite?:boolean;
}